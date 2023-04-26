import React, { useEffect } from "react";
import useState from "react-usestateref";
import bubbleData from "../../../../data/bubbleData.json";
import bubbleItem from "../../../../data/bubbleItem.json";
import restrict from "../../../../assets/images/restrict.png";
import BubbleChart from "./BubbleChart";


function Index() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [graphData, setGraphData] = useState([]);
    const [bubbleItemData, setBubbleItemData] = useState(bubbleItem);
    const [selectedIndex, setSelectedIndex,selectedIndexRef] = useState("");
    const [bubbleFlag, setBubbleFlag,bubbleFlagRef] = useState(false);

    // get Bubble list data
    const getBubbleList = (bubble) => {
        bubbleChartDataPrepration(bubbleData); //called prepare bubble data
        if (bubble.length) {
            setBubbleItemData(bubbleItem);
        }
    };

    //prepare bubble data
    const bubbleChartDataPrepration = (datas) => {
        if (datas.length) {
            const highestCount = datas.reduce(function (highest, current) {
                return (highest.count > current.count) ? highest : current;
            });
            highestCount["z"] = 100;
            highestCount["color"] = getColor();
            highestCount["name"] = highestCount.key + " <br />" + highestCount.count;
            datas.unshift(highestCount);
            const uniqueData = datas.filter((key, index, array) => array.findIndex(k => k.key == key.key) == index);
            uniqueData.map((element) => {
                element.color = getColor();
                element.name = element.key + " <br />" + element.count;

            });
            setGraphData(uniqueData);
            setData(uniqueData);
        }
        setRefresh(true);
    };

    //useEffect
    useEffect(() => {
        console.log(bubbleItemData,bubbleFlag,selectedIndex); //this need to be include for use react-usestateref package, othewise es lint throw error
        getBubbleList(bubbleData);
    }, []);

    // this fuction for data filter
    const handleChange = (id) => {
        setBubbleItemData(bubbleItem);
        selectedIndexRef.current === id ? setBubbleFlag(!bubbleFlagRef.current) : setBubbleFlag(false);
        selectBubbleElement(id);
        setSelectedIndex(id);

    };

    // Color generator function
    const getColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    //Bubble element alpha property add and remove
    const selectBubbleElement = (id) => {
        let value = data.map((item, index) => {
            if(selectedIndexRef.current === id && bubbleFlagRef.current){
                item.alpha = "100";
                return item;
            }else{
                if (index == id) {
                    item.alpha = "100";
                    return item;
                } else {
                    item.alpha = "20";
                    return item;
                }
            }    
        });
        // this method use by give unique data in array
        const uniqueData = value.filter((key, index, array) => array.findIndex(k => k.key == key.key) == index);
        setGraphData(uniqueData);
        setData(uniqueData);
    };


    return (

        <div className="bubblecart">
            <div></div>
            <div className="content">
                {/*Chart section*/}
                <div className="content__area d-flex justify-content-between">
                    <div className="chart_content">
                        {graphData.length ?
                            <>
                                <BubbleChart
                                    refresh={refresh}
                                    bubbleChart={graphData}
                                    handleChange={(id) => handleChange(id)}
                                />
                            </>
                            : <div className="restrict"><img src={restrict} alt="restrict" className="restrict__img" /></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
