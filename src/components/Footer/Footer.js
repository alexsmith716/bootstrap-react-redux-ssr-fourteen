import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Footer = props => {

  const { styles } = props;

  return (

    <div className={styles.footer}>
      <div className="container h-100">
        <div className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.flexContainer}`}>
          <div>Copyright &copy; 2020 · Election App 2020</div>
          <div><span className={`fas fa-headphones fa-padding ${styles.colorGoldLocal}`}></span><span className={`font-norwester ${styles.colorGoldLocal}`}>Footer Headphones!</span></div>
        </div>
      </div>
    </div>
  );
};

// Footer.propTypes = {};

export default Footer;
