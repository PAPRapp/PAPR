import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyD5BK7Mm68eOA6cruMxmZ2YMrULKljKQ4U',
  authDomain: 'papr-88bcf.firebaseapp.com',
  databaseURL: 'https://papr-88bcf.firebaseio.com',
  projectId: 'papr-88bcf',
  storageBucket: 'papr-88bcf.appspot.com',
  messagingSenderId: '864699920304'
}

const fire = firebase.initializeApp(config)

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default fire
