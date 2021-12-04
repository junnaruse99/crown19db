import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import GroupedBarChart from './groupedBarChart';
import DatesLineChart from './datesLineChart';
// import {GroupedBarChart} from "@d3/grouped-bar-chart"

const ourVisualizations = (props: any) => {
    return ( 
        <div style={{justifyContent:'center', alignItems:'center'}} className="container">
            <h1>Covid DB Visualizations</h1>
            <div style={{display: "flex", justifyContent:'center', alignItems:'center'}} className="container">
                <h3> Cases vs. Deaths </h3>
            </div>
            {<GroupedBarChart props/>}
            <div className= "mt-5"></div>
            <div style={{display: "flex", justifyContent:'center', alignItems:'center'}} className="container">
                <h3> Top 5 Countries Total Cases Timeline </h3>
            </div>
            <DatesLineChart props/>
        </div>
    )
}
 
export default ourVisualizations;
