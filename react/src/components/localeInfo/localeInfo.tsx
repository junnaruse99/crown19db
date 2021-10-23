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

    return(
        <div style={{'height': '600px', 'width': '100%'}} >
            {
                location === 'near by' && showTests ?
                    <h3>Find a COVID test near you:</h3>
                    :
                    <h3>COVID {searchType} in {location}:</h3>
            }
            <iframe
                src={searchQuery}
                height="100%"
                width="100%"
                title="Local COVID information"
                style={{'border': '1px solid black'}}
                >
            </iframe>
        </div>
    );
}

export default LocaleInfo;
