import {
  USER_TOKEN_TX_DETAILS_REQUEST,
  USER_TOKEN_TX_DETAILS_SUCCESS,
  USER_TOKEN_TX_DETAILS_FAIL,
} from '../constants/userConstants'

export const getUserTokenTxDetails = (state = {}, action) => {

  switch (action.type) {
    case USER_TOKEN_TX_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_TOKEN_TX_DETAILS_SUCCESS:
      return { loading: false, tokenTxDetails: action.payload }
    case USER_TOKEN_TX_DETAILS_FAIL:
      return { loading: false, error: action.payload }
  
    default:
      return state
  }

}
