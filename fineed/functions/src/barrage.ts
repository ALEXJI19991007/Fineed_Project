import * as functions from "firebase-functions";
import { db } from "./index";


export const storeUserBarrage = functions.https.onCall(async (data, _context) => {
    //TODO besides the length check for content we should also add the bad word check
    if(data.content.length === 0){
      return;
    }
    const barrageDocRef = db.collection("barrage").doc();
    barrageDocRef.set({
        uid:data.uid,
        tag:data.tag,
        time:data.time,
        content:data.content,
      }).then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
      
      return  
  
  });
  
  exports.clearBarrage = functions.pubsub.schedule('every 100 minutes').onRun(async(context) => {
    
    const barrageDB = await db.collection('barrage').where('time','<=',Date.now());
    barrageDB.get().then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    })
    return null;
  });
  