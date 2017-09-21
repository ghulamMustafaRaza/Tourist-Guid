export class mapActions {

    static SEARCH = 'SEARCH';
    static SEARCH_FULL_FILL = 'SEARCH_FULL_FILL'; 
    static SEARCH_FAIL = 'SEARCH_FULL_FILL'; 

    static LOAD_ROUTE = 'LOAD_ROUTE'
    static LOAD_ROUTE_FULLFILL = 'LOAD_ROUTE_FULLFILL'
    static LOAD_ROUTE_FAIL = 'LOAD_ROUTE_FAIL'

    static SET_USER_LOCATION = 'SET_USER_LOCATION'

    static setUserLocation = (payload) => ({
        type: mapActions.SET_USER_LOCATION,
        payload
    })

    static loadRoute = (payload) => ({
        type: mapActions.LOAD_ROUTE,
        payload
    })

    static loadRouteFullFill = (payload, defination) => ({
        type: mapActions.LOAD_ROUTE_FULLFILL,
        payload,
        defination
    })

    static search = (payload) => ({
        type: mapActions.SEARCH,
        payload
    })

    static searchFullFill = (payload) => ({
        type: mapActions.SEARCH_FULL_FILL,
        payload
    })

}