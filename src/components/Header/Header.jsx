import React, { useContext, useState } from 'react';
import { Dna } from  'react-loader-spinner';
import { Modal } from '../Modal/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FormField } from '../../components';
import { ThemeContext } from '../../App';
import { CustomizedSwitches } from '../ToggleSwitch/Switch';

import './Header.scss';

export const Header = ({markers, setMarkers, isLoading}) => {
  const [addingModalActive, setAddingModalActive] = useState(false);
  const [showAllPointsModaL, setShowAllPointsModal] = useState(false);


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
                {markers.map(marker => (
                  <tr>
                    <td>{marker.id}</td>
                    <td>{marker.name}</td>
                    <td>{marker.description}</td>
                    <td>{marker.latitude}</td>
                    <td>{marker.longitude}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>   
        </div>

        <Modal active={addingModalActive} setActive={setAddingModalActive} className='header__modal'> 
          <h2 className='header__modal__name'>
            Add new point
          </h2>

          <FormField
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