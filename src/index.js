import { AppRegistry } from 'react-native'
import {
  StackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux'
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import ShowDetail from "./components/ShowDetail"

import Auth from "./containers/Auth"
import MapScr from "./containers/MapScr"


export default StackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  Map: { screen: MapScr },
  showDetail: { screen: ShowDetail },
});
