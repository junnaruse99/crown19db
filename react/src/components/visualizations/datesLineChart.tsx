import React, { useState, useEffect } from 'react';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DatesLineChart = ({props}) => {
    interface CovidInstance {
        country: Country;
        country_id: number;
        date: string;
        id: number;
        totalCases: number;
        city: City;
    }

    interface City {
        name: string;
        id: number;
    }

    interface Country {
        officialName: string;
        commonName: string;
    }

    interface graphDate {
        date: string;
        US: number;
        India: number;
        Brazil: number;
        UK: number;
        Russia: number;
    }

    let allData: any[] = []

    const [data, setAllData] = useState<graphDate[]>();
    const [msg, setMsg] = useState('');

    var output: any;

    const getCovid = async (country_id: number) => {
        try {
            const response = await clientAxios.get<CovidInstance[]>(`https://api.crown19db.me/v1/models/covidInstance/country_id=${country_id}`)
                .then(response => {
                    output = response.data;
                })
                .catch(
                    error => {
                        if (error.response.status == 400) {
                            setMsg(error.response.data);
                        } else {
                            setMsg('404 Not Found');
                            console.log(error.response.data);
                        }
                    }
                );
        } catch (error) {
            setMsg('There was an error');
        }

        return new Promise(resolve => {resolve(output)});
    }

    async function getAllData() {
        const [firstCall, secondCall, thirdCall, fourthCall, fifthCall] = await Promise.all([
		    getCovid(109),
            getCovid(71),
            getCovid(187),
            getCovid(66),
            getCovid(118)
	    ])

        allData.push(firstCall)
        allData.push(secondCall)
        allData.push(thirdCall)
        allData.push(fourthCall)
        allData.push(fifthCall)
        let tempData: graphDate[] = []
        for (let i = 0; i < 616; i++) {
            let instance = {date: (allData[0][i].date).slice(0,10),
                            US: allData[0][i].totalCases,
                            India: allData[1][i].totalCases,
                            Brazil: allData[2][i].totalCases,
                            UK: allData[3][i].totalCases,
                            Russia: allData[4][i].totalCases}
            tempData.unshift(instance)
        }
        setAllData(tempData)
    }

    useEffect(() => {
        getAllData()
    }, []);

    return (
        <div className= "container">
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart
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
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="US" stroke="#2271B3" activeDot={{ r: 1 }} />
                        <Line type="monotone" dataKey="India" stroke="#C2B078" />
                        <Line type="monotone" dataKey="Brazil" stroke="#008F39" />
                        <Line type="monotone" dataKey="UK" stroke="#5E2129" />
                        <Line type="monotone" dataKey="Russia" stroke="#434B4D" />
                    </LineChart>
                </ResponsiveContainer>
                </> : <Loading />
            )}
        </div>
    );
}

export default DatesLineChart;
