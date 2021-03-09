import React, { Component, useEffect, useRef, useState } from "react";
import moment from 'moment'
import priceData from './fakeStockData.json';

const ReactHighcharts = require('react-highcharts');

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
    
    return <div><ReactHighcharts config = {config}></ReactHighcharts></div>
}

