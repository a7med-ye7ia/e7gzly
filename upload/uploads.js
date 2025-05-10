const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/e7gzly/image/upload';
const UPLOAD_PRESET = 'flightsPhotos'; // Replace with your preset name

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type, // ! use split and . to get the type if not work
    name: file.fileName || 'upload.jpg',
  });
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', 'e7gzly')

  try {

    // let url = null
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('Image uploaded successfully:', data.secure_url);
    return {success: true, url: data.secure_url};
    // fetch(CLOUDINARY_URL, {
    //   method: 'post',
    //   body: data
    // }).then(res => res.json())
    // then(data => url = data)

    // if (url) {
    //   console.log('Image uploaded successfully:', url);
    //   return { success: true, url }
    // } else {
    //   return { success: false, error: "error while uploading" }
    // }
  } catch (error) {
    return { success: false, error }
  }
}
export { uploadImage };

