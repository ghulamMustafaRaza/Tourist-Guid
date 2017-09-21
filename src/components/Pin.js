import React from 'react'
import MapView from 'react-native-maps';
import { Image, View, Text } from 'react-native'
import Modal from 'react-native-modal'


class Pin extends React.Component{
    constructor(props) {
        super(props)
    }

    navigator = () => this.props.navigate('showDetail', this.props.el)

    render(){
        let {el, key} = this.props;
        return(
            <View>
                <MapView.Marker
                    onPress={this.navigator}
                    coordinate={{latitude: el.geometry.location.lat, longitude: el.geometry.location.lng}}
                    title={el.name}
                    image={el.icon}
                    description={el.formatted_address}
                >
                {/* <Image style={{width: 15, height: 15}} source={{uri: el.icon}} /> */}
                </MapView.Marker>
            </View>
        )
    }
}

const styles = {}

export default Pin