import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  updateDoc 
} from 'firebase/firestore';
import { db } from './firebase';

// ===== BRAND FUNCTIONS =====

// Create or update brand profile
export const createOrUpdateBrandProfile = async (uid, brandData) => {
  try {
    const brandRef = doc(db, 'brands', uid);
    await setDoc(brandRef, {
      ...brandData,
      uid: uid,
      updatedAt: serverTimestamp(),
      createdAt: brandData.createdAt || serverTimestamp()
    }, { merge: true });
    return { success: true, brandId: uid };
  } catch (error) {
    throw error;
  }
};

// Get brand profile by ID
export const getBrandProfile = async (brandId) => {
  try {
    const brandRef = doc(db, 'brands', brandId);
    const brandSnap = await getDoc(brandRef);
    if (brandSnap.exists()) {
      return { id: brandSnap.id, ...brandSnap.data() };
    } else {
      throw new Error('Brand not found');
    }
  } catch (error) {
    throw error;
  }
};

// Get all brands (for creators to discover)
export const getAllBrands = async () => {
  try {
    const brandsRef = collection(db, 'brands');
    const q = query(brandsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const brands = [];
    querySnapshot.forEach((doc) => {
      brands.push({ id: doc.id, ...doc.data() });
    });
    return brands;
  } catch (error) {
    throw error;
  }
};

// ===== CREATOR DISCOVERY FUNCTIONS =====

// Get all creators (for brands to discover)
export const getAllCreators = async () => {
  try {
    const creatorsRef = collection(db, 'creators');
    const q = query(creatorsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const creators = [];
    querySnapshot.forEach((doc) => {
      creators.push({ id: doc.id, ...doc.data() });
    });
    return creators;
  } catch (error) {
    throw error;
  }
};

// Get creator profile by ID
export const getCreatorProfile = async (creatorId) => {
  try {
    const creatorRef = doc(db, 'creators', creatorId);
    const creatorSnap = await getDoc(creatorRef);
    if (creatorSnap.exists()) {
      return { id: creatorSnap.id, ...creatorSnap.data() };
    } else {
      throw new Error('Creator not found');
    }
  } catch (error) {
    throw error;
  }
};

// ===== USER FUNCTIONS =====

// Get user data by UID
export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
};

// ===== COLLABORATION FUNCTIONS =====

// Create collaboration proposal
export const createCollaboration = async (collaborationData) => {
  try {
    const collabRef = doc(collection(db, 'collaborations'));
    const collabData = {
      ...collaborationData,
      id: collabRef.id,
      createdAt: serverTimestamp(),
      status: 'pending' // pending, accepted, rejected
    };
    await setDoc(collabRef, collabData);
    return { success: true, collaborationId: collabRef.id };
  } catch (error) {
    throw error;
  }
};

// Get collaborations for a brand
export const getBrandCollaborations = async (brandId) => {
  try {
    const collabsRef = collection(db, 'collaborations');
    const q = query(
      collabsRef, 
      where('brandId', '==', brandId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const collaborations = [];
    querySnapshot.forEach((doc) => {
      collaborations.push({ id: doc.id, ...doc.data() });
    });
    return collaborations;
  } catch (error) {
    throw error;
  }
};

// Update collaboration status
export const updateCollaborationStatus = async (collaborationId, status) => {
  try {
    const collabRef = doc(db, 'collaborations', collaborationId);
    await updateDoc(collabRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    throw error;
  }
}; 