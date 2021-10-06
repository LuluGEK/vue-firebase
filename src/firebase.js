import {
  initializeApp
} from 'firebase/app'
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
  doc
} from 'firebase/firestore'
import {
  ref,
  onUnmounted
} from 'vue'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const usersCollection = collection(db, 'users')

export const createUser = user => {
  return addDoc(usersCollection, {
    user
  })
}

export const getUser = async id => {
  const user = await getDoc(doc(db, 'users', id))
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return setDoc(doc(db, 'users', id), { user })
}

export const deleteUser = id => {
  return deleteDoc(doc(db, 'users', id))
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = onSnapshot(usersCollection, snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
