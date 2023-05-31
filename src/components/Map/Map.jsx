import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import './Map.scss';

export const Map = () => {
  // markers
  const markers = [
    {
      geocode: [50.27, 30.3127],
      popUp: 'Hello 1',
    },
    {
      geocode: [51.27, 30.3127],
      popUp: 'Hello 1',
    },
    {
      geocode: [50.28, 30.3127],
      popUp: 'Hello 2',
    },
    {
      geocode: [50.27, 30.3150],
      popUp: 'Hello 3',
    }
  ];

  const customIcon = new Icon({
    iconUrl: require('../../assets/marker-icon.png'),
    iconSize: [38, 38],
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class='cluset-icon'>${cluster.getChildCount()}</div>`,
      
    })
  }

  return (
    <MapContainer center={[50.30, 30.3127]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers.map(marker => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>
              {marker.popUp}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

    </MapContainer>
  );
}
