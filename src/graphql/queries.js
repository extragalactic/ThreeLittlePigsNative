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

const getCustomer = gql `
  query getCustomer($id: String!){
  customer(id: $id) {
     id
    firstName
    lastName
    email1
    email2
    cphone
    hphone
    wphone
    address
    coordinates {
      latitude
      longitude
    }
   surveyor {
      id
      firstName
      lastName
      mobile
    }
    estimator
    status
    notes{
      _id
      text
      user {
        name
        _id
      }
    }
    survey {
      notes {
        heading
        description
        timestamp
        user
        text
    }
      photos{
        heading
        description
        timestamp
        user
        orginalBase64
        editedlBase64
        thumbURL
        thumb
        photo
        caption
        selected
      }
    }
  }
}`;


const getFinishedSurvey = gql `
  query getFinishedSurvey($id: String){
  getFinishedSurvey(id: $id) {
    heading
    notes {
      description
      text
      timestamp
      user
    }
    photos {
      description
      caption
      timestamp
      user
      thumb
      url
    }
  }
}`;


export { getUserQuery, getMessages, getCustomer, getFinishedSurvey };
