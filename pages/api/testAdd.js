import app from "../../firebase/config"

import { getFirestore, setDoc, doc} from 'firebase/firestore';

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


    res.status(200).json({ name: 'John Doe' })
  }
  