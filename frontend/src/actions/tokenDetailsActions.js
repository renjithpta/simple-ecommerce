import axios from 'axios'
import {  USER_TOKEN_TX_DETAILS_REQUEST,
  USER_TOKEN_TX_DETAILS_SUCCESS,
  USER_TOKEN_TX_DETAILS_FAIL
} from '../constants/userConstants'
import { logout } from './userActions'


export const getUserTokenTxDetails = () => async (dispatch, getState) => {

  try {

    dispatch({
      type: USER_TOKEN_TX_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

  const { data } = await axios.get(`/api/token/customer-tx-details`, config)

    dispatch({
      type: USER_TOKEN_TX_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_TOKEN_TX_DETAILS_FAIL,
      payload: message,
    })
  }
}
