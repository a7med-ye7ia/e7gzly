import { db } from '../config/firebaseConfig';
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const getAllDocuments = async (collectionName) => {
  try {
    const docs = await getDocs(collection(db, collectionName))
    console.log('documents fetched successfully from', collectionName);
    return {success: true, data: docs};
  } catch(error) {
    return { success: false, error }
  }
}
const getAllDocumentsTWO = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs;
    return { success: true, data: documents };
  } catch (error) {
    console.error(`Error fetching documents from collection ${collectionName}:`, error);
    return { 
      success: false, 
      data: undefined, 
      error: error.message || 'Unknown error occurred' 
    };
  }
};


const getDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

const addDocument = async (collectionName, doc) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), doc);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
};

const addDocumentWithId = async (collectionName, documentId, doc) => {
  try {
    const docRef = await addDoc(doc(db, collectionName, documentId), doc);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
};

const updateDocument = async (collectionName, documentId, updates) => {
  const docRef = doc(db, collectionName, documentId);

  try {
    await updateDoc(docRef, updates);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }

};

const deleteDocument = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);

  try {
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export { getAllDocuments, addDocument, addDocumentWithId, updateDocument, deleteDocument, getDocumentById ,getAllDocumentsTWO};