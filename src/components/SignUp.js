import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native';
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"
import {authActions} from '../store/actions/authActions'

class SignUp extends React.Component{
    constructor(props) { 
        super(props)
        this.state = {
            firestTime: true
        }
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
    focusNext = (to) => {
        this.refs[to].focus()
    }
    onLoginPress = () => {
        this.props.signUp({
            password: this.refs.password._lastNativeText,
            email: this.refs.email._lastNativeText,
            name: this.refs.name._lastNativeText,
        })
    }
    static navigationOptions = {
        title: 'SignUp',
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
                        Create A Free Account
                    </Text>
                    <TextInput ref="name"
                        onSubmitEditing={() => {
                            this.focusNext('email')
                        }} 
                        keyboardType="default" 
                        placeholder='Enter Your Name'
                        returnKeyType="go"
                    />
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
                        placeholder='Chose A Password'
                        returnKeyLabel="Sign Up"
                        returnKeyType="done"
                    />
                    <View style={{margin:7}} />
                    <Button 
                        onPress={this.onLoginPress}
                        title="Sign Up"
                    />
                    <Button
                        onPress={() => {
                            navigate('Login')
                        }}
                        color="#333"
                        title="AlReady A Account "
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp) 