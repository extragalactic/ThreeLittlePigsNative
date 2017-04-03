import Realm from 'realm';

const authInit = () => {
  const UserSchema = {
    name: 'User',
    properties: {
      email: 'string',
      token: 'string',
      id: 'string',
    },
  };

  const realm = new Realm({ schema: [UserSchema] });
  const user = realm.objects('User');
  if (!user[0]) {
    return false;
  }
  return true;
};

const saveProfile = (profile, token) => {
  console.log('savepfile', profile);
  const UserSchema = {
    name: 'User',
    properties: {
      email: 'string',
      token: 'string',
      id: 'string',
    },
  };

  const realm = new Realm({ schema: [UserSchema] });
  realm.write(() => {
    const user = realm.create('User', {
      email: profile.email,
      token: token.idToken,
      id: profile.identities[0].userId,
    });
  });
};


const getUserID = () => {
  const UserSchema = {
    name: 'User',
    properties: {
      email: 'string',
      token: 'string',
      id: 'string',
    },
  };

  const realm = new Realm({ schema: [UserSchema] });
  const user = realm.objects('User');
  if (user[0]) {
    return user[0].id;
  }
};

export { authInit, saveProfile, getUserID };

