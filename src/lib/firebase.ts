import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity check
async function testConnection() {
  try {
    // Attempting to get a dummy doc to verify connection
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
  } catch (error: any) {
    if (error.message?.includes('the client is offline')) {
      console.error("Firebase is offline. Please check your configuration.");
    }
  }
}

testConnection();

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
  }
}

export function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null): never {
  const authInfo = {
    userId: auth.currentUser?.uid || null,
    email: auth.currentUser?.email || null,
    emailVerified: auth.currentUser?.emailVerified || false,
    isAnonymous: auth.currentUser?.isAnonymous || false,
  };

  const errorInfo: FirestoreErrorInfo = {
    error: error.message || 'Unknown error',
    operationType,
    path,
    authInfo
  };

  throw new Error(JSON.stringify(errorInfo));
}
