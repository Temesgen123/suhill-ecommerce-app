
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'suhill');
  const responseData = await fetch(url, {
    method: 'post',
    body: formData,
  });
  return responseData.json();
};

export default uploadImage;
