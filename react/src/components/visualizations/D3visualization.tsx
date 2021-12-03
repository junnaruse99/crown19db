import {BubbleChart} from "@weknow/react-bubble-chart-d3"
import { useState, useEffect } from 'react';
import clientAxios from '../../config/axios';

const D3Visualization = (props: any) => {
    interface CovidCases {
        country: Country;
        cases: number;
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
    const [data, setData] = useState<CovidCasesResponse>();
    const getCovidCases = async () => {
        try {
            var uri = '/v1/models/covid/all';
            const response = await clientAxios.get<CovidCasesResponse>(uri)
                .then(response => {
                    setData(response.data);
                });
        } catch (error) {
            setMsg('There was an error');
        }
    }
    useEffect(() => {
        setData(undefined);
        getCovidCases();
    });

    return ( 
        <div className= "container">
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
        </div>
    )
}
 
export default D3Visualization;
