import React from "react";
import MapView from 'react-native-maps';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    DeviceEventEmitter,
    NativeModules,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux"
import { NavigationActions } from 'react-navigation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import Pin from '../components/Pin'
import { mapActions } from '../store/actions/mapActions'
import { authActions } from '../store/actions/authActions'
import store from "../store"
const Btn = ()  => (
    <Button title="Logout" onPress={() => {store.dispatch(authActions.logOut())}}/>
)

class Map extends React.Component{
    constructor(props) { 
        super(props);
        console.log(props)
        this.state = {
            loading: false,
            error: null,
            earth: false,
            position: 
            {
                latitude: 24.8584049,
                latitudeDelta: 0.006607147806899755,
                longitude: 67.007501,
                longitudeDelta: 0.0063600431189364
            },
            search: '',
            pins: []
        }
    }
    static navigationOptions = {
        title: 'Map',
        headerRight: <Btn/>
    };
    
    regionFrom = (lat, lon, accuracy) => {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta)
        };
    }

    componentDidMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO"
        }).then(function(success) {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
                this.setState({loading: true})
                navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({loading: false})                    
                    var position = this.regionFrom(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                    this.props.setUserLocation(position)
                    this.setState({position});
                }, error => {
                    console.log(error); 
                    this.setState({loading: false, error})
                }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var position = this.regionFrom(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
            this.setState({position});
            this.props.setUserLocation(position)
        });
    }
    componentWillUnmount() {
        alert('unmount')
        navigator.geolocation.clearWatch(this.watchID);
    }
    fetchRecomend = () => {
        let key = 'AIzaSyDD9VHVK_eVmAK8nwHWBCVVB-gbxA6RTdI'
        let query = this.state.search
        let location = `${this.state.position.latitude},${this.state.position.longitude}`
        let searchUri = `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=100&key=${key}&query=${query}&location=${location}`
        this.props.search({uri: searchUri})
    }
    onRegionChange = (position) => {
        this.setState({position})
        // this.fetchRecomend()
        // console.log('arggggggggggggggggggggg', position)
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
    render() {
        if (this.props.user != null){
        return(
            <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        userLocationAnnotationTitle={this.props.user.displayName + ' Your Loacation'}
                        maxZoomLevel={1}
                        loadingEnabled={true}
                        region={this.state.position}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: 24.8584049,
                            latitudeDelta: 0.006607147806899755,
                            longitude: 67.007501,
                            longitudeDelta: 0.0063600431189364
                        }}
                        onRegionChange={this.onRegionChange}
                    >
                        {this.props.pins.map((el, ind) => (
                            <View key={ind}>
                                <Pin el={el} index={ind} navigate={this.props.navigation.navigate}/>
                            </View>
                        ))
                    }
                    {/* {latitude: initial.latitude, longitude: initial.longitude}, // optional
                    ...this.state.coords,
                    {latitude: final.latitude, longitude: final.longitude}, // optional */}
                    {this.props.routes.length > 0 &&
                        <MapView.Polyline
                            color="blue"
                            coordinates={[
                                ...this.props.routes
                            ]}
                            strokeWidth={4}
                        />
                    }
                    </MapView>
                    {this.props.loading &&
                        <ActivityIndicator style={styles.spinner} size={50}/>
                    }
                    <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                        <TextInput style={{backgroundColor: "#fff"}} value={this.state.search} onChangeText={(val) => {
                            this.setState({search: val})
                        }} ref='search'/><Button disabled={this.state.search.length < 1} title="search" onPress={this.fetchRecomend}/>
                    </View>
            </View>
        )
        }
        else{
            this.resetNavigation('Login')
            return null
        }
    }
} 

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    // padding: 20
  },
  map: {
    //   marginTop: 10
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    // // padding: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  marker: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "rgba(0, 122, 255, 0.8)"
  },
  radius: {
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: "rgba(0, 122, 255, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(0, 122, 255, 0.3)",
      alignItems: "center",
      justifyContent: 'center'
  },
  spinner: {
    backgroundColor: "#ccc",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',      
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

const mapStateToProps = (state) => ({
    routes       : state.map.routes,
    pins: state.map.pins,
    user: state.auth.user,
    loading: state.map.loadingMap
})
const mapDispatchToProps = (dispatch) => ({
    search: (payload) => { dispatch(mapActions.search(payload)) },
    logOut: () => { dispatch(authActions.logOut()) },
    setUserLocation: (payload) => { dispatch(mapActions.setUserLocation(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Map) 