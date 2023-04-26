import React, { Component } from "react";
import HeadLayout from "../components/common/HeadLayout";
import BubbleMap from "../components/layout/history/bubbleMap/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class RoutesC extends Component {

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HeadLayout />}>
                        <Route index element={<BubbleMap />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default RoutesC;

