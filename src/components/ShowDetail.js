import React from 'react'
import { Image, View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import { mapActions } from '../store/actions/mapActions'

class Pin extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            
        }
        console.log(props)
    }

    static navigationOptions = {
        title: 'Show Detail',
    };
    
    componentDidMount = () => {
        let el = this.props.navigation.state.params;        
        let key = 'AIzaSyDJRJLuYUzv-ESchNEX52lORZGX1ASZ_Cg';
        let disignation = `${el.geometry.location.lat},${el.geometry.location.lng}`;
        let origin = `${this.props.userLocation.latitude},${this.props.userLocation.longitude}`;

        let uri = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${disignation}&key=${key}`

        this.props.loadRoute({uri})

        console.log(uri)
    }

    render(){
        let el = this.props.navigation.state.params;
        const horizontalMargin = 20;
        const slideWidth = 180;
        
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 120;
        return(
            <ScrollView style={{paddingTop: 20}}>
                <Carousel
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                >
                    {el.photos && el.photos.map((ele, ind) => {
                        let uri = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&key=AIzaSyDD9VHVK_eVmAK8nwHWBCVVB-gbxA6RTdI&photoreference=${ele.photo_reference}`
                        return(
                                <Image key={ind} style={{width: itemWidth,height: itemHeight}} source={{uri}} />
                    )})}
                </Carousel>
                <Text style={styles.heading}>{el.name}</Text>
                <Text style={styles.subHeading}>{el.formatted_address}</Text>
                {el.opening_hours &&
                <Text style={styles.heading}>
                    Open Now: {el.opening_hours.open_now? 'Yes' : 'No'} 
                    {/* {JSON.stringify(el)} */}
                </Text>}
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{padding: 8}} >
                        Time: 
                    </Text>
                    {this.props.routeLoading ?
                        <ActivityIndicator/>
                    :this.props.defination !== null?
                        <Text style={{padding: 8}} >
                            {this.props.defination.duration.text}
                        </Text>
                    :
                        <Text style={{padding: 8}} >
                            Err
                        </Text>
                    }
                    <Text style={{padding: 8}} >
                        Distance: 
                    </Text>
                    {this.props.routeLoading ?
                        <ActivityIndicator/>
                    :this.props.defination !== null?
                        <Text style={{padding: 8}} >
                            {this.props.defination.distance.text}
                        </Text>
                    :
                        <Text style={{padding: 8}} >
                            Err
                        </Text>
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    subHeading: {
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    heading: {
        fontSize: 22,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 20,
        textAlign: 'center'
    }
}


const mapStateToProps = (state) => ({
    routes       : state.map.routes,
    routeLoading : state.map.routeLoading,
    userLocation : state.map.userLocation,
    defination   : state.map.defination
})

const mapDispatchToProps = (dispatch) => ({
    loadRoute: (payload) => (dispatch(mapActions.loadRoute(payload))) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Pin) 