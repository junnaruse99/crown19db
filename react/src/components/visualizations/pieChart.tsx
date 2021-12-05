import React, { useState, useEffect } from 'react';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const PiesChart = ({props}) => {
    interface CovidCases {
        country: Country;
        id: number;
        cases: number;
        deaths: string;
        recovered: number;
        country_id: number;
        lastCovidCase: string;
    }

    interface CovidCasesResponse {
        count: number;
        data: CovidCases[];
    }

    interface Country {
        commonName: string;
        officialName: string;
    }

    interface PieChartData{
        name: string;
        value: string;
    }

    let allData: any[] = []

    const [msg, setMsg] = useState('');
    const [data, setAllData] = useState<PieChartData[]>();

    var output: any;

    const getCovidCases = async () => {
        try {
            var uri = 'https://api.crown19db.me/v1/models/covid?sort=-cases&perPage=100'
            const response = await clientAxios.get<CovidCasesResponse>(uri)
                .then(response => {
                    output = response.data.data;
                });
        } catch (error) {
            setMsg('There was an error');
        }
        return new Promise(resolve => {resolve(output)});
    }

    async function getAllData() {
        const [firstCall] = await Promise.all([
		    getCovidCases(),
	    ])

        allData.push(firstCall)

        // console.log(allData)    


        let tempData: PieChartData[] = []
        for (var c of allData[0]) {
            // console.log(c[0])    
            let instance = {name: c.country.commonName,
                            value: c.deaths
                            }
            tempData.push(instance)
        }
        console.log(tempData)
        setAllData(tempData)
    }
    
    useEffect(() => {
        getAllData()
    }, [props]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        );
    };

    return (
        <div className= "container">
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={250}
                            fill="#8884d8"
                            dataKey="value"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                    </PieChart>
                </ResponsiveContainer>
                </> : <Loading />
            )}
        </div>
    );
}

export default PiesChart;
