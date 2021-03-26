import * as functions from "firebase-functions";
import { db } from "./index";

const firebase_tools = require('firebase-tools');

const finnhub = require('finnhub');

export const storeUserBarrage = functions.https.onCall(async (data, _context) => {
    //TODO besides the length check for content we should also add the bad word check
    if (data.content.length === 0) {
        return;
    }
    const userInfo = await (await db.collection('user').doc(data.uid).get()).data();
    const userName = userInfo?userInfo.username:'anonymous';
    const barrageDocRef = db.collection("barrage").doc();
    barrageDocRef.set({
        uid: data.uid,
        tag: data.tag,
        time: data.time,
        content: data.content,
        userName: userName,
    }).then(() => {
        console.log("Document successfully written!");
    }).catch((error) => {
            console.error("Error writing document: ", error);
        });

    return

});

exports.clearBarrage = functions.pubsub
    .schedule("every day 07:00") 
    .timeZone("America/Chicago").onRun(async (context) => {
        const barrageDB = await db.collection('barrage').where('time', '<=', Date.now());
        barrageDB.get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        })
        return null;
    });

exports.clearStockChartData = functions.pubsub
    .schedule("every day 07:00") 
    .timeZone("America/Chicago").onRun(async (context) => {
        const stockChartDataDBPath = await db.collection('stock_chart_data').path;
        await firebase_tools.firestore
            .delete(stockChartDataDBPath, {
                project: process.env.GCLOUD_PROJECT,
                recursive: true,
                yes: true,
            });
        return null;
    });

exports.fetchFinnhubStockApiTMP = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c13pb2f48v6qfpuotv4g"
    const finnhubClient = new finnhub.DefaultApi();
    // @ts-ignore
    finnhubClient.quote("GME", (error, data, response) => {
        console.log(data);
        const stockChartDocRef = db.collection("stock_chart_data").doc();
        if (data != null) {
            stockChartDocRef.set({
                data: JSON.parse(JSON.stringify(data)),
                time: Date.now()
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        } else {
            console.log('data received is null')
        }

    });
});
