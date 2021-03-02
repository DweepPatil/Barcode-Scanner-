import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Vibration,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import Clipboard from "expo-clipboard";
import { Button } from "react-native-elements";

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      ButtonState: "normal",
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      ButtonState: "clicked",
    });
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      ButtonState: "normal",
    });
    Vibration.vibrate();
    Alert.alert(
      "Barcode scanned!",
      "Data in barcode: " + data + " type: " + type
    );
  };

  copyToclipboard(text){
   Clipboard.setString(text)
  }

  render() {
    var hasCameraPermissions = this.state.hasCameraPermissions;
    var scannedData = this.state.scannedData;
    var ButtonState = this.state.ButtonState;

    if (hasCameraPermissions && ButtonState === "clicked") {
      return (
        <BarCodeScanner
          onBarCodeScanned={(type, data) =>
            this.handleBarCodeScanned(type, data)
          }
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (ButtonState === "normal") {
      return (
        <View style={styles.container}>
          {scannedData ? (
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                Number in Barcode: {scannedData}
              </Text>
              <Button
              title='Copy to clipboard'
              type='solid'
              raised={true}
              onPress={()=>this.copyToclipboard(scannedData)}
              containerStyle={styles.copyBtn}
              />
            </View>
          ) : null}
          <Image
            source={require("./assets/Barcode-scanner.jpg")}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => this.getCameraPermissions()}
            style={styles.scanButton}
          >
            <Text style={styles.scanBtnText}>Scan Barcode!</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "cornflowerblue",
    width: "100%",
  },
  scanButton: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "cyan",
    borderWidth: 2,
    borderColor: "black",
    width: 150,
    height: 50,
  },
  scanBtnText: {
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  infoView: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    padding: 20,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  copyBtn:{
    width:200,
    marginTop:20,

  }
});
