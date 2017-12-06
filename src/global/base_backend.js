const firebase = require('firebase');
require("firebase/firestore");

class FirebaseBase {
    
    constructor() {
        const config = {
            apiKey: "AIzaSyAHIInGfEwfXMn4hHFn4pBf3tPSysYfuzA",
            authDomain: "gst-data.firebaseapp.com",
            databaseURL: "https://gst-data.firebaseio.com",
            projectId: "gst-data",
            storageBucket: "gst-data.appspot.com",
            messagingSenderId: "869813364544"
          };
        
        firebase.initializeApp(config);

        this.firebase = firebase;
        this.database = firebase.firestore();
    }
}

/**
 * @static
 */
export let firebaseBase = new FirebaseBase();