import React, { useState, useEffect } from 'react';
import clientAxios from '../../config/axios';
import Loading from '../layout/Loading';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

const GroupedBarChart = ({props}) => {
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

    const [msg, setMsg] = useState('');
    const [data, setData] = useState<CovidCases[]>();

    const getCovidCases = async () => {
        try {
            var uri = 'https://api.crown19db.me/v1/models/covid?sort=-cases&perPage=50'
            const response = await clientAxios.get<CovidCasesResponse>(uri)
                .then(response => {
                    setData(response.data.data);
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }
    
    useEffect(() => {
        setData(undefined);
        getCovidCases();
    }, [props]);

    return (
        <div className= "container">
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                <ResponsiveContainer width="100%" height={500}>
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
                        <XAxis dataKey="country.commonName" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                        <ReferenceLine y={0} stroke="#000" />
                        <Brush dataKey="name" height={30} stroke="#000" />
                        <Bar dataKey="cases" fill="#BF1A0E" />
                        <Bar dataKey="deaths" fill="#000000" />
                    </BarChart>
                </ResponsiveContainer>
                </> : <Loading />
            )}
        </div>
    );
}

export default GroupedBarChart;
