import React, { Component, useEffect, useRef, useState } from "react";
import moment from 'moment'
import priceData from './fakeStockData.json';

const ReactHighstock = require('react-highcharts/ReactHighstock')

export function StockChart(){
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
            }
          }
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
        ]
      };
    
    return <div><ReactHighstock config = {config}></ReactHighstock></div>
}

