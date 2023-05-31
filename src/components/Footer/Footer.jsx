import { useContext } from 'react';
import './Footer.scss';
import { ThemeContext } from '../../App';

export const Footer = () => {
  const globalTheme = useContext(ThemeContext);
  const mode = globalTheme.theme === 'light' ? 'light' : 'dark';
  return (
    <footer className="footer" id={mode}>
      <a href="mailto:martynesharsiia.anton@gmail.com" className="footer__link mail" > </a>
      <a href="tel:+380958280482" className="footer__link phone"> </a>
      <a href="https://t.me/AntonMartynes" className="footer__link telegram" target="blank"> </a>
      <a href="https://github.com/AntonMartynes" className="footer__link git" target="blank"> </a>
      <a href="https://www.linkedin.com/in/anton-martynes-harsiia-a02327265/" className="footer__link linkedin" target="blank"> </a>
    </footer>
  )
}