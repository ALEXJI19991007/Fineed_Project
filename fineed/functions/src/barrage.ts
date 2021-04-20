import * as functions from "firebase-functions";

import { db } from "./index";

const firebase_tools = require('firebase-tools');
const finnhub = require('finnhub');
const Filter = require('bad-words');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export const storeUserBarrage = functions.https.onCall(async (data, _context) => {
    const filter = new Filter();
    if (data.content.length === 0) {
        return;
    }

    const userInfo = await (await db.collection('user').doc(data.uid).get()).data();
    const userName = userInfo?userInfo.username:'anonymous';
    const barrageDocRef = db.collection("barrage").doc();

    const newsItemRef = db.collection("news_item");
    const newsSearchResultArr = (await newsItemRef.where('id','==',data.content).get()).docs.map((doc) => doc.data());
    if(newsSearchResultArr.length > 0){
        console.log('user sent us a news as a barrage')
        const news = newsSearchResultArr[0];
        barrageDocRef.set({
            uid: data.uid,
            tag: 'news',
            time: data.time,
            NBcontent: news.content,
            NBTitle: news.title,
            NBImgUrl: news.image_url,
            userName: userName,
        }).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        return    
    }     
    barrageDocRef.set({
        uid: data.uid,
        tag: data.tag,
        time: data.time,
        content: filter.clean(data.content),
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


exports.tweetBot = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    // twitter bots
    const barrageDocRef = db.collection("barrage").doc();
    const TweetJs = {
        ListTweetsOnUserTimeline : function(screenName: any, callback: any) {
            TweetJs._callApi({
                    Action: "ListTweetsOnUserTimeline",
                    ScreenName: screenName
                },
            callback);
        },
        Search: function (query: any, callback: any) {
            TweetJs._callApi({
                Action: "Search",
                Query: query
            }, callback);
        },
        _callApi: function (request: any, callback: (arg0: any) => void) {
            var xhr = new XMLHttpRequest();
            const URL = "https://www.tweetjs.com/API.aspx";
            xhr.open("POST", URL);
            xhr.onreadystatechange = function () {
                if (this.readyState === xhr.DONE && this.status === 200) {
                    // console.log(xhr.responseText)
                    callback(JSON.parse(xhr.responseText));
                }
            }
            xhr.send(JSON.stringify(request));
        }
      };

      async function runAsync() {
        return new Promise(function(resolve,reject){
          TweetJs.Search("#gme",
          function (data: any) {
              // console.log(data.statuses[0])
              data.statuses.map((tweet:any )=>{
                const text = tweet.text;
                const name = tweet.user.name;             
                barrageDocRef.set({
                    uid: '0000',
                    tag: 'tweet',
                    time: Date.now(),
                    content: text,
                    userName: name,
                }).then(() => {
                    console.log("Document successfully written!");
                }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });
              })
              resolve(data);
          });
        })
      }
      runAsync();

      
});

