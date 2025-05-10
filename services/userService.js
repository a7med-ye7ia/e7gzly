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
  return await addDocument(collectionName, doc);
}

const addUserWithId = async (documentId, doc) => {
  return await addDocumentWithId(collectionName, documentId, doc);
}

const updateUser = async (documentId, updates) => {
  return await updateDocument(collectionName, documentId, updates);
}

const deleteUser = async (documentId) => {
  return await deleteDocument(collectionName, documentId);
}

const addFlightToUser = async (userId, flightId) => {
  const user = await getUserById(userId);
  if (!user) {
    // throw new Error('User not found');
    return {success: false, error: 'User not found to update bookedTrips'};
  }

  const flights = user.bookTrips || [];
  flights.push(flightId);

  const {success, id, error } = await updateUser(userId, { bookedTrips: flights });

  if (success) {
    return {success, id};
  } else {
    return {success, error: 'Error updating bookedTrips'};
  }
  
};

export { getAllUsers, getUserById, addUser, addUserWithId, updateUser, deleteUser, addFlightToUser };