import './_avatar.scss';
import React from 'react'

export default (props) => (
  <div className='avatar'>
    <img src={props.profile.avatar} /> 
  </div>
)
