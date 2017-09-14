import './_landing.scss';
import React from 'react';
import {connect} from 'react-redux';
import {signupRequest, loginRequest} from '../../actions/token-actions.js';
import Login from '../login';

class Landing extends React.Component {
  render() {
    let {params} = this.props.match;
    let handleComplete = params.auth === 'login'
      ? this.props.login
      : this.props.signup;
    
    return (
      <div className='landing'>
        <Login
          auth={params.auth}
          onComplete={handleComplete} />
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) =>({
  signup: (user) => dispatch(signupRequest(user)),
  login: (user) => dispatch(loginRequest(user))
})

export default connect(null, mapDispatchToProps)(Landing);