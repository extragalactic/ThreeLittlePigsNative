import gql from 'graphql-tag';

const getCustomer = gql `mutation getCustomer($id: String){
  getCustomer(id: $id){
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
  }
 
}`;

const submitFollowup = gql `mutation submitFollowUp($userid:String, $calid: String, $custid: String, $name: String, $address: String, $start: String, $end: String, $description: String){
  submitFollowup(userid: $userid, custid:$custid, name: $name, address: $address, start:$start, end: $end, description: $description, calid: $calid){
    _id
  }
}`;

const getAppointmentsforDay = gql`
  mutation getAppointmentsforDay($userid: String, $date: String){
    getAppointmentsforDay(userid: $userid, date: $date){
      _id
      description
      name
      address
      start
      end
      calid
    }
  }`;

const updateCustomer = gql`
  mutation updateCustomer(
   $id: String, 
   $firstName: String, 
   $lastName: String, 
   $email1:String, 
   $email2: String, 
   $cphone: String,
   $hphone: String,
   $wphone: String,
   $address: String,
   $surveyor: String,
){
  updateCustomer(
    id: $id, 
    firstName: $firstName, 
    lastName: $lastName, 
    email1: $email1, 
    email2: $email2,
    cphone: $cphone,
    hphone: $hphone,
    wphone: $wphone,
    address:$address,
    surveyor:$surveyor,
  ){
    id
    firstName
    lastName
    email1
    email2
    cphone
    hphone
    wphone
    address
    surveyor {
      id
      firstName
      lastName
      mobile
    }
  }
}`;

const addNotes = gql `
   mutation addNote($msgid:String, $custid: String, $text: String, $createdAt: String, $userid: String, $name: String ){
  addNotes(note: {
    _id: $msgid,
    createdAt:$createdAt,
    text: $text,
    custid: $custid
    user: {
      name: $name,
      _id: $userid
    }
    
  }) {
    _id
    text
    createdAt
    user{
      name
      _id
    }
  }
}`;

const deleteAppointment = gql`
  mutation deleteAppointment($userid: String, $meetingid: String, $calid: String){
  deleteAppointment(userid: $userid, meetingid: $meetingid, calid: $calid){
    _id
  }
}`;


const getUser = gql `
mutation getUser($id: String) {
  getUser(id:$id) {
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
      status   
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

const addSurveyNotes = gql`
  mutation addSurveyNotes(
  $custid: String, 
  $userid: String,
  $heading: String,
  $description: String, 
  $text: String, 
  $timestamp: String, 
  $user: String){
    addSurveyNotes(
      custid: $custid,
      userid: $userid,
      heading: $heading,
      description: $description,
      text: $text,
      timestamp: $timestamp,
      user: $user,
    )
    {
      heading
      description
      text
      timestamp
      user
     }
  }`;

const addSurveyPhoto = gql`
  mutation addSurveyPhoto(
  $custid: String, 
  $heading: String,
  $description: String, 
  $timestamp: String, 
  $user: String,
  $orginalBase64: String,
  $editedlBase64: String
){
    addSurveyPhoto (
      custid: $custid,
      heading: $heading,
      description: $description,
      timestamp: $timestamp,
      user: $user,
      editedlBase64:$editedlBase64,
      orginalBase64:$orginalBase64
    )
    {
      heading
      description
      timestamp
      user
      orginalBase64
      editedlBase64
     }
  }`;
const getSurveyPhotos = gql`
  mutation getSurveyImaged($id: String){
  getSurveyPhotos(id: $id) {
    thumb
    photo
    caption
    selected
    docID
  }
}`;

const toggleSurveyReady = gql `
  mutation toggleSurveyReady($custid: String, $userid: String){
  toggleSurveyReady(custid: $custid, userid: $userid) {
    id
    firstName
    lastName
  }
}`;

const selectSurveyPhotos = gql `
  mutation selectSurvey($custid: String, $index:String) {
  selectSurveyPhoto(custid: $custid, index: $index) {
    thumb
    photo
    caption
    selected
    docID
  }
}`;

const getFinishedSurvey = gql `
  mutation getFinishedSurvey($id: String) {
  getFinishedSurvey(id:$id) {
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
      docID
      url
    }
  }
}`;

const acceptEstimate = gql `
  mutation acceptEstimate($custid: String, $userid: String){
  acceptEstimate(userid:$userid, custid: $custid) {
    survey{
      notes {
        heading
        description
        text
        timestamp
        user
      }
      photos {
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

const addPrice = gql`
  mutation($custid: String, $description :String, $price: Int){
  addPricing(custid: $custid, description: $description, price: $price){
    photos {
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
}`;

const getEstimateResults = gql `
  mutation getEstimateResult($custid: String){
    getEstimateResults(custid: $custid) {
      prices {
        description
        price
      }
      photos
    }
  }`;

const sendEstimate = gql `
    mutation sendEstimate($custid: String, $generics: generics){
      generatePDFEstimate(custid: $custid, generics: $generics){
        id
      }
    }`;

const getBase64 = gql `
  mutation getBase64($docID: String){
  getImageBase64(docID: $docID){
    docID
    base64
    url  
  }
}
`;


export {
  getBase64,
  sendEstimate,
  getEstimateResults,
  addPrice,
  acceptEstimate,
  getFinishedSurvey,
  selectSurveyPhotos,
  toggleSurveyReady,
  getCustomer,
  getSurveyPhotos,
  submitFollowup,
  getAppointmentsforDay,
  updateCustomer,
  addNotes,
  deleteAppointment,
  getUser,
  addSurveyNotes,
  addSurveyPhoto,
};
