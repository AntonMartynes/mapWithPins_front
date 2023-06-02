import React, { createContext, useState, useEffect } from 'react';
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
  }])

  useEffect(() => {
    const getMarkers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/');
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
          markers={markers} 
          setMarkers={setMarkers}
          isLoading={isLoading}
        />
        <Map markers={markers}/>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
