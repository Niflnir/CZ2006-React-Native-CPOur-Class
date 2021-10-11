import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OTPScreen() {
  //   const lengthInput = 6;
  //   const defaultCountdown = 5;
  //   let clockCall = null;
  //   let textInput = useRef(null);
  //   const [internalVal, setInternalVal] = useState("");
  //   const [countdown, setCountdown] = useState(defaultCountdown);
  //   const [enableResend, setEnableResend] = useState(false);
  //   const onChangeText = (val) => {
  //     setInternalVal(val);
  //   };
  //   useEffect(() => {
  //     clockCall = setInternalVal(() => {
  //       decrementClock();
  //     }, 1000);
  //     return () => {
  //       clearInterval(clockCall);
  //     };
  //   }, []);
  //   const decrementClock = () => {
  //     if (countdown == 0) {
  //       setEnableResend = true;
  //       setCountdown(0);
  //       clearInterval(clockCall);
  //     } else {
  //       setCountdown(countdown - 1);
  //     }
  //   };
  //   useEffect(() => {
  //     textInput.focus();
  //   }, []);
  //   const onResendOTP = () => {
  //     if (enableResend) {
  //       setCountdown(defaultCountdown);
  //       setEnableResend(false);
  //       clearInterval(clockCall);
  //       clockCall = setInterval(() => {
  //         decrementClock(0);
  //       }, 1000);
  //     }
  //   };
  //   const onChangeNumber = () => {
  //     setInternalVal("");
  //   };
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.otpText}>Input your OTP code sent via SMS</Text>
  //       <View>
  //         <TextInput
  //           ref={(input) => (textInput = input)}
  //           onChangeText={onChangeText}
  //           style={{ width: 0, height: 0 }}
  //           value={internalVal}
  //           maxLength={lengthInput}
  //           returnKeyType="done"
  //           keyboardType="numeric"
  //         />
  //         <View style={styles.containerInput}>
  //           {Array(lengthInput)
  //             .fill()
  //             .map((data, index) => (
  //               <View key={index} styles={styles.cellView}>
  //                 <Text
  //                   style={styles.cellText}
  //                   onPress={() => textInput.focus()}
  //                 ></Text>
  //               </View>
  //             ))}
  //         </View>
  //       </View>
  //       <View style={styles.bottomView}>
  //         <TouchableOpacity onPress={onChangeNumber}>
  //           <View style={styles.btnChangeNumber}>
  //             <Text style={styles.textChange}>Change number</Text>
  //           </View>
  //         </TouchableOpacity>
  //         <TouchableOpacity onPress={onResendOTP}>
  //           <View style={styles.btnResend}>
  //             <Text
  //               style={[
  //                 styles.textResend,
  //                 {
  //                   color: enableResend ? "#234D87" : "gray",
  //                 },
  //               ]}
  //             >
  //               Resend OTP ({countdown})
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  otpText: {
    justifyContent: "center",
    alignItems: "center",
    top: "15%",
    left: "19.5%",
    fontSize: 16,
    fontWeight: "bold",
  },

  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  cellView: {
    paddingVertical: "11",
    width: "40",
    margin: "5",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#fff",
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
  },

  bottomView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "center",
  },

  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textChange: {
    color: "#234DB7",
    alignItems: "center",
    right: "50%",
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  textResend: {
    alignItems: "center",
    right: "30%",
  },
});
