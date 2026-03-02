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

export async function loadCvForUser(uid: string) {
  const db = getFirebaseDb();
  const ref = doc(db, "cvProfiles", uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as CvRecord;
}

export async function saveCvForUser(uid: string, record: CvRecord) {
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
}
