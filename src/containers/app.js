import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux"

import {authActions} from '../store/actions/authActions'
import Login from "../components/Login"
import SignUp from "../components/SignUp"

class App extends React.Component{
    constructor(props) { 
        super(props);
        console.log(props) 
    }

    render() {
        return(
            <View style={styles.container} >
                {JSON.stringify(this.props.loading)}
                {this.props.loading?
                    <ActivityIndicator/>
                :
                    <Login logIn={this.props.logIn} />
                }
            </View>
        )
    }
} 

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    padding: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.user
})


const mapDispatchToProps = (dispatch) => ({
    logIn: (payload) => {dispatch(authActions.logIn(payload))},
    logOut: (payload) => {dispatch(authActions.logOut())},
    signUp: (payload) => {
        let gm = authActions.signUp(payload);
        console.log(gm)
        dispatch(gm)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App) 