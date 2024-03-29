"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase! You sent " + request.query.text);
// });
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({ original: original })
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        .then((snapshot) => {
        res.redirect(303, snapshot.ref.toString());
    });
});
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
});
//# sourceMappingURL=index.js.map