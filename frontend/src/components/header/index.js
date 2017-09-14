import './_header.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo';
import Menu from '../menu';
import MenuItem from '../menu-item';
import Avatar from '../avatar';
import * as util from '../../lib/utilities.js';
import {tokenSet, logout} from '../../actions/token-actions.js';
import {profileFetchRequest} from '../../actions/profile-actions.js';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor(props){
    super(props)
    this.validateRoute = this.validateRoute.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount(){
    this.validateRoute(this.props)
  }

  validateRoute(props){
    let {match, history} = props
    let token = util.readCookie('X-Sluggram-Token')

    if(!token){
      return history.replace('/welcome/signup')
    }

    this.props.tokenSet(token)
    this.props.profileFetch()
    .catch(() => {
      console.log('PROFILE FETCH ERROR: user does not have a userProfile')
      if(!match.url.startsWith('/settings')){
        return history.replace('/settings')
      }
    })
  }

  handleLogout(){
    this.props.logout()
    this.props.history.push('/welcome/login')
  }

  render() {
    return (
      <header>
        <Logo />           
        {util.renderIf(!this.props.loggedIn,
          <Menu>
            <MenuItem><Link to='/welcome/signup'>sign up</Link></MenuItem>
            <MenuItem><Link to='/welcome/login'>log in</Link></MenuItem>
          </Menu>
        )}
        {util.renderIf(this.props.loggedIn,
          <Menu>
            <MenuItem><Link to='/dashboard'>dashboard</Link></MenuItem>
            <MenuItem><Link to='/settings'>settings</Link></MenuItem>
          </Menu>
        )}
      {util.renderIf(this.props.profile,
        <Avatar profile={this.props.profile} />
      )}
      {util.renderIf(this.props.loggedIn,
        <button id='logout-button' onClick={this.handleLogout}>logout</button>
      )}
      </header>
    );
  }
}

let mapStateToProps = (state) => ({
  loggedIn: !!state.token,
  profile: state.profile
});

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
  logout: () => dispatch(logout()),
  profileFetch: () => dispatch(profileFetchRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);