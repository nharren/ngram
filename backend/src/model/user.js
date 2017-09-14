'use strict'

// DEPENDECIES
import * as bcrypt from 'bcrypt'
import {randomBytes} from 'crypto'
import * as jwt from 'jsonwebtoken'
import createError from 'http-errors'
import {promisify} from '../lib/util.js'
import Mongoose, {Schema} from 'mongoose'

// SCHEMA
const userSchema =  new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String},
  randomHash: {type: String,  unique: true, default: ''},
  profile: {type: Schema.Types.ObjectId},
})

// INSTANCE METHODS
userSchema.methods.passwordCompare = function(password){
  return bcrypt.compare(password, this.passwordHash)
  .then(success => {
    if (!success)
      throw createError(401, 'AUTH ERROR: wrong password')
    return this
  })
}

userSchema.methods.tokenCreate  = function(){
  this.randomHash = randomBytes(32).toString('base64')
  return this.save()
  .then(user => {
    return jwt.sign({randomHash: this.randomHash}, process.env.SECRET)
  })
  .then(token => {
    return token
  })
}

// MODEL
const User = Mongoose.model('user', userSchema)

// STATIC METHODS
User.create = function (user) {
  if(!user.password || !user.email || !user.username)
    return Promise.reject(
      createError(400, 'VALIDATION ERROR: missing username email or password '))

  let {password} = user
  user = Object.assign({}, user, {password: undefined})

  return bcrypt.hash(password, 1)
  .then(passwordHash => {
    let data = Object.assign({}, user, {passwordHash}) 
    return new User(data).save()
  })
}

User.handleOAuth = function(data) {
  if (!data || !data.email) {
    return promise.reject(createError(400, 'VALIDATION ERROR - missing login information'));
  }

  return User.findOne({ email: data.email })
  .then(user => {
    if (!user) {
      throw new Error('not found - create a user');
    }

    return user;
  })
  .catch(() => {
    return new User({
      username: data.given_name,
      email: data.email
    }).save();
  });
}

// INTERFACE
export default User
