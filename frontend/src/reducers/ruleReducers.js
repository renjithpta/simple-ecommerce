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


export const ruleAddReducer = (state = {}, action) => {
    switch (action.type) {
        case RULE_ADD_REQUEST:
            return { loading: true }
        case RULE_ADD_SUCCESS:
            return { loading: false, success: true, ruleDetails: action.payload }
        case RULE_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ruleDetailsReducer = (state = { rule: {} }, action) => {
    switch (action.type) {
        case RULE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case RULE_DETAILS_SUCCESS:
            return { loading: false, rule: action.payload }
        case RULE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ruleUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case RULE_UPDATE_REQUEST:
            return { loading: true }
        case RULE_UPDATE_SUCCESS:
            return { loading: false, success: true, ruleDetails: action.payload }
        case RULE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ruleListReducer = (state = { rules: [] }, action) => {

    switch (action.type) {

        case RULE_LIST_REQUEST:
            return { loading: true }
        case RULE_LIST_SUCCESS:
            return { loading: false, rules: action.payload }
        case RULE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

