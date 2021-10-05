import React from 'react'
import { useParams } from 'react-router-dom';
import CardRow from './cardRow';
import { Link } from 'react-router-dom';
import { Chart } from "react-google-charts";

const CovidInstance = () => {
    const covidcases = require('../../covid.json');
    let { date } = useParams();
    date = date.replace(/-/g, '/');
    
    let covid;

    // Find date
    for (let i = 0; i < covidcases.length; i++) {
        if (date === covidcases[i].Date) {
            covid = covidcases[i];
        }
    }

    // THIS IS ONLY FOR PHASE I
    let img = {
        Canada: "https://www.countryflags.io/ca/flat/64.png",
        Mexico: "https://www.countryflags.io/mx/flat/64.png"
    };

    img["United States"] = "https://www.countryflags.io/us/flat/64.png";
    
    return (
        <div className='container'>
            {covid ? (
                <div className="row">
                    <div className="col-8">
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Type', 'Amount'],
                                ['Number of cases', covid.Cases],
                                ['Number of deaths', covid.Deaths],
                                ['Number of recovers', covid.Recovered]
                            ]}
                            options={{
                                title: 'Covid Information',
                                chartArea: { width: '50%' },
                                hAxis: {
                                title: 'Amount',
                                minValue: 0,
                                },
                                vAxis: {
                                title: 'Type',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <h2 className="text-center text-uppercase font-weigh-bold mb-0">{date}</h2>
                            <div className="card-body">
                                <p className="card-text">
                                    <table className="table">
                                        <tbody>
                                            <CardRow info={{name:"Number of cases", description:covid.Cases, condition:true, Component:"div", to:"", img:""}}/>
                                            <CardRow info={{name:"Number of deaths", description:covid.Deaths, condition:true, Component:"div", to:"", img:""}}/>
                                            <CardRow info={{name:"Number of recovers", description:covid.Recovered, condition:true, Component:"div", to:"", img:""}}/>
                                            <CardRow info={{name:"Countries with most cases", description:covid['Country-cases'], condition:true, Component:Link, to:"/country/" + covid['Country-cases'][0], img:img[covid['Country-cases'][0]]}}/>
                                            <CardRow info={{name:"Countries with most deaths", description:covid['Country-deaths'], condition:(!(covid.Cases === 0  || (covid['Country-deaths'] && covid['Country-deaths'].length === 0))), Component:Link, to:"/country/" + covid['Country-deaths'][0], img:img[covid['Country-deaths'][0]]}}/>
                                            <CardRow info={{name:"Countries with most recovers", description:covid['Country-recovered'], condition:(!(covid.Recovered === 0  || (covid['Country-recovered'] && covid['Country-recovered'].length === 0))), Component:Link, to:"/country/" + covid['Country-recovered'][0], img:img[covid['Country-recovered'][0]]}}/>
                                            <CardRow info={{name:"States with most cases", description:covid['State-cases'], condition:(!(covid.Cases === 0  || (covid['State-cases'] && covid['State-cases'].length === 0))), Component:"div", to:"", img:""}}/>
                                            <CardRow info={{name:"States with most deaths", description:covid['State-deaths'], condition:(!(covid.Deaths === 0  || (covid['State-deaths'] && covid['State-deaths'].length === 0))), Component:"div", to:"", img:""}}/>
                                            <CardRow info={{name:"States with most recovers", description:covid['State-recovered'], condition:(!(covid.Recovered === 0  || (covid['State-recovered'] && covid['State-recovered'].length === 0))), Component:"div", to:"", img:""}}/>
                                            <CardRow info={{name:"Capital of country with most cases", description:covid.Capital, condition:true, Component:Link, to:"/city/" + covid.Capital}}/>
                                        </tbody>
                                    </table>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <h2>This page is under construction</h2>} 
        </div>
    )
}
 
export default CovidInstance;