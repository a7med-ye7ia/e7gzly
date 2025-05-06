import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from "../repositories/firestoreRepository";

const collectionName = 'users';

const getAllUsers = async () => {
  return await getAllDocuments(collectionName);
}

const getUserById = async (documentId) => {
  return await getDocumentById(collectionName, documentId);
};

const addUser = async (doc) => {
  /*
  * add you business logic here (Elkot)
  */
  return await addDocument(collectionName, doc);
}

const addUserWithId = async (documentId, doc) => {
  return await addDocumentWithId(collectionName, documentId, doc);
}

const updateUser = async (documentId, updates) => {
  return updateDocument(collectionName, documentId, updates);
}

const deleteUser = async (documentId) => {
  return deleteDocument(collectionName, documentId);
}

export { getAllUsers, getUserById, addUser, addUserWithId, updateUser, deleteUser };