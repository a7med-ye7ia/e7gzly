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
    paddingTop: 40,
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
  // plane styles :

  stepsContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },

  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 5,
  },

  stepNumber: {
    flex: 1,
    textAlign: 'center',
    color: '#999',
    fontSize: 20,
  },

  stepNumberActive: {
    flex: 1,
    textAlign: 'center',
    color: '#5D50C6',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: -10,
  },

  stepLabel: {
    flex: 1,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },

  stepLabelActive: {
    flex: 1,
    textAlign: 'center',
    color: '#5D50C6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepInactive: { color: '#999' },
  stepActive: { color: '#5D50C6', fontWeight: 'bold' },

  legend: {
    flexDirection: 'row',
    marginBottom: 20 ,
    marginLeft: 30
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4 },
  border: { borderWidth: 1,
    borderColor: '#ccc'
  },

  seatGrid: { marginBottom: 20 },
  seatRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  seat: {
    width: 50,
    height: 50,
    backgroundColor: '#E0D9FF',
    borderWidth: 1,
    borderColor: '#5D50C6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  seatSelected: {
    backgroundColor: '#5D50C6'
  },
  seatUnavailable: {
    backgroundColor: '#ccc',
    borderColor: '#6a6868' ,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  seatText: { color: '#fff', fontSize: 12 },

  summaryText: { fontSize: 16, marginTop: 10 },
  summaryPrice: { fontWeight: 'bold', fontSize: 16, color: '#5D50C6', marginBottom: 20 },

  continueButton: {
    backgroundColor: '#5D50C6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',

  },
  continueButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  seatContainer: {
    padding: 10,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
  },

  colLabel: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#666',
  },

  rowLabel: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#666',
  },

  seatBox: {
    width: 40,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#A29CC0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyCell: {
    width: 40,
  },

});