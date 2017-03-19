import { CameraRoll, AlertIOS } from 'react-native';

const saveImagetoCameraRoll = (image) => {
  CameraRoll.saveToCameraRoll(image, 'photo')
        .then(data => console.log(data))
        .catch(err => console.log(err));
  AlertIOS.alert('Photo Saved');
};

const addImagetoEstimate = () => {};

export { saveImagetoCameraRoll, addImagetoEstimate };
