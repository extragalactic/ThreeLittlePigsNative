import gql from 'graphql-tag';

const getMessages = gql `
  query getNotes($id: String){
    getMessages(id: $id) {
      _id
      text
      createdAt
      user {
        _id
        name
      }
    }
  }`;

const getUserQuery = gql `
  query getUser($id: String){
    user(id:$id){
      _id
      firstName
      lastName
      mobile
      surveyor
      estimator
      office
      region   
      newCustomers{
       id
       firstName
       lastName
       email1
       email2
       cphone
       hphone
       wphone
       address   
   }
      followUp {
        name
        start
        end
        description
        address      
    }
 }
}`;

export { getUserQuery, getMessages };
