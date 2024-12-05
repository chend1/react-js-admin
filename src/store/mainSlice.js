import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, getUserInfo } from '@/api'

// 登录
export const handleLogin = createAsyncThunk(
  'main/login',
  async (params, { rejectWithValue }) => {
    try{
      const res = await login(params)
      console.log(res);
      return res.data
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
    setToken(state) {
      console.log(state.token)

      return state.token
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setMenuList(state) {
      return state.menuList
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.token = action.payload
    })
  },
})

export const { setToken, setUserInfo, setMenuList } = mainSlice.actions

export default mainSlice.reducer
