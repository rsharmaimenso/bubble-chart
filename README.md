A simple and lightweight official React component for FusionCharts JavaScript charting library. `react-fusioncharts` enables you to add JavaScript charts in your React application or project without any hassle.

# Bubble chart ( Highlighting bubble )

Bubble chart for representing data.

![image](https://github.com/rsharmaimenso/bubble-chart/blob/master/public/allBUbble.png)



# Install

With npm:

```
react-fusioncharts
```

Dependencies:


```
fusioncharts
```

# Usage

### you have created your app using `create-react-app`

Import React, `react-fusioncharts` and FusionCharts in your app:


```
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
```


## Highlighted bubble

When we click of any bubble plot, Its show selected and `highlighted`.


## Basic Chart

### Data Type

The dataset is entered as a `data`. Each data must be completed with the `name` and `data`, and data must be include `x`,`y` coordinates, and `z` is repratation size of bubble.

```js

const dataSource = {
    dataset: [
        {
            data: [
                    {   
                        "x": "1900",
                        "y": "130.79",
                        "z": "38.97",
                        "key":"corporation",
                        "name":"corporation",
                        "count":1079       
                    },
                    {
                        "x": "1300",
                        "y": "200.89",
                        "z": "17.71",
                        "key":"people_new",
                        "name":"people",
                        "count":3853         
                    },
                    {
                        "x": "2400",
                        "y": "240.74",
                        "key":"company",
                        "count":7600    
                    },

                    ...
            ]
        }
    ],
}
```

## dataPlotClick(event, handler)

We use this event function in dataset. There are following function we used...

Type: `Function`

* `{String}event`: the name of the event.
* `{Function}handler`: handler function.


Other available events :

* `mouseenter` : triggered when the mouse enter into the bubble.
* `mouseover `: triggered when the mouser is over the bubble.
* `mouseout `: triggered when the mouse left the bubble.
* `click` : triggered when the bubble clicked.

```

const dataSource = {
    events: {
        dataPlotClick: function (ev) {
            //goes with your code
        },
        dataplotRollOver: function () {
            // change background color of plottooltext when hovering over a data point
            var plottooltext = document.getElementsByClassName("fusioncharts-div")[0];
            plottooltext.style.backgroundColor = "#000000"; // set background color to black
            plottooltext.style.color = "#fff"; // set text color to white
        },
        dataplotRollOut: function () {
            // reset background color of plottooltext when rolling out of a data point
            var plottooltext = document.getElementsByClassName("fusioncharts-div")[0];
            plottooltext.style.backgroundColor = ""; // reset to default background color
        }
    }
}
```

# Example


##  Selected bubble element 

   After click on bubble plot with the help of event `dataPlotClick` fuction, we are showing the bubble element selected in chart. 

![image](https://github.com/rsharmaimenso/bubble-chart/blob/master/public/selectedBubble.png)


# Code


```js
// STEP 1 - Include Dependencies
// Include react
import React, { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import bgCircle from "../../../../assets/images/bubbleBgImage.png";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function BubbleChart(props) {
    const [bubbleChart, setBubbleChart] = useState([]);

    //dataSource uses for chart property
    const dataSource = {
        chart: {
            xaxisname: "",
            yaxisname: "",
            yAxisValueAlpha: "0",
            xAxisValueAlpha: "0",
            theme: "fusion",
            showvalues: "1",
            plottooltext: "$name",
            valueFontColor: "#FFFFFF",
            valueFontSize: 9,
            useEllipsesWhenOverflow: "1",
            divLineAlpha: "0",
            bgImage:bgCircle,
            bgAlpha: "1",
            bgImageHAlign:"middle",
            bgImageVAlign:"middle",
            bgImageScale:"tile"
        },
        xAxis: {
            visible: "0",
            showLabels:"0"
        },
        categories: [
            {
                category: [
                    {
                        label: "",
                        x: "",
                    }
                ]
            }
        ],
        dataset: [
            {
                data: []
            }
        ],
        events: {
            dataPlotClick: function (ev) {
                props.handleChange(ev.data.index, ev.data.displayValue);
            },
            dataplotRollOver: function () {
                // change background color of plottooltext when hovering over a data point
                var plottooltext = document.getElementsByClassName("fusioncharts-div")[0];
                plottooltext.style.backgroundColor = "#000000"; // set background color to black
                plottooltext.style.color = "#fff"; // set text color to white
            },
            dataplotRollOut: function () {
                // reset background color of plottooltext when rolling out of a data point
                var plottooltext = document.getElementsByClassName("fusioncharts-div")[0];
                plottooltext.style.backgroundColor = ""; // reset to default background color
            }
        }
    };

    const bubbleChartDataPrepration = () => {
        dataSource.dataset[0].data = props.bubbleChart;
        setBubbleChart(dataSource);
    };

    useEffect(() => {
        bubbleChartDataPrepration();
    }, [props.refresh]);

    return (
        <ReactFC
            type="bubble"
            width="100%"
            height="100%"
            dataFormat="JSON"
            renderAt="chart-container"
            dataSource={bubbleChart}
            {...bubbleChart}
        />
    );
}

```


#### You need to include `index.js` file to use above code.



Draw the chart.

Please feel free to open pull requests to make any change.



