import { useState, useEffect } from 'react';
import React, { PureComponent } from 'react';
import Loading from "../layout/Loading";
import {FunnelChart, Funnel, Tooltip, LabelList} from 'recharts';
import clientAxios from '../../config/axios';

const FunnelIncomeChart = (props: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            var data: any;
            var unparsedData: any;
            var uri: any;
            data = [];
            uri = 'https://api.around-the-world.me/foodandtourism?per_page=200';
            await clientAxios.get(uri)
                .then((response: any) => {
                    unparsedData = response.data;
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
            var highIncome = 0;
            var upperMiddleIncome = 0;
            var lowerMiddleIncome = 0;
            var lowIncome = 0;
            
            for (var i in unparsedData.result) {
                var tourismData = unparsedData.result[i];
                var incomeLevel = tourismData.country_income_level;
                if (incomeLevel == "High income") {
                    ++highIncome;
                } else if (incomeLevel == "Upper middle income") {
                    ++upperMiddleIncome;
                } else if (incomeLevel == "Lower middle income") {
                    ++lowerMiddleIncome;
                } else {
                    ++lowIncome;
                }
            }
            data.push({
                    "name": "High Income",
                    "value": highIncome,
                    "fill": "#fffb08"
                });
            data.push({
                    "name": "Upper Middle Income",
                    "value": upperMiddleIncome,
                    "fill": "#edb137"
                });
            data.push({
                    "name": "Lower Middle Income",
                    "value": lowerMiddleIncome,
                    "fill": "#ed8137"
                });
            data.push({
                    "name": "Low Income",
                    "value": lowIncome,
                    "fill": "#bf4f51"
                });
            

            console.log(data);

            setData(data);
            setLoading(false);
        }
        fetch();
    }, []);
    const chart = <FunnelChart width={800} height={500}>
                    <Tooltip />
                        <Funnel
                            dataKey="value"
                            data={data}
                            isAnimationActive
                            >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
    return (
        <>
            { loading ? <Loading /> : chart }
        </>
    );
}

export default FunnelIncomeChart;