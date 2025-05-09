import { StyleSheet } from "react-native";
import stylesAuth from "./stylesAuth";

// Standardized color palette
const primaryColor = "#5C40CC"; // Using the color from the second file
const grayText = "#666";
const lightGray = "#eee";
const white = "#fff";
const borderLight = "#f0f0f0";

export default StyleSheet.create({
  // === GENERAL CONTAINER STYLES ===
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80
  },

  // === TYPOGRAPHY ===
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },

  // === BOOKING FORM STYLES ===
  formContainer: {
    marginTop: 10,        
    borderRadius: 15,
    padding: 20,
    marginBottom: 20, 
  },

  // Trip type selection
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

  // Input fields
  inputField: {
    backgroundColor: white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: lightGray,   
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

  // Swap button
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

  // Date and passenger fields
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
    borderColor: lightGray,   
    marginHorizontal: 5,
  },

  // Book Now button
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

  // === MODAL STYLES (COUNTRY PICKER) ===
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
  modalSearchInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: lightGray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  // === BOOKING CONFIRMATION STYLES ===
  // Card layout
  card: {
    width: '85%',
    backgroundColor: white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 16,
  },
  header: {
    backgroundColor: primaryColor,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },

  // Information rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: borderLight,
  },
  icon: {
    marginRight: 10,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: 100,
    fontWeight: '600',
    color: '#444',
    fontSize: 15,
  },
  value: {
    flex: 1,
    color: '#222',
    fontSize: 15,
  },

  // Button styles
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: primaryColor,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: primaryColor,
  },
  secondaryButtonText: {
    color: primaryColor,
  },

  // Flight visualization
  flightInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  flightTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flightDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  flightMiddle: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  flightLine: {
    height: 2,
    backgroundColor: '#ddd',
    width: '100%',
    position: 'absolute',
  },
  flightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: primaryColor,
  },
  flightCity: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },

  // Section dividers and titles
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 5,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginVertical: 15,
  },

  // Price display
  priceContainer: {
    backgroundColor: '#f9f9ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  totalPrice: {
    color: primaryColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    color: grayText,
  },
  priceValue: {
    fontWeight: '500',
    color: '#333',
  },
  
  // Utility styles
  loadingText: {
    fontSize: 16,
    color: grayText,
    textAlign: "center",
    paddingVertical: 20,
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
  //
  // row: {
  //   flexDirection: 'row',
  //   marginVertical: 4,
  //   alignItems: 'center',
  // },

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