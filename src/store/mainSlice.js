import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    userInfo: {},
    token: '',
    menuList: []
  },
  reducers: {
    setToken(state) {
      console.log(state.token);
      
      return state.token
    },
    setUserInfo(state, action) {
      return state = {
        ...state,
        userInfo: action.payload
      }
    },
    setMenuList(state) {
      return state.menuList
    }
  }
})

export const { setToken, setUserInfo, setMenuList } = mainSlice.actions

export default mainSlice.reducer