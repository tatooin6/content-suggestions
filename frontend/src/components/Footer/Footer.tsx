import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()}  {" "}
      <a href="https://tato-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">
          Tato
      </a>
      . All rights reserved.</p>
    </footer>
  );
};

export default Footer;
