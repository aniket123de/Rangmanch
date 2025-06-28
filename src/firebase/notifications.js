import { 
  collection, 
  addDoc, 
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Send a notification from a brand to a creator
 * @param {Object} notificationData - The notification data
 * @param {string} notificationData.receiverId - Creator's user ID
 * @param {string} notificationData.senderId - Brand's user ID
 * @param {string} notificationData.brandName - Brand name
 * @param {string} notificationData.industry - Brand industry
 * @param {string} notificationData.website - Brand website
 * @param {string} notificationData.location - Brand location
 * @param {Object} notificationData.socials - Brand social media links
 * @param {string} notificationData.message - Custom message from brand
 * @param {string} notificationData.brandLogo - Brand logo URL
 * @returns {Promise<string>} - Document ID of the created notification
 */
export const sendNotification = async (notificationData) => {
  try {
    const notification = {
      ...notificationData,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      readAt: null,
    };

    const docRef = await addDoc(collection(db, 'notifications'), notification);
    return docRef.id;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}; 