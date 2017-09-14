import './_content.scss';
import React from 'react';

class Content extends React.Component {
  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}

export default Content;