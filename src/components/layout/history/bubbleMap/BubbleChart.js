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
