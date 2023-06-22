import React, { useContext, useState } from 'react';
import { Dna } from  'react-loader-spinner';
import { Modal } from '../Modal/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FormField } from '../../components';
import { ThemeContext } from '../../App';
import { CustomizedSwitches } from '../ToggleSwitch/Switch';
import proj4 from 'proj4';

import './Header.scss';

export const Header = ({markers, setMarkers, isLoading, markerPosition}) => {
  const [addingModalActive, setAddingModalActive] = useState(false);
  const [showAllPointsModaL, setShowAllPointsModal] = useState(false);

  const convertCoordinates = (latitude, longitude) => {
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs'
    );

    const result = proj4('EPSG:4326', 'EPSG:3857', [longitude, latitude]);
    return { x: result[0], y: result[1] };
  };



  const globalTheme = useContext(ThemeContext);
  const mode = globalTheme.theme === 'light' ? 'light' : 'dark';

  return (
    <header className="header header__main" id={mode}> 
      <h1>Welcome to the My MAP</h1>
      <Dna
        visible={isLoading}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />

      <div className="header__buttons">
        <Button variant="outlined" onClick={() => setShowAllPointsModal(true)}>
          Show all points attribute
        </Button>

        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setAddingModalActive(true)}>
          Add new point
        </Button>

        <CustomizedSwitches />

        <div  className='header__modal'> 
          <div className={showAllPointsModaL ? 'modal active' : 'modal'  } onClick={() => setShowAllPointsModal(false)}>
            <div className={showAllPointsModaL ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
              <table>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
                {markers.map(marker => {
                const { x, y } = convertCoordinates(Number(marker.latitude), Number(marker.longitude));
                  return (
                    <tr key={marker.id}>
                      <td>{marker.id}</td>
                      <td>{marker.name}</td>
                      <td>{marker.description}</td>
                      <td>{x}</td>
                      <td>{y}</td>
                  </tr>
                  );
                })}
              </table>
            </div>
          </div>   
        </div>

        <Modal active={addingModalActive} setActive={setAddingModalActive} className='header__modal'> 
          <h2 className='header__modal__name'>
            Add new point
          </h2>

          <FormField
            markerPosition={markerPosition}
            modalActive={addingModalActive} 
            setActive={setAddingModalActive}
            markers={markers} 
            setMarkers={setMarkers}
          />
        </Modal>

      </div>
    </header>
  )
}