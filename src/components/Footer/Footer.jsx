import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <a href="mailto:martynesharsiia.anton@gmail.com" className="footer__link mail" > </a>
      <a href="tel:+380958280482" className="footer__link phone"> </a>
      <a href="https://t.me/AntonMartynes" className="footer__link telegram" target="blank"> </a>
      <a href="https://github.com/AntonMartynes" className="footer__link git" target="blank"> </a>
      <a href="https://www.linkedin.com/in/anton-martynes-harsiia-a02327265/" className="footer__link linkedin" target="blank"> </a>
    </footer>
  )
}