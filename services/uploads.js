import { db } from '../services/config.js'
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const getDocuments = async (collectionName) => {
  try {
    const docs = await getDocs(collection(db, collectionName))
    console.log('documents fetched successfully from', collectionName);
    return docs;
  } catch(error) {
    throw error
  }
}

const addDocument = async (doc, collectionName) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), doc);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    throw error
  }
};

const updateDocument = async (documentId, collectionName, updates) => {
  const docRef = doc(db, collectionName, documentId);

  try {
    await updateDoc(docRef, updates);
    console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    throw error
  }

};

const deleteDocument = async (documentId, collectionName) => {
  const docRef = doc(db, collectionName, documentId);

  try {
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    throw error
  }

};

export { getDocuments, addDocument, updateDocument, deleteDocument };
