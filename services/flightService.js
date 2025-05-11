import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from "../repositories/firestoreRepository";
import { getAllUsers } from "./userService";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

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
const addRating = async (flightId, ratingValue) => {
  const flightRef = doc(db, collectionName, flightId);

  try {
    const flightSnap = await getDoc(flightRef);
    if (!flightSnap.exists()) {
      throw new Error('Flight not found');
    }

    const currentData = flightSnap.data();
    console.log('currentData', currentData);
    const existingRatings = currentData.ratings || [];
    console.log('existingRatings', existingRatings);

    await updateDoc(flightRef, {
      ratings: [...existingRatings, ratingValue],
    });

    console.log('✅ Rating added to flight.');
  } catch (error) {
    console.error('❌ Error adding rating:', error);
  }
};

export {addRating , getAllFlights, getFlightById, addFlight, updateFlight, deleteFlight}