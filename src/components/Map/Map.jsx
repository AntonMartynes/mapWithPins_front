import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { Icon, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { memo, useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import { GetCoordinates, LocationButton } from './features';
import Button from '@mui/material/Button';



import 'leaflet/dist/leaflet.css'
import './Map.scss';

export const Map = memo(({ markers, setMarkers, AddMarkerOnClick }) => {
  const [map, setMap] = useState(null);

  const handleDelete = (markerId) => {
    return async () => {
      try {
        const response = await fetch(`https://leaflet-app-martynes.herokuapp.com/${markerId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Видалення маркера зі списку markers
          const updatedMarkers = markers.filter((marker) => marker.id !== markerId);
          setMarkers(updatedMarkers);
          console.log('Marker deleted successfully');
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
  };

  
  const center = [50.45156, 30.52530];

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
  const mapURL = `https://tiles.stadiamaps.com/tiles/alidade_smooth${mode}/{z}/{x}/{y}{r}.png?api_key=42b991fa-8b5c-4970-81e3-c3d35f26afdb`;
  

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      scrollWheelZoom={true} 
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url={mapURL}
        
      />

      <AddMarkerOnClick />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >

        {markers.map(marker => (
          <Marker position={[marker.latitude, marker.longitude]} icon={customIcon}>
            <Popup className='popup'>
              <div className="popup__text">
                ID: {marker.id} 
                <br/>
                Name: {marker.name} 
                <br/>
                Description: {marker.description}
                <br/>
                Latitude: {marker.latitude}
                <br/>
                Longitude: {marker.longitude}
                <br/>

                <Button onClick={handleDelete(marker.id)}>delete</Button>               
              </div>

            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <GetCoordinates />
      <LocationButton map={map}/>

    </MapContainer>
  );
});
