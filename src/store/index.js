import { createStore, combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from "redux-observable"
import logger from "redux-logger"

import authReducer from "./reducers/authReducer"
import mapReducer from "./reducers/mapReducer"

import { authActions } from "./actions/authActions"

import authEpics from "./epics/authEpics"
import mapEpics from "./epics/mapEpics"

import { initializeApp } from 'firebase'

var config = {
  apiKey: "AIzaSyCv26Sd8K41xXVDSVyPr5SlIEw-rfOnKWc",
  authDomain: "tourist-guid.firebaseapp.com",
  databaseURL: "https://tourist-guid.firebaseio.com",
  projectId: "tourist-guid",
  storageBucket: "tourist-guid.appspot.com",
  messagingSenderId: "621920353338"
};
initializeApp(config);



const rootEpic = combineEpics(
    authEpics.logIn,
    authEpics.logOut,
    authEpics.signUp,
    authEpics.loadUser,
    mapEpics.search,
    mapEpics.loadRoute,
)

const epicMiddleware =  createEpicMiddleware(rootEpic)

var rootReducer = combineReducers({
    auth: authReducer,
    map: mapReducer,
})

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger)
)

store.dispatch({
    type: authActions.LOAD_USER
})


export default store