import {
  Dimensions,
  PixelRatio,
  Platform,
  NativeModules,
  AsyncStorage,
  Linking
} from "react-native";

const { StatusBarManager } = NativeModules;

NativeModules.Device.getDeviceName((err, name) => {
  console.log(err, name);
});

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

const isIphoneX = NativeModules.DeviceInfo.isIPhoneX_deprecated;

const iosStatusBarHeight = isIphoneX ? 35 : 20;

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? iosStatusBarHeight : StatusBarManager.HEIGHT;

export const action = (type, response = "", payload = null, meta = null) => ({
  type: type + response,
  payload,
  meta
});

export const link = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error("An error occurred", err));
};

global.action = action;

global.StatusbarHeight = STATUSBAR_HEIGHT;

global.os = Platform.OS;

global.WIDTH = deviceWidth;

global.HEIGHT = deviceHeight;

global.LINK = link;

global.iconType = Platform.OS === "ios" ? "ios" : "md";

const wait = ms => new Promise(res => setTimeout(res, ms));

global.wait = wait;
