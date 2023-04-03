import app from "../../firebase/config";
import { v4 as uuidv4 } from 'uuid';

import { getFirestore, setDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  try {

    console.log(req.body)

    await setDoc(doc(db, "word", uuidv4()), req.body);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  res.status(200).json({ name: "John Doe" });
}
