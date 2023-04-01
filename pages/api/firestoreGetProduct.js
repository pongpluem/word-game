import app from "../firebase/config";
import {
  getFirestore,
  doc,
  query,
  where,
  getDocs,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    const result = [];
    const querySnapshot = await getDocs(collection(db, "word"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      result.push(doc.data());
    });

    console.log(result);

    res.status(200).json(result);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
