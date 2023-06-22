import React, { createContext, useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet'
import { Footer, Header, Map } from './components';



export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState();
  // markers
  const [markers, setMarkers] = useState([{
    latitude: 50.45156,
    longitude: 30.52530,
    description: 'asdas',
  }]);

  //lat and lng by clicking
  const [markerPosition, setMarkerPosition] = useState([]);

  function AddMarkerOnClick() {
    useMapEvents({
      click: (e) => {
        const newMarker = e.latlng;
        setMarkerPosition(newMarker);
      },
    });

    return null;
  }
  // end 

  useEffect(() => {
    const getMarkers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://leaflet-app-martynes.herokuapp.com/');
        if (response.ok) {
          const data = await response.json();
          setMarkers(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getMarkers();
  
  }, [markers.length]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <div className="App">
        <Header
          markerPosition={markerPosition} 
          markers={markers} 
          setMarkers={setMarkers}
          isLoading={isLoading}
        />
        <Map
          AddMarkerOnClick={AddMarkerOnClick} 
          markers={markers}
          setMarkers={setMarkers}  
        />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
