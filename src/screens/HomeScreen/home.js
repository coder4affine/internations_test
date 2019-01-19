import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion
} from "react-native-maps";
import Carousel from "../../components/Carousel";
import Rating from "../../components/Rating";
import Loader from "../../components/Loader";

const ASPECT_RATIO = WIDTH / HEIGHT;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0042;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const contentWidth = WIDTH - 40;
const contentHeight = 250;

class AnimatedMarkers extends PureComponent {
  static navigationOptions = () => ({
    header: null
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState;
  }

  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      })
    };
    props.getSearch();
  }

  animate = coordinates => {
    const { coordinate } = this.state;
    const region = {
      ...coordinates,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.mapView.animateToRegion(region);
    if (Platform.OS === "android") {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(coordinates, 500);
      }
    } else {
      coordinate.timing(coordinates).start();
    }
  };

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems[0]) {
      this.animate(viewableItems[0].item.coordinates);
    }
  };

  renderFlatList = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("Modal", {
          id: item.id
        })
      }
    >
      <View
        style={{
          height: contentHeight,
          width: contentWidth,
          backgroundColor: "#fff",
          borderTopStartRadius: 10,
          borderTopEndRadius: 10
        }}
      >
        {/* Image Display */}
        <View
          style={{
            flexDirection: "row",
            height: 110,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            overflow: "hidden"
          }}
        >
          <Image
            source={{ uri: item.image_url }}
            style={{
              width: null,
              height: null,
              flex: 1,
              overflow: "hidden"
            }}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            resizeMode="cover"
          />
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
          {/* Title */}
          <Text
            style={{
              fontSize: 20,
              color: "rgba(0,0,0,0.87)",
              marginBottom: 5
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {/* Ratting */}
          <Rating rating={item.rating} total={item.review_count} />
          {/* Address Details */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5
            }}
          >
            <Icon name="ios-pin" size={24} style={{ marginRight: 10 }} />
            <Text
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.54)",
                lineHeight: 20,
                flex: 1
              }}
              numberOfLines={2}
            >
              {item.location.display_address.join(" ")}
            </Text>
          </View>
          {/* Phone Details */}
          <TouchableOpacity onPress={() => LINK(`tel:${item.phone}`)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5
              }}
            >
              <Icon name="ios-call" size={24} style={{ marginRight: 10 }} />
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.54)"
                }}
                numberOfLines={1}
              >
                {item.display_phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { search, loading } = this.props;

    return (
      <View style={styles.container}>
        {/* Show Loader when data is loading */}
        {loading && <Loader />}
        {/* Display Map */}
        <MapView
          ref={ref => (this.mapView = ref)}
          provider={this.props.provider}
          style={styles.map}
          region={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        {/* Display Carousel */}
        <View style={styles.buttonContainer}>
          {search && (
            <Carousel
              data={search.businesses}
              renderItem={this.renderFlatList}
              horizontalInset={WIDTH / 2 - contentWidth / 2}
              snapToInterval={contentWidth + 10}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              onViewableItemsChanged={this.onViewableItemsChanged}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </View>
    );
  }
}

AnimatedMarkers.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent"
  }
});

export default AnimatedMarkers;
