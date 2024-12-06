import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, getUserInfo } from '@/api'
import { setStorage } from '@/utils/storage'
import { useNavigate } from 'react-router'
import { localRoutes, asyncRoutes } from '@/router'

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
      return res
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
    menuList: localRoutes,
    routerMenu: localRoutes,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setMenuList(state) {
      state.menuList = action.payload
      state.routerMenu = action.payload
    },
    handleLogout(state) {
      state.token = ''
      state.userInfo = {}
      state.menuList = []
      state.routerMenu = []
      setStorage('token', '')
      const navigate = useNavigate()
      navigate('/login')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.token = action.payload
      handleGetUserInfo()
    })
    builder.addCase(handleGetUserInfo.fulfilled, (state, action) => {
      console.log('获取用户信息成功', action.payload)
      state.userInfo = action.payload.userInfo
      state.menuList = asyncRoutes
      state.routerMenu = asyncRoutes
    })
  },
})

export const { handleLogout } = mainSlice.actions

export default mainSlice.reducer
