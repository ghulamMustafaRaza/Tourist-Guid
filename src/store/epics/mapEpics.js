import { Observable } from "rxjs"
import axios from 'axios';

import store from "../"
// import 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { mapActions } from "../actions/mapActions"

export default class mapEpics {
    constructor(){}

    static search = (actions$) => (
        actions$.ofType(mapActions.SEARCH)
            .switchMap(({payload}) => {                
                return axios.get(payload.uri).then(({data}) => {
                    console.log(data.results)
                    return mapActions.searchFullFill(data.results)
                    // {
                    //     type: mapActions.SEARCH_FULL_FILL,
                    //     payload: data.results
                    // }
                }).catch((err) => {
                    return{
                        type: mapActions.SEARCH_FAIL,
                        payload: err
                    }
                })

            }).subscribe((ob)=>{
                store.dispatch(ob)
                Observable.of(ob)
            })
    )
    static decode =  function(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
    static loadRoute = (actions$) => (
        actions$.ofType(mapActions.LOAD_ROUTE)
            .switchMap(({payload}) => {                
                return axios.get(payload.uri)
                .then(({data}) => {
                    console.log(data)
                    if (data.routes.length) {
                        return mapActions.loadRouteFullFill(mapEpics.decode(data.routes[0].overview_polyline.points), {duration: data.routes[0].legs[0].duration, distance: data.routes[0].legs[0].distance})
                    }
                    else{
                        return{
                            type: mapActions.LOAD_ROUTE_FAIL,
                            payload: {message: 'No Routes Found'}
                        }                        
                    }
                }).catch((err) => {
                    return{
                        type: mapActions.LOAD_ROUTE_FAIL,
                        payload: err
                    }
                })

            }).subscribe((ob)=>{
                if(ob.type === mapActions.LOAD_ROUTE_FAIL){
                    alert(ob.payload.message)
                }
                store.dispatch(ob)
                Observable.of(ob)
            })
    )

}
