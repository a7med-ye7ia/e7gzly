const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/e7gzly/image/upload';
const UPLOAD_PRESET = 'flightsPhotos'; // Replace with your preset name

const uploadImage = async (file) => {
  // try {
  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri: file.uri,
  //     type: file.type,
  //     name: file.fileName || 'upload.jpg',
  //   });
  //   formData.append('upload_preset', UPLOAD_PRESET);

  //   const response = await fetch(CLOUDINARY_URL, {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   const data = await response.json();
  //   console.log('Image uploaded successfully:', data.secure_url);
  //   return data.secure_url;
  // } catch (error) {
  //   console.error('Upload Error:', error);
  // }

  const onSnap = async () => {
    const options = { quality: 0.7, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    const source = data.base64;

    if (source) {
      await cameraRef.current.pausePreview();
      setIsPreview(true);

      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl =
        'https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload';
      let data = {
        file: base64Img,
        upload_preset: '<your-upload-preset>'
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      .then(async response => {
        let data = await response.json();
        if (data.secure_url) {
          alert('Upload successful');
        }
      })
      .catch(err => {
        alert('Cannot upload');
      });
    }
  };
};

export { uploadImage };

