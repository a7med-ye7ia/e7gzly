import { 
  getAllDocuments, 
  getDocumentById, 
  addDocument, 
  addDocumentWithId, 
  updateDocument, 
  deleteDocument 
} from "../repositories/firestoreRepository";

const collectionName = 'users';

const getAllUsers = async () => {
  return await getAllDocuments(collectionName);
}

const getUserById = async (documentId) => {
  return await getDocumentById(collectionName, documentId);
};

const addUser = async (doc) => {
  // Business logic can be added here
  // For example: validate user data, check for duplicates, etc.
  return await addDocument(collectionName, doc);
}

const addUserWithId = async (documentId, doc) => {
  // Business logic can be added here
  return await addDocumentWithId(collectionName, documentId, doc);
}

const updateUser = async (documentId, updates) => {
  return await updateDocument(collectionName, documentId, updates);
}

const deleteUser = async (documentId) => {
  return await deleteDocument(collectionName, documentId);
}

export { getAllUsers, getUserById, addUser, addUserWithId, updateUser, deleteUser };