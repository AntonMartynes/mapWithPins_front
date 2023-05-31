import { createContext, useState } from 'react';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Map } from './components/Map/Map';


export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <div className="App">
        <Header />
        <Map />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
