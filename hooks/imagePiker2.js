import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // base64: false,
    allowsEditing: true,
  });

  if (!result.canceled) {
    const file = result.assets[0];
    return {success: true, file: {uri: file.uri, name: file.fileName, type: file.type}};
  } else {
    return {success: false, error: "Image selection was canceled."};
  }
}

const uploadImage = async (file) =>{
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  });

  const response = await fetch('http://192.168.1.29:3000/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  const data = await response.json();
  console.log('Image uploaded successfully:', data.url);
  return {url: data.url, id: data.fileId};
}

const deleteImage = async (fileId) => {
  await fetch(`http://192.168.1.29:3000/delete/${fileId}`, {
    method: 'DELETE',
  });  

}

export { pickImage, uploadImage, deleteImage };