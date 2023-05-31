import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import './Map.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

export const Map = () => {
  // markers
  const markers = [
    {
      geocode: [50.27, 30.3127],
      popUp: 'Hello 1',
    },
    {
      geocode: [50.45156, 30.52530],
      popUp: 'Hello 1',
    },
    {
      geocode: [50.46156, 30.52530],
      popUp: 'Hello 2',
    },
    {
      geocode: [50.45696, 30.52930],
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

  const globalTheme = useContext(ThemeContext);
  const mode = globalTheme.theme === 'light' ? '' : '_dark';
  const mapURL = `https://tiles.stadiamaps.com/tiles/alidade_smooth${mode}/{z}/{x}/{y}{r}.png`;
  

  return (
    <MapContainer center={[50.45156, 30.52530]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url={mapURL}
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
