import './_dashboard.scss';
import React from 'react'
import {connect} from 'react-redux'
import * as util from '../../lib/utilities.js'
import * as photoActions from '../../actions/photo-actions.js'

import PhotoForm from '../photo-form'
import PhotoItem from '../photo-item'

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.photosFetch()
    .catch(util.logError);
  }

  render(){
    return (
      <div className='dashboard'>
        <PhotoForm
          buttonText='post'
          onComplete={(photo) =>{
            return this.props.photoCreate(photo)
            .catch(console.error)
          }}
            />
        {this.props.photos.map(photo =>
          <PhotoItem key={photo._id} photo={photo} />
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  photos: state.photos,
})

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoActions.userPhotoCreateRequest(photo)),
  photosFetch: (photos) => dispatch(photoActions.userPhotosFetchRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer)
