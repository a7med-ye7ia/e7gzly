import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument ,getAllDocumentsTWO} from "../repositories/firestoreRepository";
import { getAllUsers } from "./userService";

const collectionName = 'flights-destinations';
const addBooking = async (bookingData) => {
  return await addDocument(bookingsCollectionName, bookingData);
};
const getAllFlights = async () => {
  return await getAllDocuments(collectionName);
}
const getAllFlightsTWO = async () => {
  return await getAllDocumentsTWO(collectionName);
}

const getFlightById = async (documentId) => {
  return await getDocumentById(collectionName, documentId)
};

const addFlight = async (doc) => {
  return await addDocument(collectionName, doc)
}

const updateFlight = async (documentId, updates) => {
  return updateDocument(collectionName, documentId, updates)
}

const deleteFlight = async (documentId) => {
  return deleteDocument(collectionName, documentId)
}

export { getAllFlights, getFlightById, addFlight, updateFlight, deleteFlight,getAllFlightsTWO,addBooking}