
import store from 'react-native-simple-store';
import { isTokenExpired } from '../../Utils/jwtHelper';

const getUserData = () => store.get('userData').then(user => user);

const getuserId = () => getUserData().then(user => user.id);

const saveProfile = (token, id) => {
  store.save('userData', { token, id })
    .then(() => store.get('userData'))
    .then(user => user);
};

const checkUserLogin = () =>
   getUserData()
   .then((user) => {
     return (!!user.token && !isTokenExpired(user.token));
   }).catch(() => false);


export { saveProfile, getUserData, checkUserLogin, getuserId };
