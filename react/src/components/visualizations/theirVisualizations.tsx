// import React from 'react';
import { useState, useEffect } from 'react';
import React, { PureComponent } from 'react';
import Loading from "../layout/Loading";
import { BarChart, Bar, Brush, Legend, ReferenceLine, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
import clientAxios from '../../config/axios';

const TheirVisualizations = (props: any) => {

    return ( 
        <div className= "container">
            <h1>Around The World Visualizations</h1>
            <h5> Percent of tourism in total GDP </h5>
            { <WaterGdpScatterPlot /> }
        </div>
    );
}

const WaterGdpScatterPlot = (props: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            var data: any;
            var demoData: any;
            var geoData: any;
            var uri: any;

            // uri = '/v1/models/city?' + queryString.stringify(params);
            uri = 'https://api.around-the-world.me/demographics?per_page=200';
            await clientAxios.get(uri)
                .then((response: any) => {
                    demoData = response.data;
                })
                .catch(
                    error => {
                        if (error.response.status == 400) {
                            // setMsg(error.response.data);
                            // setData(undefined);
                        } else {
                            // setMsg('404 Not Found');
                            console.log(error.response.data);
                            // setData(undefined);
                        }
                    }
                );
            // uri = '___' + queryString.stringify(params);
            uri = 'https://api.around-the-world.me/foodandtourism?per_page=200';
            await clientAxios.get(uri)
                .then((response: any) => {
                    geoData = response.data;
                })
                .catch(
                    error => {
                        if (error.response.status == 400) {
                            // setMsg(error.response.data);
                            // setData(undefined);
                        } else {
                            // setMsg('404 Not Found');
                            console.log(error.response.data);
                            // setData(undefined);
                        }
                    }
                );
            // console.log(demoData);
            // console.log(geoData);

            data = [];
            var country_to_gdp = {};
            for (var i in demoData.result) {
                var countryData = demoData.result[i];
                country_to_gdp[countryData.country_name] = countryData.country_GDP;
                // data.push({
                //     water: countryData.country_population,
                //     gdp: countryData.country_GDP,
                //     name: countryData.country_name
                // });
            }

            // data = [];
            for (var i in geoData.result) {
                var countryData = geoData.result[i];
                var countryName = countryData.country_name;
                // var countryWaterPercent = countryData.country_water_percent;
                var countryWaterPercent = countryData.country_tourism_revenue;
                // console.log(countryWaterPercent);
                // countryWaterPercent = countryWaterPercent.substring(0, countryWaterPercent.indexOf(' '));
                // countryWaterPercent = parseInt(countryWaterPercent);
                // console.log(countryWaterPercent);
                var countryGdp = country_to_gdp[countryName];
                if (countryWaterPercent && countryGdp) { // exclude countries with missing data
                    data.push({
                        water: countryWaterPercent,
                        gdp: countryGdp,
                        name: countryName
                    });
                }
            }
            console.log(geoData.result.length - data.length + " countries missing data");

            console.log(data);

            setData(data);
            setLoading(false);
        }
        fetch();
    }, []);
    
    const data2 = [
        { x: 100, y: 200, z: 200 }, // TODO what is z?
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
    ];

    // Format a tick mark in the graph (return value as dollars with commas)
    const tickFormatter = (value) => {
        return '$' + value.toLocaleString();
    }

    var scatterChart = 
        <ScatterChart
            width={900}
            height={600}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 100,
            }}
        >
        <CartesianGrid />
        <XAxis type="number" dataKey="water" name="Tourism GDP" tickFormatter={tickFormatter} label="Tourism GDP"/>
        <YAxis type="number" dataKey="gdp" name="GDO" tickFormatter={tickFormatter} label="GDP"/>
        <Scatter name="A school" data={data} fill="#8884d8">
           {/* <LabelList dataKey="name" /> */}
        </Scatter>
      </ScatterChart>;

    var newData: any = [];
    for (var dd in data) {
        var d: any = data[dd];
        if (d && d.water ** d.gdp) {
            var num: any = (1.0 * d.water) / d.gdp;
            num *= 100;
            num = Number(num.toFixed(2));
            newData.push({num: num, name: d.name});
        }
    }
    newData.sort((a, b) => {
        return b.num - a.num;
    });

    console.log(newData);

    const numFormatter = (value) => {
        return [value + '%', 'Percent GDP from tourism'];
    }

    const tourismGdpPercentage = <ResponsiveContainer width="100%" height={500}>
        <BarChart
            width={700}
            height={500}
            data={newData}
            margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%"/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={numFormatter}/>
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} formatter={(value) => 'Percent GDP from tourism' }/>)
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#000" />
            <Bar dataKey="num" fill="#BF1A0E" />
        </BarChart>
    </ResponsiveContainer>;

    return(
        <>
            {/* { loading ? <Loading /> : scatterChart } */}

            { loading ? <Loading /> : tourismGdpPercentage }
        </>
    );
}
 
export default TheirVisualizations;
