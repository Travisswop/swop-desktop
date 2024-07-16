import QRCode from "react-native-qrcode-svg";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Card from "../../component/Card";
import CustomButton from "../../component/CustomButton";
import FontSize from "../../constant/FontSize";
import Color from "../../constant/Color";
import CustomFont from "../../constant/CustomFont";
import Rp from "../../constant/Rp";
import CustomModal from "../../component/CustomModal";
import { QrCodeData, QrCodeJson } from "../../constant/StaticData/QrCodeData";
import SendImageUrl from "../../constant/SendImageUrl";
import {
  QrCode,
  QrCodeBase64,
  QrCodeUpdate,
} from "../../store/action/QrCodeAction";
import { useDispatch, useSelector } from "react-redux";
import ColorPicker from "react-native-wheel-color-picker";
import CustomIcon from "../../component/CustomIcon";
import Svg, {
  Path,
  G,
  Circle,
  Defs,
  Rect,
  ClipPath,
  Use,
  Polygon,
} from "react-native-svg";
import {
  QrCode1,
  QrCode2,
  QrCode3,
  QrCode4,
} from "../../component/QRcode/QRData";
import EditGradientButton from "../../component/EditGradientButton";
import { tempDataSetAction } from "../../store/action/TempDataContainerAction";
import { useFocusEffect } from "@react-navigation/native";
import imageType from "../../constant/imageType";
import HeaderButton from "../../component/HeaderButton";
const defaultQrLogo = require("../../assets/QrCodeUpdate/qr-logo.png");
const QRIconChangeScreen = (props) => {
  const [selectedQrStyle, setSelectedQrStyle] = useState("1A");

  console.log(props.params);
  const [qrDotColor, setQrDotColor] = useState("#B396FF");
  const [qrBgColor, setQrBgColor] = useState("#ffffff");
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const Colors = useSelector((state) => state.themeColor);
  const tempData = useSelector((state) => state.tempData);
  const { imageData, _id } = route.params;
  const [customImage, setCustomImage] = useState(false);
  const [customIconImagePath, setCustomIconImagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [colorSelection, setColorSelection] = useState("qr");
  const colorPickerRef = useRef(null);
  const backgroundPickerRef = useRef(null);
  const tempQrLogoImage = tempData.QrLogo;
  const { type, imagePath } = imageType(tempQrLogoImage ? tempQrLogoImage : "");

  const handledModal = () => {
    setModalVisible((prev) => !prev);
  };

  const localJSON = JSON.parse(
    JSON.stringify(QrCodeJson[selectedQrStyle ? selectedQrStyle : "1A"])
  );
  console.log("The profile URL is: ", route.params.profileUrl);

  //to hide bottom tab navigation
  useFocusEffect(() => {
    const parentNav = navigation.getParent();
    parentNav.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            pressHandler={() => {
              navigation.goBack();
            }}
            type="icon"
            iconName="left-arrow"
            iconSize={Rp(55)}
          />
        );
      },
    });
  });

  //HANDLE LOCAL IMAGE
  const pickFromGallery = async (imageUrl) => {
    handledModal();
    setLoading(true);
  };

  // select photo modal
  const [editPhotoModal, setEditPhotoModal] = useState(false);
  const handleModal = () => {
    setEditPhotoModal((prev) => !prev);
  };

  const cameraOpenActionHandler = async (imageUrl) => {
    handleModal();
    //setState({...state,pickedImageUri: imageUri})
    //console.log('imageUri',imageUri);
    await dispatch(tempDataSetAction({ QrLogo: imageUrl }));
  };

  const savePressHandler = async () => {
    // Take the updated JSON and send it to the API

    if (tempQrLogoImage) {
      const imagePath = await SendImageUrl(tempQrLogoImage);
      setImageUrl(imagePath);
      // Recieve the URL and update the corresponding image Field. Show on UI.
      console.log("IMAGE URL PATH IS : ", imagePath);
      // const localJSON = QrCodeJson[imageData];
      localJSON.image = imagePath;
    } else if (!tempQrLogoImage) {
      localJSON.image =
        "https://res.cloudinary.com/bayshore/image/upload/v1706786605/qr-logo_mwasoz.png";
    }
    setSaveLoading(true);
    const url = "/microsite/customQrCode";
    const method = "POST";
    // change background color
    localJSON.backgroundOptions = { color: qrBgColor };
    // change dot color
    localJSON.dotsOptions = { ...localJSON.dotsOptions, color: qrDotColor };
    localJSON.data = route.params.profileUrl;
    // corner dot color
    localJSON.cornersDotOptions = {
      ...localJSON.cornersDotOptions,
      color: qrDotColor,
    };
    localJSON.cornersSquareOptions = {
      ...localJSON.cornersSquareOptions,
      color: qrDotColor,
    };

    const payload = {
      micrositeId: _id,
      qrStyleData: localJSON,
    };
    await dispatch(QrCodeUpdate(url, method, payload));
    setSaveLoading(false);

    return navigation.navigate({
      name: "QRcodeScreen",
      params: {
        _id: _id,
      },
    });
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      // justifyContent: 'center',
    },
    elementContainer: {
      // flex: 1,
      alignItems: "center",
      marginTop: Rp(50),
      // justifyContent: 'center',
      // borderWidth: 1,
      // borderColor: 'white',
    },
    cardStyle: {
      width: Rp(500),
      height: Rp(500),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: Rp(30),
      padding: Rp(30),
      backgroundColor: qrBgColor,
      position: "relative",
    },
    imageStyle: {
      height: undefined,
      aspectRatio: 1,
      width: "100%",
      // height: Rp(540),
      // width: Rp(540),
      // borderWidth: 1,
      // borderColor: 'white',
    },
    editGradientButtonStyle: {
      borderRadius: Rp(75),
      height: Rp(100),
      width: Rp(100),
    },
  });
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.primary_bg }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.elementContainer}>
          <Card style={styles.cardStyle}>
            {/* <Image
            source={customImage ? { uri: customIconImagePath } : QrCodeData[imageData]}
            style={styles.imageStyle}
          /> */}
            {/* <CustomIcon name="wallet" size={Rp(500)} color={qrDotColor} /> */}
            {/* <QRCode
              size={Rp(400)}
              color={qrDotColor}
              ecl="M"
              backgroundColor={'transparent'}
              value="http://awesome.link.qr"
            /> */}

            {/* <Image source={activeWalletAvatar} style={styles.avatar} /> */}
            <TouchableOpacity
              onPress={handleModal}
              activeOpacity={0.9}
              style={{
                zIndex: 10,
                position: "absolute",
                right: -Rp(30),
                bottom: -Rp(20),
              }}
            >
              <EditGradientButton
                name={"edit"} // use for icons
                // imageIconPath={activeWalletAvatar} // for image icon
                iconSize={Rp(50)}
                iconColor={Colors.primary_bg}
                borderColor={Colors.base_50}
                // backgroundColor={['#A75AD6', '#694FDC']}
                backgroundColor={[Colors.primaryContent, Colors.primaryContent]}
                editGradientButtonStyle={{
                  ...styles.editGradientButtonStyle,
                  // ...props.editGradientButtonStyle,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: Rp(500),
                width: Rp(500),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={type ? { uri: imagePath } : defaultQrLogo}
                style={{
                  height: Rp(100),
                  width: Rp(100),
                  resizeMode: "contain",
                }}
              />
            </View>

            {selectedQrStyle === "1A" ? (
              <QrCode1 width={Rp(400)} height={Rp(400)} color={qrDotColor} />
            ) : selectedQrStyle === "2A" ? (
              <QrCode2 width={Rp(400)} height={Rp(400)} color={qrDotColor} />
            ) : selectedQrStyle === "3A" ? (
              <QrCode3 width={Rp(400)} height={Rp(400)} color={qrDotColor} />
            ) : selectedQrStyle === "4A" ? (
              <QrCode4 width={Rp(400)} height={Rp(400)} color={qrDotColor} />
            ) : null}
          </Card>

          <View
            style={{
              marginBottom: Rp(50),
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedQrStyle("1A")}
              style={{
                backgroundColor:
                  selectedQrStyle === "1A"
                    ? Colors.mode === "dark"
                      ? "white"
                      : "black"
                    : "transparent",
                height: Rp(160),
                width: Rp(160),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: Rp(20),
              }}
            >
              <View
                style={{
                  overflow: "hidden",
                  height: Rp(140),
                  width: Rp(140),
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <QrCode1
                  height={Rp(300)}
                  width={Rp(300)}
                  color={
                    selectedQrStyle === "1A"
                      ? Colors.mode === "dark"
                        ? "black"
                        : "white"
                      : Colors.mode === "dark"
                      ? "white"
                      : "black"
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedQrStyle("2A")}
              style={{
                backgroundColor:
                  selectedQrStyle === "2A"
                    ? Colors.mode === "dark"
                      ? "white"
                      : "black"
                    : "transparent",
                height: Rp(160),
                width: Rp(160),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: Rp(20),
                marginLeft: Rp(25),
              }}
            >
              <View
                style={{
                  overflow: "hidden",
                  height: Rp(140),
                  width: Rp(140),
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <QrCode2
                  height={Rp(300)}
                  width={Rp(300)}
                  color={
                    selectedQrStyle === "2A"
                      ? Colors.mode === "dark"
                        ? "black"
                        : "white"
                      : Colors.mode === "dark"
                      ? "white"
                      : "black"
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedQrStyle("3A")}
              style={{
                backgroundColor:
                  selectedQrStyle === "3A"
                    ? Colors.mode === "dark"
                      ? "white"
                      : "black"
                    : "transparent",
                height: Rp(160),
                width: Rp(160),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: Rp(20),
                // borderColor: selectedQrStyle === 4 ? Colors.primaryContent : 'transparent',
                // borderWidth: Rp(3),
                marginLeft: Rp(25),
              }}
            >
              <View
                style={{
                  overflow: "hidden",
                  height: Rp(140),
                  width: Rp(140),
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <QrCode3
                  height={Rp(300)}
                  width={Rp(300)}
                  color={
                    selectedQrStyle === "3A"
                      ? Colors.mode === "dark"
                        ? "black"
                        : "white"
                      : Colors.mode === "dark"
                      ? "white"
                      : "black"
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedQrStyle("4A")}
              style={{
                backgroundColor:
                  selectedQrStyle === "4A"
                    ? Colors.mode === "dark"
                      ? "white"
                      : "black"
                    : "transparent",
                height: Rp(160),
                width: Rp(160),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: Rp(20),
                // borderColor: selectedQrStyle === 4 ? Colors.primaryContent : 'transparent',
                // borderWidth: Rp(3),
                marginLeft: Rp(25),
              }}
            >
              <View
                style={{
                  overflow: "hidden",
                  height: Rp(140),
                  width: Rp(140),
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <QrCode4
                  height={Rp(300)}
                  width={Rp(300)}
                  color={
                    selectedQrStyle === "4A"
                      ? Colors.mode === "dark"
                        ? "black"
                        : "white"
                      : Colors.mode === "dark"
                      ? "white"
                      : "black"
                  }
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <CustomButton
                btnName="QR Color"
                onPressHandler={() => {
                  setColorSelection("qr");
                }}
                buttonStyle={{
                  backgroundColor:
                    colorSelection === "qr" ? Colors.btn_black : "transparent",
                  borderWidth: Rp(3),
                  borderColor:
                    colorSelection === "qr" ? "transparent" : Colors.btn_black,
                  marginBottom: Rp(25),
                  width: Rp(385),
                  marginRight: Rp(5),
                  borderRadius: Rp(25),
                }}
                buttonText={{
                  // color: colorSelection === 'fill' ? Colors.btn_text_black : 'black',
                  color:
                    colorSelection === "qr"
                      ? Colors.btn_text_black
                      : Colors.primaryContent,
                }}
                showActivity={loading}
                isIconAvailable={false}
              />
              <CustomButton
                btnName="Background Color"
                onPressHandler={() => {
                  setColorSelection("fill");
                }}
                buttonStyle={{
                  backgroundColor:
                    colorSelection === "fill"
                      ? Colors.btn_black
                      : "transparent",
                  borderWidth: Rp(3),
                  borderColor:
                    colorSelection === "fill"
                      ? "transparent"
                      : Colors.btn_black,
                  marginBottom: Rp(25),
                  width: Rp(385),
                  marginLeft: Rp(30),
                  borderRadius: Rp(25),
                }}
                buttonText={{
                  color:
                    colorSelection === "fill"
                      ? Colors.btn_text_black
                      : Colors.primaryContent,
                }}
                showActivity={false}
                isIconAvailable={false}
              />
            </View>
          </View>
        </View>

        {colorSelection === "qr" ? (
          <View style={{ paddingHorizontal: Rp(100), height: Rp(600) }}>
            <ColorPicker
              ref={colorPickerRef}
              row={false}
              color={qrDotColor}
              // onColorChange={(color) => {
              //   setQrDotColor(color);
              // }}
              onColorChangeComplete={(color) => {
                setQrDotColor(color);
              }}
              thumbSize={Rp(100)}
              sliderSize={Rp(70)}
              noSnap={true}
              swatches={true}
              wheelLodingIndicator={<ActivityIndicator size={40} />}
              sliderLodingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
              useNativeLayout={false}
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: Rp(100), height: Rp(600) }}>
            <ColorPicker
              ref={backgroundPickerRef}
              row={false}
              color={qrBgColor}
              // onColorChange={(color) => {
              //   setQrBgColor(color);
              // }}
              onColorChangeComplete={(color) => {
                setQrBgColor(color);
              }}
              thumbSize={Rp(100)}
              sliderSize={Rp(50)}
              noSnap={true}
              swatches={true}
              wheelLodingIndicator={<ActivityIndicator size={40} />}
              sliderLodingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
              useNativeLayout={false}
            />
          </View>
        )}

        <CustomButton
          btnName="Save"
          fullWidth
          onPressHandler={savePressHandler}
          buttonStyle={{
            backgroundColor: Colors.btn_black,
            marginBottom: Rp(50),
            marginTop: Rp(180),
            width: Rp(850),
            borderRadius: Rp(25),
            alignSelf: "center",
          }}
          buttonText={{ color: Colors.btn_text_black }}
          showActivity={saveLoading}
          isIconAvailable={false}
        />

        <CustomModal
          useIcon
          modalVisible={modalVisible}
          initialModalVisibleValue={handledModal}
          noAppGalleryRequired={true}
          onImageTake={pickFromGallery}
          // onImageTake={cameraOpenActionHandler}
          cameraAspectRatio={{ cWidth: 450, cHeight: 450 }}
          galleryAspectRatio={{ gWidth: 450, gHeight: 450 }}
        />
      </View>
      <CustomModal
        modalVisible={editPhotoModal}
        initialModalVisibleValue={handleModal}
        // onPressAppGallery={appGalleryActionHandler}
        noAppGalleryRequired
        onImageTake={cameraOpenActionHandler}
        // cameraAspectRatio = {{cWidth:16,cHeight:16}}
        // galleryAspectRatio={{gWidth: 16, gHeight: 16}}
        useIcon
        cameraAspectRatio={{ cWidth: 450, cHeight: 450 }}
        galleryAspectRatio={{ gWidth: 450, gHeight: 450 }}
        mainTextContainer={{ paddingLeft: Rp(40) }}
      />
    </ScrollView>
  );
};

export default QRIconChangeScreen;
