import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import GroupedBarChart from './groupedBarChart';
// import {GroupedBarChart} from "@d3/grouped-bar-chart"

const ourVisualizations = (props: any) => {
    return ( 
        <div style={{justifyContent:'center', alignItems:'center'}} className="container">
            <h1>Covid DB Visualizations</h1>
            <div style={{display: "flex", justifyContent:'center', alignItems:'center'}} className="container">
                <h3> Cases vs. Deaths </h3>
            </div>
            <div>
                <GroupedBarChart props/>
            </div>
        </div>
    )
}
 
export default ourVisualizations;
