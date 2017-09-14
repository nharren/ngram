import './_app.scss';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from '../landing';
import Dashboard from '../dashboard';
import Settings from '../settings';
import Header from '../header';
import Footer from '../footer';
import Content from '../content';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='cfgram'>
            <Route path='*' component={Header} />
            <Content>
              <Route exact path='/welcome/:auth' component={Landing} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/settings' component={Settings} />
            </Content>
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;