import './_logo.scss';
import React from 'react';
import LogoImage from  '../../assets/camera-icon.svg';

class Logo extends React.Component {
  render() {
    return (
      <div id='logo'>
        <LogoImage id='logo-image'></LogoImage>
        <h1 id='logo-text'>Ngram</h1>
      </div>
    );
  }
}

export default Logo;