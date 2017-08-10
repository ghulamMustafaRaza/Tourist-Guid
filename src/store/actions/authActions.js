export class authActions {
    static LOG_IN = "LOG_IN"
    static LOG_IN_FULLFIL = "LOG_IN_FULLFIL"
    
    static LOAD_USER = "LOAD_USER"

    static LOG_OUT = "LOG_OUT"
    static LOG_OUT_FULLFIL = "LOG_OUT_FULLFIL"

    static SIGN_UP = "SIGN_UP"
    static SIGN_UP_FULLFIL = "SIGN_UP_FULLFIL"

    static logIn = (payload) => ({
        type: authActions.LOG_IN,
        payload
    })

    static logInFullFil = (payload) => ({
        type: authActions.LOG_IN_FULLFIL,
        payload
    })


    static logOut = () => ({
        type: authActions.LOG_OUT
    })

    static logOutFullFil = () => ({
        type: authActions.LOG_OUT_FULLFIL
    })

    static signUp = (payload) => ({
        type: authActions.SIGN_UP,
        payload
    })

    static signUpFullFil = (payload) => ({
        type: authActions.SIGN_UP_FULLFIL,
        payload
    })

}