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
  const [modalActive, setModalActive] = useState(false);
  console.log(isLoading);

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
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setModalActive(true)}>
          Add new point
        </Button>

        <CustomizedSwitches />

        {}

        <Modal active={modalActive} setActive={setModalActive} className='header__modal'> 
          <h2 className='header__modal__name'>
            Add new point
          </h2>
          <FormField
            modalActive={modalActive} 
            setActive={setModalActive}
            markers={markers} 
            setMarkers={setMarkers}
          />
        </Modal>

      </div>
    </header>
  )
}