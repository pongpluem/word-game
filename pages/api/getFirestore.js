import app from "../../firebase/config";
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
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    const result = [];

    const querySnapshot = await getDocs(collection(db, "cities", "SF", "text"));
    querySnapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        text: doc.data()
      });
    });

    
    
    /*
    const querySnapshot = await getDocs(collection(db, "word"));
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    */

    //console.log(result);

    res.status(200).json(result);
  } catch (e) {
    console.error("Error geting document: ", e);
  }
}
