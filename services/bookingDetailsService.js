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

export { addDetailDoc }