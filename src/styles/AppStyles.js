import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    padding: 30,
    alignItems: "center",
  },
  touchableOpacity: {
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  modalPickerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "white",
    borderRadius: 10,
  },

  modalOption: {
    alignItems: "flex-start",
  },

  modalText: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  txtSearchDefault: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 40,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "#C7C7CD",
    fontSize: 15,
  },

  txtSearch: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 40,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#000000",
    fontSize: 15,
  },

  viewSearchMode: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  svResults: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  touOpSearchMode: {
    padding: 5,
    width: "20%",
    borderColor: "#587F8E",
    borderWidth: 1.5,
    borderRadius: 40,
  },
  touOpSearchModePressed: {
    padding: 6.5,
    width: "20%",
    backgroundColor: "#305f72",
    borderRadius: 30,
  },
  txtSearchMode: {
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
    opacity: 1,
    fontSize: 15,
  },
  txtSearchModePressed: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    opacity: 1,
    fontSize: 15,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  txtinpSearchBorder: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 40,
    marginTop: 20,
    padding: 6,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderLeftColor: "#ccc",
    borderLeftWidth: 1,
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 15,
  },
  containerListItems: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  containerCurrentLocation: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  txtListItemsBuilding: {
    fontWeight: "bold",
    fontSize: 18,
  },
  txtListItemsAddress: {
    fontSize: 15,
  },
  containerCurrentLocation: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  containerFlatList: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginTop: 25,
  },

  containerFlatListItems: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  txtNoCarparks: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 30,
  },
  txtCPSummary: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default styles;
