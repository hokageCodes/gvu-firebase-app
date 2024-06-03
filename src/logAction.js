import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export const logAction = async (userId, action, details = {}) => {
  try {
    await addDoc(collection(db, 'logs'), {
      userId,
      action,
      details,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error("Error logging action: ", error);
  }
};
