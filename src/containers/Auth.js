import React from "react";
import { connect } from "react-redux"

class Auth extends React.Component{
    componentDidMount = () => {
        const navigate = this.props.navigation.navigate;
        if(this.props.user != null){
            navigate('Map')
        }else{
            navigate('Login')
        }
    }
    static navigationOption = {
        title: "Home"
    }
    render() {
        return <Text>Home</Text>
    }
} 

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Auth) 
