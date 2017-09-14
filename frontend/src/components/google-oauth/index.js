import './_google-oauth.scss';
import React from 'react';
import superagent from 'superagent';
import OAuthImage from '../../assets/btn_google_dark_normal_ios.svg';


class GoogleOAuth extends React.Component {
  render() {
    let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let clientIDQuery = `client_id=${__GOOGLE_CLIENT_ID__}`
    let responseTypeQuery = 'response_type=code';
    let scopeQuery = 'scope=openid%20profile%20email';
    let promptQuery = 'prompt=consent';
    let redirectURIQuery = 'redirect_uri=http://localhost:3000/oauth/google/code';
    let formattedURI = `${AUTH_URL}?${clientIDQuery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`;

    return (
      <a className='google-oauth' href={formattedURI}>
        <OAuthImage />
        <p>Sign in with Google</p>
      </a>
    );
  }
}

export default GoogleOAuth;