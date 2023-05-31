import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header header__main">
      <div className="header__group">
        <h1>Welcome to the My MAP</h1>
        <div className="header__buttons">
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add new point
          </Button>

          <ToggleSwitch />
        </div>
      </div>
    </header>
  )
}