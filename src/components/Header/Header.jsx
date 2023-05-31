import React, { useState } from 'react';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { Modal } from '../Modal/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Header.scss';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../Form/FormField';

export const Header = () => {
  const [modalActive, setModalActive] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  return (
    <header className="header header__main"> 
      <h1>Welcome to the My MAP</h1>
      <div className="header__buttons">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setModalActive(true)}>
          Add new point
        </Button>

        <ToggleSwitch />
        <Modal active={modalActive} setActive={setModalActive} className='header__modal'> 
          <h2 className='header__modal__name'>
            Add new point
          </h2>
          <FormField />
        </Modal>

      </div>
    </header>
  )
}