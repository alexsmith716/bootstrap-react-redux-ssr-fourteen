import React from 'react';

interface FooterProps {
  footer: string;
  flexContainer: string;
  colorGoldLocal: string;
  complexProp:{
    [categories:string]:{
      size:string;
      color?:string;
    }
  };
}

const Footer = ({ footer,flexContainer,colorGoldLocal }: FooterProps) => (

  <div className={footer}>
    <div className="container h-100">
      <div className={`h-100 d-flex flex-column justify-content-center align-items-center ${flexContainer}`}>
        <div>Copyright &copy; {new Date().getFullYear()} · Election App {new Date().getFullYear()}</div>
        <div><span className={`fas fa-headphones fa-padding ${colorGoldLocal}`}></span><span className={`font-norwester ${colorGoldLocal}`}>Footer Headphones!</span></div>
      </div>
    </div>
  </div>
);

export default Footer;
