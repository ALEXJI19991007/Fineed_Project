import React, { Component, useEffect, useRef, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { BarrageHoverTimeStampAtom } from '../../atoms/BarrageHoverTimeStampAtom'
import moment from 'moment'
import priceData from './fakeStockData.json';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useStockData } from "../../firebase/FirebaseFireStore";
import { StockSnapShotAtom } from "../../atoms/StockSnapShotAtom";


export function StockChart() {
  const { _ready, _stockDataArr } = useStockData();
  const stockSnapShotAtom = useRecoilValue(StockSnapShotAtom);
  const [chartData,setChartData] = useState<any>([])
  
  useEffect(()=>{
    let priceArray: number[][] = []
    stockSnapShotAtom.forEach((stockDataItem)=>{
    priceArray.push([stockDataItem.time,stockDataItem.price]);
  });
    priceArray.sort((priceA,priceB)=>{return priceA[0]-priceB[0]});
    setChartData(priceArray);
  },[stockSnapShotAtom]);

  const [_curHoverTimeStampAtom, setCurHoverTimeStampAtom] = useRecoilState(BarrageHoverTimeStampAtom);
  const handleMouseOver = (event: any) => {
    const curHoverTimeStamp = event.target.x;
   
    setCurHoverTimeStampAtom(curHoverTimeStamp);
  };
  const handleMouseOut = (event: any)=>{
    setCurHoverTimeStampAtom(-1);
  }
  const config = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'GameStop Inc.'
    },
    subtitle: {
      text: '(NASDAQ: GME): 100 days'
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        point: {
          events: {
            mouseOver: handleMouseOver,
            mouseOut: handleMouseOut,
          }
        }
      },
    },
    yAxis: {
      title: {
        text: 'Price USD',
      },
    },
    xAxis: {
      type: 'datetime'
   },
    series: [
      {
        name: 'Price USD',
        data: chartData
      }
    ],
  };

  return (
    <div><HighchartsReact
      highcharts={Highcharts}
      options={config}
    /></div>
  )
}

