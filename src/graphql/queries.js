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
      estimates {
        id
        firstName
        lastName
        email1
        email2
        hphone
        cphone
        wphone
        address
        status
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

const getMyCustomers = gql `
  query getMyCustomers($id: String) {
  getMyCustomers(id:$id ){
     newcustomers {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
      
    }
     followup {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
     }
    onsite {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
    }
   inprogress {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
   }
    surveycomplete {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
    }
    myestimates {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
    }
    
  }
}`;
const getPrices = gql`
  query getPrices {
  getPrices {
    description
    price
  }
}`;

const getEstimateResults = gql `
  query getEstimateResult($custid: String){
  getEstimateResults(custid: $custid) {
    prices {
      description
      price
    }
  }
}`;

const getUserandCustomers = gql `
  query getUserandCustomers($id: String) {
  getMyCustomers(id:$id ){
     newcustomers {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
      
    }
     followup {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
     }
    onsite {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
    }
   inprogress {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
   }
    surveycomplete {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
    }
    myestimates {
      id
      firstName
      lastName
      cphone
      hphone
      wphone
      email1
      email2
      status
      address
    }
    
  }
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
      estimates {
        id
        firstName
        lastName
        email1
        email2
        hphone
        cphone
        wphone
        address
        status
      }
      followUp {
        name
        start
        end
        description
        address      
    }
 }
getQueue {
      id
    firstName
    lastName
    address
    email1
    email2
    cphone
    hphone
    wphone
}
}`;

const getQueue = gql `
 query getQueue{
  getQueue {
       id
    firstName
    lastName
    address
    email1
    email2
    cphone
    hphone
    wphone
  }
}`;

export {
  getQueue,
  getUserandCustomers,
  getEstimateResults,
  getPrices,
  getUserQuery,
  getMessages,
  getCustomer,
  getFinishedSurvey,
  getMyCustomers,
};
