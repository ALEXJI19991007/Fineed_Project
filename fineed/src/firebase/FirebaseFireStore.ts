import { db,Auth } from "./Firebase"
import { useEffect, useState } from 'react';
import { useRadioGroup } from "@material-ui/core";
import { Barrage, BarrageSnapShotAtom } from "../atoms/BarrageSnapShotAtom";
import { useRecoilState } from "recoil";
import { StockData, StockSnapShotAtom } from "../atoms/StockSnapShotAtom";

// this file is only for firebase firestore snapshot listener if you want to change this file, ask Sijian first

export const useBarrages = () => {
    const [ready, setReady] = useState(false);
    const [barrages, setBarrages] = useState<Barrage[]>([]);
    const [barrageAtom,setBarrageAtom] = useRecoilState(BarrageSnapShotAtom)

    useEffect(() => {
        const unsubscribe =  Auth().onAuthStateChanged((user) =>{
            db.collection('barrage').onSnapshot(function (querySnapshot) {
                let barrages:Barrage[]= [];
                querySnapshot.forEach(function (doc) {
                    const barrageitem  = doc.data() as Barrage
                    barrages.push(barrageitem);
                });
                if (barrages) {
                    setReady(true);
                    setBarrages(barrages);
                    setBarrageAtom(barrages)
                }
            }, (error) => { console.log(error) });
          })
        return () => unsubscribe();
    }, []);
    return { _ready:ready, _barrages:barrages };
}

export const useStockData = () => {
    const [ready, setReady] = useState(false);
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [stockDataAtom,setStockDataAtom] = useRecoilState(StockSnapShotAtom)

    useEffect(() => {
        const unsubscribe =  Auth().onAuthStateChanged((user) =>{
            db.collection('stock_chart_data').onSnapshot(function (querySnapshot) {
                let stockDataArr:StockData[]= [];
                querySnapshot.forEach(function (doc) {
                    const stockChartData  = doc.data().data;
                    const stockDatatime = doc.data().time;
                    const stockData = {
                        price: stockChartData.c,
                        time: stockDatatime,
                    } as StockData
                    stockDataArr.push(stockData);
                });
                if (stockDataArr) {
                    setReady(true);
                    setStockData(stockDataArr);
                    setStockDataAtom(stockDataArr)
                }
            }, (error) => { console.log(error) });
          })
        return () => unsubscribe();
    }, []);
    return { _ready:ready, _stockDataArr:stockData };
}


