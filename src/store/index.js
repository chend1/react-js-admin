import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './mainSlice'

export default configureStore({
  reducer: {
    main: mainSlice
  }
})