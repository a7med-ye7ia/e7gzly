import { 
  getAllDocuments, 
  getDocumentById, 
  addDocument, 
  addDocumentWithId, 
  updateDocument, 
  deleteDocument 
} from "../repositories/firestoreRepository";

const collectionName = 'bookingDetails';

const addDetailDoc = async (doc) => {
  return await addDocument(collectionName, doc)
}

const getDetailDocById = async (documentId) => {
  const data = await getDocumentById(collectionName, documentId)
  if (!data) {
    return {success: false, error: 'Document not found'}
  }

  const passengers = [numberOfSeats];
  for (let i = 0; i < data.numberOfSeats; i++) {
    passengers.push({
      name: data.names[i],
      citizenship: data.citizenship[i],
      passportNumber: data.passportNumbers[i],
      expirationDates: data.expirationDates[i],
      selectedSeats: data.selectedSeats[i],
    });
  }
}

export { addDetailDoc, getDetailDocById}