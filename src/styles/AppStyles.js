import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444444",
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: "flex-start",
    flexDirection: "row-reverse",
  },
  btnSortSelect: {
    backgroundColor: "#444444",
  },
  txtSortSelect: {
    fontWeight: "bold",
    fontSize: 15,
  },
  txtSortDisabled: {
    color: "#444444",
  },
  containerFilters: {
    alignContent: "center",
  },
  containerFl: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  txtFilters: {
    color: "#444444",
  },
  txtFiltersDisabled: {
    color: "white",
  },
  chipFiltersContainer: {
    marginHorizontal: 5,
  },
  chipFilters: {
    borderColor: "#767676",
  },
  chipFiltersDisabled: {
    backgroundColor: "#444444",
  },
  btnFilters: {
    backgroundColor: "white",
  },
  txtSearchDefault: {
    width: "86%",
    backgroundColor: "#FFF",
    borderRadius: 40,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "#C7C7CD",
    fontSize: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderLeftColor: "#ccc",
    borderLeftWidth: 1,
    borderRightColor: "#ccc",
    borderRightWidth: 1,
  },

  txtSearch: {
    width: "86%",
    backgroundColor: "#FFF",
    borderRadius: 40,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#000000",
    fontSize: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderLeftColor: "#ccc",
    borderLeftWidth: 1,
    borderRightColor: "#ccc",
    borderRightWidth: 1,
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
    width: "86%",
    backgroundColor: "#FFF",
    borderRadius: 40,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 15,
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
    fontSize: 15,
  },
  containerListItems: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
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
    fontSize: 16,
  },
  containerCurrentLocation: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  containerFlatList: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginTop: 5,
  },

  containerFlatListItems: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  txtNoCarparks: {
    fontSize: 14,
    paddingTop: 15,
  },
  containerOTP: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    bottom: "10%",
  },
  txtInpOTP: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 5,
  },
  logo: {
    height: "65%",
    top: "-10%",
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtInpPhoneNumber: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    left: 5,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: "#F3F3F3",
    width: "85%",
    bottom: "10%",
    padding: 10,
  },
  btnContinue: {
    alignItems: "center",
    justifyContent: "center",
  },
  txtContinue: {
    color: "#4f8BFF",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    bottom: "5%",
  },
  txtDestinationTitle: {
    fontSize: 15,
    margin: 6,
    alignSelf: "center",
    color: "white",
  },
  txtDestination: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 9,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#000000",
    fontSize: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.7,
    borderTopColor: "#ccc",
    borderTopWidth: 0.7,
    borderLeftColor: "#ccc",
    borderLeftWidth: 0.7,
    borderRightColor: "#ccc",
    borderRightWidth: 0.7,
  },
  txtCpSummaryHeadings: {
    fontSize: 16,
    marginTop: 23,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  txtCpSummaryInfo: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  svContainer: {
    backgroundColor: "white",
    width: "100%",
    marginVertical: 10,
  },
  containerBtnCpSummary: {
    flexDirection: "row",
    padding: 15,
    paddingTop: 10,
  },
  btnCpSummary: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#444444",
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 5,
  },

  txtBtnCpSummary1: {
    color: "white",
    fontSize: 15,
    marginHorizontal: 10,
  },
  txtBtnCpSummary2: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginRight: 5,
  },
  containerResendOTP: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  txtResendOTP: {
    color: "#4f8BFF",
  },
  txtGrey: {
    color: "#767676",
  },
  txtRed: {
    color: "#D0342C",
  },
  txtBudgetingTitle: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
  },

  txtBudgetingWhiteHeading: {
    color: "white",
    fontSize: 33,
    letterSpacing: 3,
    paddingVertical: 40,
  },
  txtBudgetingGreyHeading: {
    color: "#767676",
    fontSize: 33,
    letterSpacing: 3,
    paddingVertical: 40,
  },
  containerBudgetingWhite: {
    backgroundColor: "white",
    alignItems: "center",
  },
  containerBudgetingGrey: {
    backgroundColor: "#444444",
    alignItems: "center",
  },
  // containerBudgeting: {
  //   height: "40%",
  //   alignContent: "stretch",
  //   backgroundColor: "white",
  // },
  txtInpBudgetingWhite: {
    width: "40%",
    fontWeight: "bold",
    paddingTop: 10,
    paddingHorizontal: 10,
    letterSpacing: 4,
    fontSize: 50,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 3,
  },
  txtInpBudgetingGrey: {
    fontWeight: "bold",
    width: "30%",
    paddingTop: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    letterSpacing: 4,
    fontSize: 50,
    color: "#444444",
    borderBottomColor: "#444444",
    borderBottomWidth: 3,
  },
  txtBudgetingDollar: {
    marginTop: 10,
    fontSize: 50,
    marginRight: 5,
    color: "white",
  },
  containerBudgetingDollar: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnBudgetingSwitch: {
    backgroundColor: "lightgrey",
    width: "30%",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    marginTop: -25,
    marginRight: 15,
    borderRadius: 30,
  },
  txtBudgetingSwitch: {
    fontSize: 17,
    letterSpacing: 2,
    color: "#444444",
  },
  txtBudgetingTime: {
    marginTop: 10,
    fontSize: 50,
    marginLeft: 15,
    color: "#444444",
  },
  btnBudgetingCalculateGrey: {
    backgroundColor: "#444444",
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  txtBudgetingCalculateWhite: {
    fontSize: 20,
    letterSpacing: 2,
    color: "white",
    fontWeight: "bold",
  },
  btnBudgetingCalculateWhite: {
    backgroundColor: "white",
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  txtBudgetingCalculateGrey: {
    fontSize: 20,
    letterSpacing: 2,
    color: "#444444",
    fontWeight: "bold",
  },
  containerBudgetingMainWhite: {
    height: "100%",
    backgroundColor: "white",
  },
  containerBudgetingMainGrey: {
    height: "100%",
    backgroundColor: "#444444",
  },
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    height: 44,
    backgroundColor: "#fff",
  },
  common: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 80,
    // backgroundColor: "rgba(0,0,0, 0.12)",
  },
  btnMapRouteDetails: {
    alignSelf: "center",
    width: "40%",
    backgroundColor: "#444444",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 740,
  },
  containerMapBtns: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  txtMapRouteDetails: {
    color: "white",
    fontSize: 15,
    letterSpacing: 1,
    textAlign: "center",
  },
  txtMapLocationHeadings: {
    fontSize: 20,
    marginTop: -5,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  txtMapHeadings: {
    marginTop: 5,
    fontSize: 16,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
  },
  txtMapInfo: {
    marginTop: 5,
    fontSize: 14,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
  },
  btnMapRoutes: {
    paddingVertical: 10,
  },
  txtFavHeading: {
    textAlign: "center",
    padding: 10,
    paddingBottom: 20,
    fontSize: 30,
    color: "white",
  },
  btnFavRemove: {
    // // position: absolute,
    // marginTop: 80,
    // marginLeft: -40,
  },
  txtFavRemove: {
    color: "#d0312d",
  },
  btnIndicateVehicleType: {
    backgroundColor: "#444444",
    width: "12%",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    bottom: 76,
    borderRadius: 30,
    marginBottom: 50,
    marginRight: 25,
  },
  btnIndicateVehicleType2: {
    backgroundColor: "white",
    width: "12%",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    bottom: 76,
    borderRadius: 30,
    marginBottom: 50,
    marginRight: 25,
  },
  txtVehicleType: {
    color: "white",
    fontWeight: "bold",
  },
  txtVehicleType2: {
    color: "#444444",
    fontWeight: "bold",
  },
});

export default styles;
