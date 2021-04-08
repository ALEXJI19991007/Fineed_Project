import React, { Component, useEffect, useRef, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { BarrageHoverTimeStampAtom } from '../../atoms/BarrageHoverTimeStampAtom'
import moment from 'moment'
import priceData from './fakeStockData.json';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useStockData } from "../../firebase/FirebaseFireStore";
import Slider from '@material-ui/core/Slider';
import { StockSnapShotAtom } from "../../atoms/StockSnapShotAtom";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from "@material-ui/core";
import { BarrageFocusTimeRangeAtom } from "../../atoms/BarrageFocusTimeRangeAtom";

const useStyles=makeStyles({
  stockChart: {
  }
})

const BarrageFocusTimeSlidingBar = withStyles({
  root: {
    color: '#52af77',
    height: 6,
    width: '200px',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export function StockChart() {
  const classes = useStyles();
  const { _ready, _stockDataArr } = useStockData();
  const stockSnapShotAtom = useRecoilValue(StockSnapShotAtom);
  const [chartData, setChartData] = useState<any>([])
  const [isBeta, setIsBeta] = useState<boolean>(false);

  useEffect(() => {
    let priceArray: number[][] = []
    stockSnapShotAtom.forEach((stockDataItem) => {
      priceArray.push([stockDataItem.time, stockDataItem.price]);
    });
    priceArray.sort((priceA, priceB) => { return priceA[0] - priceB[0] });
    setChartData(priceArray);
  }, [stockSnapShotAtom]);

  const [_curHoverTimeStampAtom, setCurHoverTimeStampAtom] = useRecoilState(BarrageHoverTimeStampAtom);
  const [curBarrageFocusTimeRangeAtom,setBarrageFocusTimeRangeAtom] = useRecoilState(BarrageFocusTimeRangeAtom)
  const handleMouseOver = (event: any) => {
    const curHoverTimeStamp = event.target.x;

    setCurHoverTimeStampAtom(curHoverTimeStamp);
  };
  const handleMouseOut = (event: any) => {
    setCurHoverTimeStampAtom(-1);
  }

  const handleFocusTimeChange = (event: any, newValue: number | number[]) => {
    setBarrageFocusTimeRangeAtom(newValue as number);
  };
  const config = {
    chart: {
      type: 'line',
      borderRadius: 10,
      height: 450,
      width: 650,
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
    xAxis: [{
      type: 'datetime',
      ordinal: false,
      minRange: 2 * 3600 * 1000,
      title: {
        text: ''
      },
      dateTimeLabelFormats: {
        day: '%b %e',
        week: '%b %e'
      },
      labels: {
        rotation: -60, align: 'right'
      }
    }],
    series: [
      {
        name: 'Price USD',
        data: chartData
      }
    ],
  };

  const betaConfig = {
    chart: {
      alignTicks: false,
      borderRadius: 10,
      zoomType: 'x',
      height: 450,
      width: 650,
    },

    credits: {
      enabled: false
    },

    scrollbar: {
      enabled: false
    },

    xAxis: [{
      type: 'datetime',
      ordinal: false,
      minRange: 2 * 3600 * 1000,
      title: {
        text: ''
      },
      dateTimeLabelFormats: {
        day: '%b %e',
        week: '%b %e'
      },
      labels: {
        rotation: -60, align: 'right'
      }
    }],

    plotOptions: {
      areaspline: {
        stacking: 'normal',
        fillOpacity: 0.5
      },
      spline: {
        dataGrouping: {
          approximation: 'average'
        }
      },
      series: {
        dataGrouping: {
          approximation: 'sum',
          groupPixelWidth: 20,
          smoothed: false,
          units: [[
            'minute',
            [30]
          ], [
            'hour',
            [1, 2, 3, 4, 6, 8, 12]
          ], [
            'day',
            [1]
          ], [
            'week',
            [1]
          ], [
            'month',
            [1, 3, 6]
          ], [
            'year',
            null
          ]]
        },
        point: {
          events: {
            mouseOver: handleMouseOver,
            mouseOut: handleMouseOut,
          }
        }
      },

    },

    // // Navigator
    // navigator: {
    //     enabled: false
    // },


    series: [
      {
        name: 'Price USD',
        data: chartData
      }
    ],
  }
  useEffect(() => {
    if (isBeta === false) {
      // window.location.reload();
    }
  }, [isBeta])

  return (
    <div>
      <div>
        <FormControlLabel control={<Checkbox
          checked={isBeta}
          onChange={() => {
            if (isBeta === true) {
              window.location.reload();
            } else {
              setIsBeta(!isBeta);
            }

          }}
          name="checkedB"
          color="primary"

        />} 
        label="Try Beta version(error trending)" color="primary"/>
      </div>
      {isBeta ? 
      <div>
      <BarrageFocusTimeSlidingBar valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={curBarrageFocusTimeRangeAtom} min={1} max={60} onChange={handleFocusTimeChange}/>
      <HighchartsReact
        className={classes.stockChart}
        highcharts={Highcharts}
        options={betaConfig}
      /> 
      </div>
      : <div>
      <BarrageFocusTimeSlidingBar valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={curBarrageFocusTimeRangeAtom} min={1} max={60} onChange={handleFocusTimeChange}/>
      <HighchartsReact
        className={classes.stockChart}
        highcharts={Highcharts}
        options={config}
      /> 
      </div>}
    </div>
  )
}