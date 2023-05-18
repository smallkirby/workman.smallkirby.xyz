import {
  collection,
  getDocs,
  getFirestore as getFirestoreNative,
} from 'firebase/firestore';
import { getFirebaseApp } from './app';
import { TypingData, TypingTheme } from '@/types/TypingData';
import { FirebaseError } from 'firebase/app';
import { stripIndent } from 'common-tags';

const getFirestore = () => getFirestoreNative(getFirebaseApp());

export class PrettyFirebaseError extends Error {
  readonly code: string;
  readonly message: string;

  constructor(error: FirebaseError) {
    super(error.message);

    switch (error.code) {
      case 'permission-denied':
        this.code = 'permission-denied';
        this.message = stripIndent`
            Permission denied.
            You have to be logged in as smallkirby.
            Are you cheating...!?!?`;
      default:
        this.code = 'unknown';
        this.message = error.message;
        break;
    }
  }
}

export const getPlatforms = async (): Promise<
  TypingTheme[] | PrettyFirebaseError
> => {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, 'platforms'))
    .then((s) => s)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });
  if (snapshot instanceof PrettyFirebaseError) {
    return snapshot;
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TypingTheme[];
};

export const getHistories = async (): Promise<
  TypingData[] | PrettyFirebaseError
> => {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, 'histories'))
    .then((s) => s)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });
  if (snapshot instanceof PrettyFirebaseError) {
    return snapshot;
  }

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
  })) as TypingData[];
};
