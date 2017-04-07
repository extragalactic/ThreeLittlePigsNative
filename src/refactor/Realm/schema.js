import Realm from 'realm';

class UserData extends Realm.Object {}
UserData.schema = {
  name: 'UserData',
  primaryKey: 'id',
  properties: {
    email: 'string',
    token: 'string',
    id: 'string',
  },
};


export default new Realm({ schema: [UserData] });
