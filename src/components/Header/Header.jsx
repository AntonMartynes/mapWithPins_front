import React, { useContext, useState } from 'react';
import { Modal } from '../Modal/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Header.scss';
import { FormField } from '../Form/FormField';
import { ThemeContext } from '../../App';
import { CustomizedSwitches } from '../ToggleSwitch/Switch';

export const Header = ({markers, setMarkers}) => {
  const [modalActive, setModalActive] = useState(false);

  const globalTheme = useContext(ThemeContext);
  const mode = globalTheme.theme === 'light' ? 'light' : 'dark';

  return (
    <header className="header header__main" id={mode}> 
      <h1>Welcome to the My MAP</h1>
      <div className="header__buttons">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setModalActive(true)}>
          Add new point
        </Button>

        <CustomizedSwitches />

        <Modal active={modalActive} setActive={setModalActive} className='header__modal'> 
          <h2 className='header__modal__name'>
            Add new point
          </h2>
          <FormField 
            setActive={setModalActive}
            markers={markers} 
            setMarkers={setMarkers}
          />
        </Modal>

      </div>
    </header>
  )
}