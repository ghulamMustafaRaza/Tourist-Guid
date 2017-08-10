import * as firebase from 'firebase'
import { Observable } from "rxjs"
import { AsyncStorage } from 'react-native'
import store from "../"
// import 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { authActions } from "../actions/authActions"

export default class authEpics {
    constructor(){}

    static setUser = (data) => {
        return AsyncStorage.setItem('user', JSON.stringify(data), () => {
            return AsyncStorage.mergeItem('user', JSON.stringify(data), () => {
                return AsyncStorage.getItem('user', (err, result) => {
                    return result
                    // => {'name':'Chris','age':31,'traits':{'shoe_size':10,'hair':'brown','eyes':'blue'}}
                });
            });
        });
    }

    static clearUser = () => {
        AsyncStorage.clear()
    }




    static logIn = (actions$) => (
        actions$.ofType(authActions.LOG_IN)
            .switchMap(({payload}) => {
                return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    var currentUser = firebase.auth().currentUser;
                    return authActions.logInFullFil(currentUser)
                    this.setUser(currentUser)
                }).catch(err => {
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

    static logOut = (actions$) => (
        actions$.ofType(authActions.LOG_OUT)
            .switchMap(({payload}) => {
                return firebase.auth().signOut()
                .then(() => {
                    this.clearUser()
                    return authActions.logOutFullFil()
                }).catch(err => {
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
                    this.setUser(currentUser)
                    return authActions.signUpFullFil(currentUser)
                }).catch(err => {
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
