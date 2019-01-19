import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "../../components/Carousel";
import Rating from "../../components/Rating";
import Loader from "../../components/Loader";

class index extends Component {
  constructor(props) {
    super(props);
    props.getVenue();
    props.getReviews();
  }

  render() {
    const {
      navigation: { goBack },
      reviews,
      venue,
      loading
    } = this.props;
    return (
      <ScrollView>
        {loading && <Loader />}
        <View
          style={{
            position: "absolute",
            top: StatusbarHeight,
            right: 20,
            zIndex: 100
          }}
        >
          <TouchableOpacity style={{}} onPress={() => goBack()}>
            <Icon name={`${iconType}-close`} size={36} color="#fff" />
          </TouchableOpacity>
        </View>
        {venue && reviews && (
          <Carousel
            data={venue.photos}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  width: WIDTH,
                  height: 240
                }}
                resizeMode="cover"
              />
            )}
            snapToInterval={WIDTH}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
        {venue && reviews && (
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: "rgba(0,0,0,0.87)",
                paddingHorizontal: 16,
                marginBottom: 5
              }}
              numberOfLines={1}
            >
              {venue.name}
            </Text>
            <View style={{ paddingVertical: 5, paddingHorizontal: 16 }}>
              <Rating rating={venue.rating} total={venue.review_count} />
            </View>
            <Text
              style={{
                paddingHorizontal: 16
              }}
            >
              {venue && venue.categories.map(item => item.title).join(", ")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingVertical: 8,
                alignItems: "center"
              }}
            >
              <Icon name="ios-pin" size={24} style={{ marginRight: 10 }} />
              <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.54)",
                    lineHeight: 20
                  }}
                  numberOfLines={2}
                >
                  {venue.location.display_address.join(" ")}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.link(venue.phone)}>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  alignItems: "center",
                  marginTop: 5
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
                  {venue.display_phone}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => LINK(venue.url)}>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  alignItems: "center",
                  marginTop: 5
                }}
              >
                <Icon name="ios-globe" size={24} style={{ marginRight: 10 }} />
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.54)"
                  }}
                  numberOfLines={1}
                >
                  <Text>Click here for more details</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(0,0,0,0.87)",
                  marginBottom: 5,
                  paddingVertical: 10
                }}
              >
                Reviews
              </Text>
              {reviews.reviews.map(review => (
                <View
                  key={review.time_created}
                  style={{ flexDirection: "row", paddingVertical: 10 }}
                >
                  <Image
                    source={{ uri: review.user.image_url }}
                    style={{
                      height: 40,
                      width: 40,
                      marginRight: 10
                    }}
                    borderRadius={20}
                  />
                  <View style={{ flex: 1 }}>
                    <Text>{review.user.name}</Text>
                    <Rating rating={review.rating} />
                    <Text>{`"${review.text}"`}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

index.propTypes = {};

export default index;
