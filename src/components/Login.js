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
import { NavigationActions } from "react-navigation"
import {authActions} from '../store/actions/authActions'

class Login extends React.Component{
    constructor(props) { 
        super(props)
        this.state = {
            firestTime: true
        }
    }
    focusNext = (to) => {
        this.refs[to].focus()
    }
    onLoginPress = () => {
        this.props.logIn({
            password: this.refs.password._lastNativeText,
            email: this.refs.email._lastNativeText
        })
    }

    resetNavigation = (targetRoute) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: targetRoute }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }
    componentDidMount = () => {
        this.navigation = (
            this.props.navigation
            ||
            {
                navigate: () => {}
            }
        )
        if(this.state.firestTime && this.props.user != null){
            this.resetNavigation("Map")
        }
        // console.log(this.props)
        this.setState({firestTime: false})
    }
    componentWillReceiveProps(nextProps){
        // console.log(this.props.user, nextProps.user)
        if( nextProps.user != null){
            this.resetNavigation("Map")
        }
        // const navigate = this.props.navigation.navigate;
        // this.props = next;
        // console.log(this.props, this.nextProps)
    }
    static navigationOptions = {
        title: 'Login',
    };
    render() {
        this.navigation = (
            this.props.navigation
            ||
            {
                navigate: () => {}
            }
        )
        console.log(this.navigate)
        return(
            this.props.loading?
                <ActivityIndicator size={50}/>
            :
                <View style={styles.container} >
                    <Text 
                        style={{fontSize: 27}}>
                        Login To Your Account
                    </Text>
                    <TextInput ref="email"
                        onSubmitEditing={() => {
                            this.focusNext('password')
                        }} 
                        keyboardType="email-address" 
                        placeholder='Enter Your Email'
                        returnKeyType="go"
                    />
                    <TextInput ref="password"
                        onSubmitEditing={this.onLoginPress}
                        secureTextEntry={true}
                        placeholder='Enter Your Password'
                        returnKeyLabel="Log In"
                        returnKeyType="done"
                    />
                    <View style={{margin:7}} />
                    <Button 
                            onPress={this.onLoginPress}
                            title="Log In"
                        />
                    <Button
                        onPress={() => {
                            this.navigation.navigate('SignUp')
                        }}
                        color="#333"
                        title="Create A Account"
                    />
                </View>
        )
    }
} 

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    padding: 20
  }
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
    logIn: (payload) => {dispatch(authActions.logIn(payload))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 