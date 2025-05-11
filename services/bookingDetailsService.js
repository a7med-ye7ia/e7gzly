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
  console.log("data from firesotre functions", data)
  if (!data) {
    return {success: false, error: 'Document not found'}
  }

  const passengers = [];
  for (let i = 0; i < data.numberOfSeats; i++) {
    passengers.push({
      name: data.names[i],
      citizenship: data.citizenship[i],
      passportNumber: data.passportNumbers[i],
      expirationDates: data.expirationDates[i],
      selectedSeats: data.selectedSeats[i],
    });
  }
  return {success : true , data : passengers};
}

export { addDetailDoc, getDetailDocById}