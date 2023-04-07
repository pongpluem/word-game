import app from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";
const jsonData3 = require("../../resource/json/3.json");
const jsonData4 = require("../../resource/json/4.json");
const jsonData5 = require("../../resource/json/5.json");
const jsonData6 = require("../../resource/json/6.json");
const jsonDataM = require("../../resource/json/m.json");

import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,  
  Timestamp
} from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
   

  try {
    console.log(req.body);

    const lv = Math.floor(Math.random() * 4) + 3;
    let data = jsonData4;

    switch (lv) {
      case 3:
        data = jsonData3;
        break;
      case 4:
        data = jsonData4;
        break;
      case 5:
        data = jsonData5;
        break;
      case 6:
        data = jsonData6;
        break;
      default:
        data = jsonData4;
        break;
    }

    // Overrid to Hard Mode
    data = jsonDataM;

    // Quest
    const i = Math.floor(Math.random() * (data.data.word.length - 1));

    const word = data.data.word[i];

    const quest = word.wordEN;

    const sound = word.soundTH;

    const description = word.descTH;

    const flag = 1

    const createDate = Timestamp.now()

    // Write DB
    const wordGameRef = collection(db, "wordgame");    

    const game = await addDoc(wordGameRef, {    
      quest: quest,
      sound: sound,
      length: quest.length,
      description: description,
      flag: flag,
      createDate: createDate,

    });
    
    const result = {
      id: game.id,      
      quest: quest,
      sound: sound,
      length: quest.length,
      description: description,
      flag: flag,
      createDate: createDate,
    };

    res.status(200).json(result);
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(200).json({});
  }

  
}
