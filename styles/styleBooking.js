import { StyleSheet } from "react-native";

const primaryColor = "#5C40CC";
const grayText = "#666";
const lightGray = "#eee";
const white = "#fff";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    marginTop:40,
  },

  formContainer: {
    marginTop: 10,        // ← push whole form down
    borderRadius: 15,
    padding: 20,
    marginBottom: 20, 
  },
  tripTypeButtons: {
    flexDirection: "row",
    backgroundColor: white,
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  tripTypeButtonActive: {
    backgroundColor: primaryColor,
  },
  tripTypeButtonText: {
    fontSize: 14,
    color: grayText,
    fontWeight: "bold",
  },
  tripTypeButtonTextActive: {
    color: white,
  },
  inputField: {
    backgroundColor: white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: lightGray,   // base border
  },
  inputLabel: {
    fontSize: 12,
    color: grayText,
    marginBottom: 3,
  },
  inputValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  swapButton: {
    position: "absolute",
    top: "40%",
    right: "50%",
    backgroundColor: primaryColor,
    borderRadius: 15,
    padding: 8,
    zIndex: 1,
    transform: [{ translateY: -12 }],
  },
  dateTimePassengerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  datePassengerField: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: lightGray,   // base border
    marginHorizontal: 5,
  },
  bookNowButton: {
    backgroundColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  bookNowButtonText: {
    color: white,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalDestinationItem: {
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: lightGray,
  },
  modalDestinationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  modalDestinationLocation: {
    fontSize: 14,
    color: grayText,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: primaryColor,
  },
  loadingText: {
    fontSize: 16,
    color: grayText,
    textAlign: "center",
    paddingVertical: 20,
  },modalSearchInput: {
  width: '100%',
  borderWidth: 1,
  borderColor: lightGray,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
},
});