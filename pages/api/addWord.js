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
  Timestamp,
  increment,
} from "firebase/firestore";

const db = getFirestore(app);

export default async function handler(req, res) {
  const result = {};

  try {
    console.log(req.body);
    const id = req.body.id;
    const ans = req.body.ans;
    const quest = req.body.quest;

    const quests = Array.from(quest);
    const texts = Array.from(ans);

    console.log("texts : " + texts);

    // Quest
    const gameRefText = collection(db, "wordgame", id.toString(), "answer");

    /* text in collection
    const resAns = await addDoc(gameRefText, {             
        ans: ans,
        status: "N",
        createDate: Timestamp.now()
      });

    const digitRefText = collection(db, "wordgame", id.toString(), "answer", resAns.id, "text");
              
    for(let i=0; i<texts.length; i++){
        await addDoc(digitRefText, {      
            seq: i,
            letter: texts[i],
            status: "N",
          }); 
    }
    */

    const digit = [];
    for (let i = 0; i < texts.length; i++) {
      let status = "N";
      for (let j = 0; j < quests.length; j++) {
        if (texts[i] === quests[j] && i===j) {
            status = "S"
            break;
        }
        else
            if (texts[i] === quests[j]) {
                status = "Y"                
            }
      }

      digit.push({
        id: uuidv4(),
        seq: i,
        letter: texts[i],
        status: status,
      });
    }

    const resAns = await addDoc(gameRefText, {
      seq: increment(1),
      ans: ans,
      status: "N",
      digit: digit,
      createDate: Timestamp.now(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  res.status(200).json(result);
}
