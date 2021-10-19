import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { IconButton, Portal } from "react-native-paper";
import styles from "../styles/AppStyles";
const BottomSheet = ({
  bottomSheetHeight,
  show,
  onDismiss,
  enableBackdropDismiss,
  children,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const onGesture = (event) => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = (event) => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      onDismiss();
    } else {
      bottom.setValue(0);
    }
  };
  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [show]);
  if (!open) {
    return null;
  }
  return (
    <Portal>
      <Pressable
        onPress={enableBackdropDismiss ? onDismiss : undefined}
        // style={styles.backDrop}
      />
      <Animated.View
        style={[
          styles.root,
          {
            height: bottomSheetHeight,
            bottom: bottom,
            shadowOffset: {
              height: -3,
            },
          },
          styles.common,
        ]}
      >
        <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
          <View style={styles.header}>
            <View
              style={{
                width: 60,
                height: 3,
                borderRadius: 1.5,
                position: "absolute",
                top: 8,
                left: (deviceWidth - 60) / 2,
                zIndex: 10,
                backgroundColor: "#ccc",
              }}
            />
            <IconButton
              color="red"
              icon="close"
              style={styles.closeIcon}
              onPress={onDismiss}
            />
          </View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </Portal>
  );
};

export default BottomSheet;
