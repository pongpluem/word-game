import app from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";

import { getFirestore, setDoc, doc, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    console.log(req.body);
    /*
    doc(db,"word")

    await setDoc(doc(db, "word", uuidv4()), req.body);
    */

    const citiesRef = collection(db, "cities");

    await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"],
    });

    const citiesRefText = collection(db, "cities", "SF", "text");

    /*
    await setDoc(doc(citiesRefText, uuidv4()), {      
      letter: "t",
      status: "N",
    });

    await setDoc(doc(citiesRefText, uuidv4()), {      
      letter: "e",
      status: "N",
    });

    await setDoc(doc(citiesRefText, uuidv4()), {      
      letter: "s",
      status: "N",
    });

    await setDoc(doc(citiesRefText, uuidv4()), {      
      letter: "t",
      status: "N",
    });
    */

    await addDoc(citiesRefText, {      
      letter: "t",
      status: "N",
    });

    await addDoc(citiesRefText, {      
      letter: "e",
      status: "N",
    });

    await addDoc(citiesRefText, {      
      letter: "s",
      status: "N",
    });

    await addDoc(citiesRefText, {      
      letter: "t",
      status: "N",
    });




    /*
    await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      capital: false,
      population: 3900000,
      regions: ["west_coast", "socal"],
    });
    await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.",
      state: null,
      country: "USA",
      capital: true,
      population: 680000,
      regions: ["east_coast"],
    });
    await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo",
      state: null,
      country: "Japan",
      capital: true,
      population: 9000000,
      regions: ["kanto", "honshu"],
    });
    await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing",
      state: null,
      country: "China",
      capital: true,
      population: 21500000,
      regions: ["jingjinji", "hebei"],
    });
    */
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  res.status(200).json({ name: "John Doe" });
}
