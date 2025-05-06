import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from "../repositories/firestoreRepository";
import { getAllUsers } from "./userService";

const collectionName = 'flights-destinations';

const getAllFlights = async () => {
  return await getAllDocuments(collectionName);
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

export { getAllFlights, getFlightById, addFlight, updateFlight, deleteFlight}