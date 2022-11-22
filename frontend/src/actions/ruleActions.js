import axios from 'axios'
import {
    RULE_ADD_REQUEST,
    RULE_ADD_SUCCESS,
    RULE_ADD_FAIL,
    RULE_DETAILS_REQUEST,
    RULE_DETAILS_SUCCESS,
    RULE_DETAILS_FAIL,
    RULE_UPDATE_REQUEST,
    RULE_UPDATE_SUCCESS,
    RULE_UPDATE_FAIL,
    RULE_LIST_REQUEST,
    RULE_LIST_SUCCESS,
    RULE_LIST_FAIL,

} from '../constants/ruleConstants'

import { logout } from './userActions'

export const addRule = (category, amount, tokenRate) => async (dispatch, getState) => {

    try {
        dispatch({
            type: RULE_ADD_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(
            '/api/rules',
            { category, amount, tokenRate },
            config
        )

        dispatch({
            type: RULE_ADD_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: RULE_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getRuleDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RULE_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/rules/${id}`, config)

        dispatch({
            type: RULE_DETAILS_SUCCESS,
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
            type: RULE_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateRule = (rule) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RULE_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/rules/${rule.id}`, rule, config)

        dispatch({
            type: RULE_UPDATE_SUCCESS,
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
            type: RULE_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const listRules = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: RULE_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/rules`, config)

        dispatch({
            type: RULE_LIST_SUCCESS,
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
            type: RULE_LIST_FAIL,
            payload: message,
        })
    }
}
