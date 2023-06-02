import React, { createContext, useState, useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Map } from './components/Map/Map';


export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');
  // markers
  const [markers, setMarkers] = useState([{
    latitude: 50.45156,
    longitude: 30.52530,
    description: 'asdas',
  }])

  useEffect(() => {
    const getMarkers = async () => {
      try {
        const response = await fetch('http://localhost:8080/');
        if (response.ok) {
          const data = await response.json();
          setMarkers(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
    getMarkers(); // Initial fetch
  
  }, [markers.length]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <div className="App">
        <Header 
          markers={markers} 
          setMarkers={setMarkers}
        />
        <Map markers={markers}/>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
