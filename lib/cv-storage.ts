import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { getFirebaseDb } from "@/lib/firebase";

export type CvRecord = {
  templateId: string;
  form: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
  };
};

function normalizeCvStorageError(error: unknown): Error {
  const message = error instanceof Error ? error.message : "Unable to access CV storage.";

  if (message.includes("database (default) does not exist")) {
    return new Error(
      "Cloud Firestore is not set up yet for this Firebase project. Open Firebase Console > Firestore Database and create the default database first."
    );
  }

  return new Error(message);
}

export async function loadCvForUser(uid: string) {
  try {
    const db = getFirebaseDb();
    const ref = doc(db, "cvProfiles", uid);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as CvRecord;
  } catch (error) {
    throw normalizeCvStorageError(error);
  }
}

export async function saveCvForUser(uid: string, record: CvRecord) {
  try {
    const db = getFirebaseDb();
    const ref = doc(db, "cvProfiles", uid);
    await setDoc(
      ref,
      {
        ...record,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    throw normalizeCvStorageError(error);
  }
}
