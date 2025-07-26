import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  where,
  countFromServer,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"

// Testimonials
export const addTestimonial = async (testimonialData: any) => {
  return await addDoc(collection(db, "testimonials"), {
    ...testimonialData,
    createdAt: serverTimestamp(),
  })
}

export const updateTestimonial = async (id: string, testimonialData: any) => {
  return await updateDoc(doc(db, "testimonials", id), {
    ...testimonialData,
    updatedAt: serverTimestamp(),
  })
}

export const deleteTestimonial = async (id: string) => {
  return await deleteDoc(doc(db, "testimonials", id))
}

// Books
export const addBook = async (bookData: any) => {
  return await addDoc(collection(db, "books"), {
    ...bookData,
    createdAt: serverTimestamp(),
  })
}

export const updateBook = async (id: string, bookData: any) => {
  return await updateDoc(doc(db, "books", id), {
    ...bookData,
    updatedAt: serverTimestamp(),
  })
}

export const deleteBook = async (id: string) => {
  return await deleteDoc(doc(db, "books", id))
}

// Featured Books
export const toggleFeaturedBook = async (id: string, isFeatured: boolean) => {
  return await updateDoc(doc(db, "books", id), {
    isFeatured,
    updatedAt: serverTimestamp(),
  })
}

export const getFeaturedBooksCount = async (): Promise<number> => {
  const q = query(collection(db, "books"), where("isFeatured", "==", true))
  const snapshot = await countFromServer(q)
  return snapshot.data().count
}

// Team
export const addTeamMember = async (teamData: any) => {
  return await addDoc(collection(db, "team"), {
    ...teamData,
    createdAt: serverTimestamp(),
  })
}

export const updateTeamMember = async (id: string, teamData: any) => {
  return await updateDoc(doc(db, "team", id), {
    ...teamData,
    updatedAt: serverTimestamp(),
  })
}

export const deleteTeamMember = async (id: string) => {
  return await deleteDoc(doc(db, "team", id))
}

// Updates
export const addUpdate = async (updateData: any) => {
  return await addDoc(collection(db, "updates"), {
    ...updateData,
    isActive: updateData.status === "active",
    createdAt: serverTimestamp(),
  })
}

export const updateUpdate = async (id: string, updateData: any) => {
  return await updateDoc(doc(db, "updates", id), {
    ...updateData,
    isActive: updateData.status === "active",
    updatedAt: serverTimestamp(),
  })
}

export const deleteUpdate = async (id: string) => {
  return await deleteDoc(doc(db, "updates", id))
}

// Contact Messages
export const submitContactForm = async (formData: any) => {
  return await addDoc(collection(db, "messages"), {
    ...formData,
    status: "unread",
    createdAt: serverTimestamp(),
  })
}

export const updateMessageStatus = async (id: string, status: string) => {
  return await updateDoc(doc(db, "messages", id), {
    status,
    updatedAt: serverTimestamp(),
  })
}

export const deleteMessage = async (id: string) => {
  return await deleteDoc(doc(db, "messages", id))
}

// Newsletter Subscriptions
export const subscribeToNewsletter = async (email: string) => {
  // Check if email already exists
  const q = query(collection(db, "subscribers"), where("email", "==", email))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    throw new Error("Email already subscribed")
  }

  return await addDoc(collection(db, "subscribers"), {
    email,
    status: "active",
    createdAt: serverTimestamp(),
  })
}

export const updateSubscriberStatus = async (id: string, status: string) => {
  return await updateDoc(doc(db, "subscribers", id), {
    status,
    updatedAt: serverTimestamp(),
  })
}

export const deleteSubscriber = async (id: string) => {
  return await deleteDoc(doc(db, "subscribers", id))
}

// File Upload
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  const timestamp = Date.now()
  const fileName = `${timestamp}_${file.name}`
  const storageRef = ref(storage, `${folder}/${fileName}`)

  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)

  return downloadURL
}

// Users
export const addUser = async (userData: any) => {
  return await addDoc(collection(db, "users"), {
    ...userData,
    createdAt: serverTimestamp(),
  })
}

export const updateUser = async (id: string, userData: any) => {
  return await updateDoc(doc(db, "users", id), {
    ...userData,
    updatedAt: serverTimestamp(),
  })
}

export const deleteUser = async (id: string) => {
  return await deleteDoc(doc(db, "users", id))
}
