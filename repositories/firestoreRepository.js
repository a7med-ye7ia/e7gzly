import { db } from "../config/firebaseConfig"
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc, setDoc } from "firebase/firestore"

const getAllDocuments = async (collectionName) => {
  try {
    const docs = await getDocs(collection(db, collectionName))
    console.log("documents fetched successfully from", collectionName)
    return { success: true, data: docs }
  } catch (error) {
    return { success: false, error }
  }
}

const getDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data())
    return docSnap.data()
  } else {
    console.log("No such document!")
    return null
  }
}

const addDocument = async (collectionName, doc) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), doc)
    return { success: true, id: docRef.id }
  } catch (error) {
    return { success: false, error }
  }
}

const addDocumentWithId = async (collectionName, documentId, document) => {
  try {
    const docRef = await setDoc(doc(db, collectionName, documentId), document)
    return { success: true, id: documentId }
  } catch (error) {
    return { success: false, error }
  }
}

const updateDocument = async (collectionName, documentId, updates) => {
  const docRef = doc(db, collectionName, documentId)

  try {
    await updateDoc(docRef, updates)
    return { success: true, id: documentId }
  } catch (error) {
    return { success: false, error }
  }
}

const deleteDocument = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId)

  try {
    await deleteDoc(docRef)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export { getAllDocuments, addDocument, addDocumentWithId, updateDocument, deleteDocument, getDocumentById }
