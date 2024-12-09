import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, getUserInfo } from '@/api'
import { setStorage } from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import { asyncRoutes } from '@/router'
import { generateRoutes } from './permission'

// 登录
export const handleLogin = createAsyncThunk(
  'main/login',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await login(params)
      const { token } = res
      setStorage('token', token)
      dispatch(handleGetUserInfo())
      return token
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// 获取用户信息
export const handleGetUserInfo = createAsyncThunk(
  'main/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserInfo()
      const { menu, userInfo } = res
      const { menuList } = generateRoutes(asyncRoutes, menu, 'children', 'key')
      return { menuList, userInfo }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    userInfo: {},
    token: '',
    menuList: [],
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload.userInfo || {}
      state.menuList = action.payload.menuList || []
    },
    handleLogout(state) {
      state.token = ''
      state.userInfo = {}
      state.menuList = []
      setStorage('token', '')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.token = action.payload
    })
    builder.addCase(handleGetUserInfo.fulfilled, (state, action) => {
      const { menuList, userInfo } = action.payload
      state.menuList = menuList || []
      state.userInfo = userInfo || {}
      console.log('menuList', menuList);
    })
  },
})

export const { handleLogout } = mainSlice.actions

export default mainSlice.reducer
