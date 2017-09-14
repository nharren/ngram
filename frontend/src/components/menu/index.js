import './_menu.scss';
import React from 'react';

class Menu extends React.Component {
  render() {
    return (
      <ul className="menu">
        {this.props.children}
      </ul>
    );
  }
}

export default Menu;