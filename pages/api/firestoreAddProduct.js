import app from "../firebase/config"
import { getFirestore, doc, query, where, getDocs, setDoc } from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default async function handler(req, res) {

  try {
    await setDoc(doc(db, "word", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"

      });
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  res.status(200).json({
    description: "Success!",
  });
}