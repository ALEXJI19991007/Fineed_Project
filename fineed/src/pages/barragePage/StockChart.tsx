import React, { Component, useEffect, useRef, useState } from "react";
import { atom, selector, useRecoilState } from 'recoil';
import { BarrageHoverTimeStampAtom } from '../../atoms/BarrageHoverTimeStampAtom'
import moment from 'moment'
import priceData from './fakeStockData.json';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function StockChart() {
  const [_curHoverTimeStampAtom, setCurHoverTimeStampAtom] = useRecoilState(BarrageHoverTimeStampAtom)
  const handleMouseOver = (event: any) => {
    const curHoverTimeStamp = event.target.x;
    console.log(curHoverTimeStamp)
    setCurHoverTimeStampAtom(curHoverTimeStamp);
  };
  const config = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Apple Inc.'
    },
    subtitle: {
      text: '(NASDAQ: AAPL): 100 days'
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        point: {
          events: {
            mouseOver: handleMouseOver
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
      type: 'date',
      labels: {
        enabled: false
      },
    },
    series: [
      {
        name: 'Price USD',
        data: priceData
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

