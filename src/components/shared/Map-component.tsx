import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPinComponent from './Location-component';

const MapComponent = ({ location, zoomLevel }: any) => {
	const defaultProps = {
		center: {
			lat: 36.09248216797905,
			lng: -79.76396336639901
		},
		zoom: 11
	};
	return (
		<div className="flex flex-col gap-5 mt-10">
			<h2 className="text-2xl text-center font-bold">
				Worship With Us Today!
			</h2>

			<div className="google-map w-full h-96">
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.GOOGLE_MAP_KEY
					}}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}>
					<LocationPinComponent
						lat={defaultProps.center.lat}
						lng={defaultProps.center.lng}
						text="1305 Ball Street, Greensboro"
					/>
				</GoogleMapReact>
			</div>
		</div>
	);
};

export default MapComponent;
