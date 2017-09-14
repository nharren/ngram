import {combineReducers} from 'redux';
import tokenReducer from './token-reducer.js';
import profileReducer from './profile-reducer.js';
import photosReducer from './photos-reducer.js';

export default combineReducers({
  token: tokenReducer,
  profile: profileReducer,
  photos: photosReducer
});