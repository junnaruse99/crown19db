import GoogleMapReact from 'google-map-react';

const SimpleMap = ( { info } ) => {

    const { center, zoom } = info;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAQNa-ROqIfOLk6A-qk_-3ETNfWaIzIQWI'}}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={onclick}
        >
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;
