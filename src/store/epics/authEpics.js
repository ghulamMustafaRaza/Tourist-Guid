import * as firebase from 'firebase'
import { Observable } from "rxjs"

import store from "../"
// import 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { authActions } from "../actions/authActions"

export default class authEpics {
    constructor(){}
    static loadUser = (actions$) => (
        actions$.ofType(authActions.LOAD_USER)
            .switchMap(() => {
                let c = firebase.auth().onAuthStateChanged(() => {
                    store.dispatch({
                        type: "LOAD_USER_FULLFIL",
                        payload: firebase.auth().currentUser
                    })                   
                })
                return c
            }).subscribe((ob)=>{
                Observable.of()
            })
    )

    static logIn = (actions$) => (
        actions$.ofType(authActions.LOG_IN)
            .switchMap(({payload}) => {
                return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    var currentUser = firebase.auth().currentUser;
                    return authActions.logInFullFil(currentUser)
                }).catch(err => {
                    alert(err.message)                    
                    return ({
                        type: "LOG_IN_FAIL",
                        payload: {err}
                    })
                })
            }).subscribe((ob)=>{
                console.log(ob)
                store.dispatch(ob)
                Observable.of()
            })
    )

    static logOut = (actions$) => (
        actions$.ofType(authActions.LOG_OUT)
            .switchMap(({payload}) => {
                return firebase.auth().signOut()
                .then(() => {
                    return authActions.logOutFullFil()
                }).catch(err => {
                    alert(err.message)
                    return ({
                        type: "LOG_OUT_FAIL",
                        payload: {err}
                    })
                })
            }).subscribe((ob)=>{
                console.log(ob)
                store.dispatch(ob)
                Observable.of()
            })
    )

    static signUp = (actions$) => (
        actions$.ofType(authActions.SIGN_UP)
            .switchMap(({payload}) => {
                console.log(payload)
                return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                        displayName: payload.name
                    })
                    var currentUser = firebase.auth().currentUser;
                    return authActions.signUpFullFil(currentUser)
                }).catch(err => {
                    alert(err.message)                    
                    return ({
                        type: "SIGN_UP_FAIL",
                        payload: {err}
                    })
                })
            }).subscribe((ob)=>{
                console.log(ob)
                store.dispatch(ob)
                Observable.of()
            })
    )
}
