import React from 'react';

const CovidGraph = ({location}) => {
    switch (location){
        case "United States":
            location = "US";
            break;
    }

    

    const searchLocation = encodeURI(location)
    const searchQuery 
        = 'https://trekhleb.dev/covid-19/?selectedRegions=%5B%22'
        + searchLocation
        + '%22%5D&groupByCountry=true';
    console.log(searchQuery);
    return(
        <div style={{'height': '600px', 'width': '100%'}} >
            <h3>Local Trends</h3>
            <iframe
                src={searchQuery}
                scrolling= "no"
                height="85%"
                width="100%"
                title="Country COVID Graph"
                style={{'border': '1px solid black'}}
                >
            </iframe>
        </div>
    );
}

export default CovidGraph;
