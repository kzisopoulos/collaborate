import * as functions from "firebase-functions";
import admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`);
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    functions.logger.log(status, eventStatus);
    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed);
    return userStatusFirestoreRef.update(eventStatus);
  });
