import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Modal,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Linking,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import useResponsive from "../../customHooks/useResponsive";
import ChatHeader from "../../component/ChatHeader";
import { useSelector } from "react-redux";
import {
  renderInputToolbar,
  renderActions,
  renderSend,
} from "../../component/InputToolbar";
import {
  GiftedChat,
  Bubble,
  Composer,
  Actions,
  Time,
} from "react-native-gifted-chat";
import imageType from "../../constant/imageType";
import ReceiveAssetQR from "../../component/ModalBody/ReceiveAssetModal/ReceiveAssestQR/ReceiveAssetQR";
import { NewCustomIcon } from "../../component/CustomIcon";
import { playNotificationSound } from "../../constant/CommonFunctions";
import io from "socket.io-client";
const socket = io("http://64.23.134.54/");
import Sound from "../../assets/media/soundPlay.mp3";
import { avatarAssets } from "../appGalleryScreens/AvatarScreen";
import Rh from "../../constant/Rh";
import ImageCropPicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import SendImageUrl from "../../constant/SendImageUrl";
import { FullImageModal } from "../../component/Modal/FullImageModal";
//const wallet_addr2 = '0x16ebc062A049631074257a1d0c62E1Ed5BCFB1b3';

interface user {
  _id: number;
  name?: string;
  avatar?: string;
}
interface msg_OBJ {
  text: string;
  id: string;
}
interface IMessages {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: user;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}
const ChatScreen: React.FC = (props: any) => {
  const paramsData = {
    ens: props?.route?.params?.ens,
    wallet_addr2: props?.route?.params?.wallet_addr2,
  };

  const Colors = useSelector((state: any) => state.themeColor);
  const wallet_data = useSelector((state: any) => state.walletInfo.walletData);
  const activeWalletData = useSelector(
    (state: any) => state.userData?.activeWalletData
  );
  const senderWalletAddress = activeWalletData?.walletAddress;
  const senderPrivayeKey = activeWalletData?.privateKey;
  const { Rp } = useResponsive();
  const { navigation } = props;
  const { data, wallet_addr2, ens } = props.route.params;
  const [qrModal, setqrModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ImageModal, setImageModal] = useState({ modal: false, uri: "" });
  const connectToSocket = async () => {
    await socket.on("connect", () => {
      console.log("socket connected");
    });
    await socket.emit("register", senderWalletAddress);
    await socket.emit("requestOldMessages", {
      privateKey: senderPrivayeKey,
      conversationAddress: wallet_addr2,
    });
    socket.on("oldMessages", (messages: IMessages[]) => {
      console.log("xyzca", messages);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages.reverse())
      );
    });
    socket.on("receive private message", (message: IMessages) => {
      if (message.user._id === wallet_addr2) {
        playNotificationSound(Sound);
        const messageId = String(new Date().getTime());
        const newMsg = { ...message, _id: messageId };
        message._id = messageId;
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [newMsg])
        );
        try {
          const msgID = JSON.parse(message.text);
          if (msgID.id) {
            markMessageAsRead(msgID.id, senderWalletAddress);
          }
        } catch {
          console.log("no msg id");
        }
      }
    });
    console.log("end socket");
    return socket.connected;
  };
  function markMessageAsRead(messageId: string, senderWalletAddress: string) {
    socket.emit("message read", { messageId, senderWalletAddress }); // Emit event with both values
  }

  useEffect(() => {
    if (senderPrivayeKey && senderWalletAddress) {
      console.log("trying to connect socket");
      connectToSocket();
    }

    return () => {
      // socket.off('connect', () => {
      //   console.log('socket disconnected');
      // });
      socket.off("oldMessages");
      socket.off("receive private message");
      //socket.disconnect();
    };
  }, [senderPrivayeKey, senderWalletAddress]);
  useFocusEffect(() => {
    const parentNav = navigation.getParent();

    parentNav.getParent().setOptions({
      headerShown: false,
      tabBarStyle: {
        display: "none",
      },
    });
  });
  const handleChildAccountPress = () => {
    // Linking.openURL(data.profileUrl);
    const urlSplit = data.profileUrl.split("/");
    // console.log('initialUrl from publicMicrositeScreen: ', url);
    // console.log('urlSplit from publicMicrositeScreen: ', urlSplit);
    const redirectUrl = urlSplit[urlSplit?.length - 1];
    navigation.navigate({
      name: "ChatToPublicMicrositeScreen",
      params: {
        initial: true,
        params: undefined,
        path: data.profileUrl,
        screen: redirectUrl,
        state: undefined,
        isFromChat: true,
      },
    });
    //props.navigation.navigate({name:'AddAccountProfile',params:{childId: childId, direct:direct}})
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const profileImage = data.profilePic ? imageType(data.profilePic) : null;
  const [messages, setMessages] = useState<IMessages[]>([]);

  const renderBubble = (props: any) => {
    return (
      <View>
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: "rgba(0, 0, 0, 1)",
            },
            left: { color: "rgba(0, 0, 0, 1)" },
          }}
          wrapperStyle={{
            left: props.currentMessage.image
              ? { marginLeft: 10, borderRadius: Rp(25) }
              : {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  shadowColor: "black",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 10,
                  elevation: 4,
                  borderRadius: Rp(25),
                  padding: Rp(20),
                  marginLeft: 10,
                },
            right: props.currentMessage.image
              ? { marginRight: 10, borderRadius: Rp(25) }
              : {
                  backgroundColor:
                    Colors.mode == "light"
                      ? "rgba(0, 0, 0, 0.08)"
                      : "rgba(255, 255, 255, 0.5)",
                  borderRadius: 10,
                  borderTopRightRadius: 0,
                  padding: Rp(20),
                  marginRight: 10,
                },
          }}
        />
        <Time
          {...props}
          containerStyle={{
            left: {
              alignItems: "flex-start",
              //marginLeft: 10,
              marginTop: 10,
            },
            right: {
              alignItems: "flex-end",
              marginTop: 10,
            },
          }}
          timeTextStyle={{
            left: {
              color: "rgba(170, 170, 170, 1)", // Color for left (received) messages
            },
            right: {
              color: "rgba(170, 170, 170, 1)", // Color for right (sent) messages
            },
          }}
        />
      </View>
    );
  };
  const renderComposer = (props: any) => (
    <Composer
      {...props}
      textInputStyle={{
        color: "#000",
        backgroundColor: "transparent",
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
    />
  );
  const renderQrModal = () => {
    return (
      <Modal visible={qrModal} animationType="fade">
        <ReceiveAssetQR
          network={"ethereum"}
          walletAddress={senderWalletAddress}
          modalCloseHandler={() => {
            setqrModal(false);
          }}
          logo={require("../../assets/Images/swop_logo_gradient.png")}
          description={
            "Use this address for receiving tokens and NFTs on Ethereum, Polygon and other compatible networks. Username can be used to replace a public address for SWOP wallets only. Transactions may take a few minutes to complete."
          }
          swoppleId={activeWalletData?.user_name}
          hideButton
        />
      </Modal>
    );
  };
  const onLoadEarlier = () => {
    console.log(loading);
  };
  const renderMessageImage = (props: any) => {
    let height = 1,
      width = 1;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setImageModal({ modal: true, uri: props.currentMessage.image });
        }}
        style={{
          padding: 5,
          backgroundColor: Colors.primary_bg,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <Image
          source={{ uri: props.currentMessage.image }}
          style={{
            width: Rp(500),
            height: undefined,
            //borderRadius: 15,
            aspectRatio: height / width,
          }}
          onLoad={(data) => {
            height = data.nativeEvent.source.height;
            width = data.nativeEvent.source.width;
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };
  const onSend = useCallback((messages: IMessages[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    let msgBody: any = {
      content: messages[0].text,
      to: wallet_addr2,
      privateKey: senderPrivayeKey,
    };
    if (messages[0].image) {
      msgBody.image = messages[0].image;
    }
    socket.emit("send private message", msgBody);
    socket.emit("new message notice", wallet_addr2);
  }, []);
  const renderActions = (props: any) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        borderRadius: 22,
        //backgroundColor: '#B396FF',
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => <NewCustomIcon name={"camera"} color={"#000"} size={28} />}
      options={{
        "Choose From Library": () => {
          console.log("Choose From Library");
        },
        Cancel: () => {
          console.log("Cancel");
        },
      }}
      optionTintColor="#222B45"
      onPressActionButton={() => {
        GalleryImage();
      }}
    />
  );
  const GalleryImage = async () => {
    try {
      ImageCropPicker.openPicker({
        title: "Select Cover Photo",
        mediaType: "photo",
        skipBackup: true,
      })
        .then(async (image: any) => {
          if (image.path) {
            const remoteUrl = await SendImageUrl(image.path);
            const newMessage: any = {
              _id: messages.length + 1,
              createdAt: new Date(),
              user: {
                _id: senderWalletAddress,
              },
              image: remoteUrl,
              text: "",
            };
            onSend([newMessage]);
          } else {
            Alert.alert("Image Selection Error");
          }
        })
        .catch((err) => {
          console.log("gallery open error", err);
        });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary_bg,
        paddingBottom: Platform.OS == "android" ? 0 : 30,
      }}
    >
      {renderQrModal()}
      {
        <FullImageModal
          visible={ImageModal.modal}
          setVisible={() => {
            setImageModal({ modal: false, uri: "" });
          }}
          image={ImageModal.uri}
        />
      }
      <ChatHeader
        bgColor={Colors.card}
        profileImage={
          data.profilePic
            ? imageType(data.profilePic)
            : { type: false, imagePath: null }
        }
        backPress={() => {
          props.navigation.goBack();
        }}
        onProfileImagePress={() => {
          handleChildAccountPress();
        }}
        rightIconPress={() => {
          navigation.navigate("WalletPortfolioStackNav", {
            screen: "SendAssetSelectScreen",
            params: paramsData,
          });
        }}
        rightIcon1Press={() => {
          setqrModal(true);
        }}
        textColor={Colors.primaryContent}
        name={data.name ? data.name : ""}
        id={ens}
      />
      <GiftedChat
        renderLoadEarlier={() => {
          return null;
        }}
        renderAvatar={() => {}}
        // renderAvatar={() => {
        //   return (
        //     <Image
        //       style={{ height: Rp(60), width: Rp(60), borderRadius: Rp(30) }}
        //       source={
        //         profileImage?.type
        //           ? { uri: profileImage.imagePath }
        //           : avatarAssets[profileImage.imagePath]
        //       }
        //     />
        //   );
        // }}
        messagesContainerStyle={{ paddingBottom: Rp(30) }}
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: senderWalletAddress,
        }}
        renderBubble={(props) => {
          if (props.currentMessage?.text) {
            try {
              const text = props.currentMessage?.text;
              const parsedJson = JSON.parse(text);
              if (parsedJson.text) {
                props = {
                  ...props,
                  currentMessage: {
                    ...props.currentMessage,
                    text: parsedJson.text,
                  },
                };
              }
            } catch {
              console.log("plain text");
            }
          }

          return renderBubble(props);
        }}
        renderInputToolbar={renderInputToolbar({ mode: Colors.mode })}
        renderActions={renderActions}
        renderSend={renderSend}
        renderComposer={renderComposer}
        renderMessageImage={renderMessageImage}
        renderTime={() => {}}
        infiniteScroll
        alignTop={true}
        showAvatarForEveryMessage
        onLoadEarlier={onLoadEarlier}
        loadEarlier={true}
        listViewProps={{
          contentInset: { top: 30, bottom: 60 }, // Adjust these values as needed
          contentOffset: { y: 30 }, // Adjust this value as needed
        }}
      />
    </View>
  );
};

export default ChatScreen;
