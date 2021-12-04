import { useState, useEffect } from 'react';
import Loading from "../layout/Loading";
import { BarChart, Bar, Brush, Legend, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

// const FunnelIncomeChart = (props: any) => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetch = async () => {
//             var data: any;
//             var unparsedData: any;
//             var uri: any;
//             data = [];
//             uri = 'https://api.around-the-world.me/foodandtourism?per_page=200';
//             await clientAxios.get(uri)
//                 .then((response: any) => {
//                     unparsedData = response.data;
//                 })
//                 .catch(
//                     error => {
//                         if (error.response.status == 400) {
//                             // setMsg(error.response.data);
//                             // setData(undefined);
//                         } else {
//                             // setMsg('404 Not Found');
//                             console.log(error.response.data);
//                             // setData(undefined);
//                         }
//                     }
//                 );
//             var highIncome = 0;
//             var upperMiddleIncome = 0;
//             var lowerMiddleIncome = 0;
//             var lowIncome = 0;
            
//             for (var i in unparsedData.result) {
//                 var tourismData = unparsedData.result[i];
//                 var incomeLevel = tourismData.country_income_level;
//                 if (incomeLevel == "High income") {
//                     ++highIncome;
//                 } else if (incomeLevel == "Upper middle income") {
//                     ++upperMiddleIncome;
//                 } else if (incomeLevel == "Lower middle income") {
//                     ++lowerMiddleIncome;
//                 } else {
//                     ++lowIncome;
//                 }
//             }
//             data.push({
//                     "value": highIncome,    
//                     "name": "High Income",
//                     "fill": "#fffb08"
//                 });
//             data.push({
//                     "value": upperMiddleIncome,    
//                     "name": "Upper Middle Income",
//                     "fill": "#edb137"
//                 });
//             data.push({
//                     "value": lowerMiddleIncome,    
//                     "name": "Lower Middle Income",
//                     "fill": "#ed8137"
//                 });
//             data.push({                
//                     "value": lowIncome,
//                     "name": "Low Income",
//                     "fill": "#bf4f51"
//                 });
            

//             console.log(data);

//             setData(data);
//             setLoading(false);
//         }
//         fetch();
//     }, []);
//     const chart = 
//                 <FunnelChart width={1000} height={700} onClick = >
//                     <Tooltip />
//                         <Funnel
//                             dataKey="value"
//                             data={data}
//                             isAnimationActive
//                         >
//                         <LabelList position="right" fill="#000000" stroke="none" dataKey="name" />
//                     </Funnel>
//                 </FunnelChart>
//     return(
//         <>
//             { loading ? <Loading /> : chart }
//         </>
//     );
// }