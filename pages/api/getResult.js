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
  let result = {};
  console.log("call")
  try {
    const id = req.body.id;    

    const gameRef = doc(db, "wordgame", id.toString());
    if (gameRef != undefined) {
      const gameSnap = await getDoc(gameRef);

      if (gameSnap.exists()) {
        const game = gameSnap.data();      
        const answers = [];       

        const ansSnapshot = await getDocs(
          collection(db, "wordgame", id, "answer")
        );
        ansSnapshot.forEach((doc) => {      
          const resAnswers = doc.data();
           
          answers.push({
            id: doc.id,
            ans: resAnswers.ans,
            createDate: resAnswers.createDate.toDate(),
            digit: resAnswers.digit,
            status: resAnswers.status,
          });          
        
        });
       
        result = {
          id: game.id,
          quest: game.quest,
          sound: game.sound,
          length: game.quest.length,
          description: game.description,
          flag: game.flag,
          createDate: game.createDate.toDate(),
          answer: answers,
        };
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
   
    //console.log(result);

    res.status(200).json(result);
  } catch (e) {
    console.error("Error geting document: ", e);
    res.status(200).json({});
  }
}
