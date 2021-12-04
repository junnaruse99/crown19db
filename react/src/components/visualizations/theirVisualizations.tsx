import { useState, useEffect } from 'react';
import Loading from "../layout/Loading";
import {
    BarChart,
    Bar,
    Brush,
    Legend,
    ReferenceLine,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis, } from 'recharts';
import clientAxios from '../../config/axios';
import FunnelIncomeChart from './funnelChart';

export default function TheirVisualizations(props: any) {
    return ( 
        <div className= "container">
            <h1>Around The World Visualizations</h1>
            <h5> Percent of tourism in total GDP </h5>
            { < WaterGdpScatterPlot /> }
            <h5> Amount of Countries per Income Level </h5>
            { < FunnelIncomeChart /> }
            <h5> Number of countries exporting different products: </h5>
            { <ExportRadarChart /> }
        </div>
    );
}

const WaterGdpScatterPlot = (props: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            var data: any;
            var tourismData: any;
            var uri = 'https://api.around-the-world.me/foodandtourism?per_page=200';
            await clientAxios.get(uri)
                .then((response: any) => {
                    tourismData = response.data;
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

            data = [];
            for (var i in tourismData.result) {
                var countryTourismData = tourismData.result[i];
                data.push({
                    name: countryTourismData.country_name,
                    percentTourismGdp: countryTourismData.country_tourism_percent_GDP
                });
            }

            // Sort countries from most to least percent tourism gdp
            data.sort((a, b) => b.percentTourismGdp - a.percentTourismGdp);

            setData(data);
            setLoading(false);
        }
        fetch();
    }, []);

    const tooltipFormatter = (value) => {
        return [value + '%', 'Percent GDP from tourism'];
    }

    const tourismGdpPercentage = <ResponsiveContainer width="100%" height={500}>
        <BarChart
            width={700}
            height={500}
            data={data}
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
            <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={tooltipFormatter}/>
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} formatter={(value) => 'Percent GDP from tourism' }/>)
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#000" />
            <Bar dataKey="percentTourismGdp" fill="#BF1A0E" />
        </BarChart>
    </ResponsiveContainer>;

    return(
        <>
            { loading ? <Loading /> : tourismGdpPercentage }
        </>
    );
}

const ExportRadarChart = (props: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            var uri = 'https://api.around-the-world.me/foodandtourism?per_page=200';
            await clientAxios.get(uri)
                .then((response: any) => {
                    var exportData: any = {};
                    for (var i in response.data.result) {
                        var countryExportData  = response.data.result[i];
                        var agriExport = countryExportData.country_agricultural_exports;

                        if (agriExport.indexOf(',') == -1) {
                            if (!(agriExport in exportData)) {
                                exportData[agriExport] = 1;
                            } else {
                                exportData[agriExport]++;
                            }
                        }
                    }

                    var data: any = [];
                    for (var i in exportData) {
                        var numExports = exportData[i];
                        if (numExports > 1) {
                            data.push({
                                name: i,
                                numExports: numExports
                            });
                        }
                    }

                    setData(data);
                    setLoading(false);
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
        }
        fetch();
    }, []);

    const exportRadarChart = 
        <ResponsiveContainer width="100%" height={500}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Number of countries" dataKey="numExports" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
            </RadarChart>
        </ResponsiveContainer>;

    return (
        <>
            { loading ? <Loading /> : exportRadarChart }
        </>
    );
}
