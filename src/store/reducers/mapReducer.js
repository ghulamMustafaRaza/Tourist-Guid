import { mapActions } from '../actions/mapActions'

initialState = {
    pins: [],
    routes: [],
    routesErr: null,
    err: null,
    loadingMap: false,
    routeLoading: false,
    userLocation: null,
    defination: null
}

export default (state = initialState, action) => {
    switch (action.type){
        case mapActions.SEARCH:
            return {...state, loadingMap: true}
            break;
        case mapActions.SEARCH_FULL_FILL:
            return {...state, loadingMap: false, pins: action.payload}
            break;
        case mapActions.SEARCH_FAIL:
            return {...state, loadingMap: false, err: action.payload}
            break;
        case mapActions.LOAD_ROUTE:
            return {...state, routeLoading: true}
            break;
        case mapActions.LOAD_ROUTE_FULLFILL:
            return {...state, routeLoading: false, routes: action.payload, defination: action.defination}
            break;
        case mapActions.LOAD_ROUTE_FAIL:
            return {...state, routeLoading: false, routesErr: action.payload}
            break;
        case mapActions.SET_USER_LOCATION:
            return {...state, userLocation: action.payload}
            break;
        default:
            return state
    }
}