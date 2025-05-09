const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Load your service account key
const auth = new google.auth.GoogleAuth({
  keyFile: './service-account.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('File received:', req.file);
  try {
    const fileMetadata = {
      name: req.file.originalname,
      parents: ['1MFVXH3hoaur0PyQAuoGP1nDtp5lsYSIn'],
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    const publicUrl = `https://drive.google.com/uc?export=view&id=${file.data.id}`;
    fs.unlinkSync(req.file.path); // Clean up

    res.json({ url: publicUrl,  fileId: file.data.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

app.delete('/delete/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    await drive.files.delete({
      fileId,
    });

    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file.' });
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
