import * as ImagePicker from 'expo-image-picker';

async function uploadImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: false,
  });

  if (!result.canceled) {
    const file = result.assets[0];
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    const response = await fetch('http://192.168.1.29:3000/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });

    const data = await response.json();
    console.log('Image uploaded successfully:', data.url); // ! added by Mo.Anwar
    return data.url
    // Now you can save data.url to Firestore
  }
}

export default uploadImage;