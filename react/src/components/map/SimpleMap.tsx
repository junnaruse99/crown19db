import GoogleMapReact from 'google-map-react';

const SimpleMap = ( { center } ) => {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAQNa-ROqIfOLk6A-qk_-3ETNfWaIzIQWI'}}
          defaultCenter={center}
          defaultZoom={11}
          onClick={onclick}
        >
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;
