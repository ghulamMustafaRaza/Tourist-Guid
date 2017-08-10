import {authActions} from '../actions/authActions'

initialState = {
    user: null,
    loading: true
}

export default (state = initialState, action) => {
    switch (action.type){
        case authActions.SIGN_UP:
            return {...state, loading: true}
            break;
        case authActions.LOG_IN:
            return {...state, loading: true}
            break;
        case authActions.LOG_OUT: 
            return {...state, loading: true}
            break;
        case authActions.SIGN_UP_FULLFIL:
            return {...state, user: action.payload, loading: false}
            break;
        case authActions.LOG_IN_FULLFIL:
            return {...state, user: action.payload, loading: false}
            break;
        case authActions.LOG_OUT_FULLFIL: 
            return {...state, user:null, loading: false}
            break;
        case 'LOAD_USER_FULLFIL': 
            return {...state, user:action.payload, loading: false}
            break;
        default:
            return state
    }
}