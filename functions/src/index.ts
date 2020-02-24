import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firestore)

const firestore = admin.firestore()
const usersRef = firestore.collection("users")

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// type ComicalUser = {
//     uid: String,
//     displayName: String,
//     createdAt: admin.firestore.Timestamp,
//     email: String,
// }

export const newUser = functions.auth.user().onCreate((user) => {
    const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
        createdAt: admin.firestore.FieldValue.serverTimestamp,
        email: user.email,
    }
    return usersRef.doc(user.uid).set(userInfo)
})
