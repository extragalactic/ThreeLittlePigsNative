import { CameraRoll, AlertIOS } from 'react-native';
import RNFS from 'react-native-fs';


const saveImagetoCameraRoll = (image) => {
  CameraRoll.saveToCameraRoll(image, 'photo')
        .then(data => console.log(data))
        .catch(err => console.log(err));
  AlertIOS.alert('Photo Saved');
};

const addImagetoEstimate = () => {};

const copyImagefromTemptoPersist = (path) => {
  console.log(path)
};



export { saveImagetoCameraRoll, addImagetoEstimate, copyImagefromTemptoPersist };
