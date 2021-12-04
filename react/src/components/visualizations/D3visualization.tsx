import {BubbleChart} from "@weknow/react-bubble-chart-d3"
import { useState, useEffect } from 'react';
import clientAxios from '../../config/axios';
import Loading from "../layout/Loading";

const D3Visualization = (props: any) => {
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
                    console.log(response.data.data)
                    setData(response.data.data);
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }

    return ( 
        <div className= "container">
            {msg ? (<h3> {msg} </h3>) : (
                data ?
                <>
                    <h1>Covid DB Visualizations</h1>
                    <BubbleChart 
                        graph= {{ 
                            zoom: 1,
                            offsetX: 0.0,
                            offsetY: 0.0,
                        }}
                        width={1024}
                        height={600}
                        valueFont={{
                            family: "Arial",
                            size: 12,
                            color: "#fff",
                            weight: "bold"
                        }}
                        LabelFont={{
                            family: "Arial",
                            size: 12,
                            color: "#fff",
                            weight: "bold"
                        }}
                        data={data}/>
                    </> : <Loading />
            )}
        </div>
    )
}
 
export default D3Visualization;
