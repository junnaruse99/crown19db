import React from 'react';

// Either Bing search covid updates for a location
// or Bing search testing sites for a location
const LocaleInfo = ({ location, showNews, showTests }) => {

    const searchLocation = encodeURI(location)
    const searchType = 
        showNews ? 'news'
                 : showTests ? 'testing' : '';
    const searchQuery 
        = 'https://www.bing.com/search?q='
        + searchLocation + ' '
        + 'covid ' + searchType
        + '&count=5';

    const localeInfoHeader = location === 'near by' && showTests ?
        'Find a COVID test near you:'
        : location === 'near by' && showNews ?
            'Discover COVID news near you:'
            : `COVID ${searchType} in ${location}:`;

    return(
        <div style={{'height': '600px', 'width': '100%'}} >
            <h3>{localeInfoHeader}</h3>
            <iframe
                src={searchQuery}
                height="90%"
                width="100%"
                title="Local COVID information"
                style={{'border': '1px solid black'}}
                >
            </iframe>
        </div>
    );
}

export default LocaleInfo;
