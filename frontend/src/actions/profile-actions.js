import superagent from 'superagent'

// sync action creators
export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile,
})

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile,
})

// async action creators
export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let {token} = getState()
  return superagent.post(`${__API_URL__}/profiles`)
  .set('Authorization', `Bearer ${token}`)
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    dispatch(profileCreate(res.body))
    return res
  })
}

export const profileUpdateRequest = (profile) => (dispatch, getState) => {
  let {token} = getState()
  return superagent.put(`${__API_URL__}/profiles/${profile._id}`)
  .set('Authorization', `Bearer ${token}`)
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    dispatch(profileCreate(res.body))
    return res
  })
}

export const profileFetchRequest = () => (dispatch, getState) => {
  let {token} = getState()
  return superagent.get(`${__API_URL__}/profiles/me`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    console.log(res);
    dispatch(profileCreate(res.body))
    return res
  })
}
