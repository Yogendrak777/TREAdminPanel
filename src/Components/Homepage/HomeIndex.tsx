import {
  HomepageContainer,
  CardContainer,
  CardDetailsContainer,
} from "./Skins";
import { getFirestore, collection, addDoc, getDocs,setDoc, doc, getDocFromCache, query, where, getDoc } from "firebase/firestore";
import { App } from "../FirebaseConfig/Firebase"

export default function HomeIndex() {

  const AddData = async() => {
    try {
      const db = getFirestore(App)


      try {
        const docRef = await addDoc(collection(db, "Review"), {
          num : 5,
          review : "lets meet up "
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      // Add Data to with own document 
      // await setDoc(doc(db, "Review", "9353437216"), {
      //   review : "this is testing app"
      // });

    



// get a single doc

// const docRef = doc(db, "Review");
// const docSnap = await getDoc(docRef);
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data().review);
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
      


// get a multiple doc

// const q = query(collection(db, "Review"), where("num", "==", 4));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
      



// All data in particular instance

// const querySnapshot = await getDocs(collection(db, "Review"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data().num);
// });    
      

  }
  catch (e) {
    console.log("Error getting cached document:", e);
  }
  }
  const handleReview = () => {
    AddData()
  }
  

  return (
    <HomepageContainer>
      <CardDetailsContainer>
        <CardContainer onClick={handleReview}>Upload review</CardContainer>
        <CardContainer>upload top bangalore property</CardContainer>
        <CardContainer>upload Premium property</CardContainer>
        <CardContainer>upload flats</CardContainer>
        <CardContainer>upload independent house</CardContainer>
        <CardContainer>Leads</CardContainer>
        <CardContainer>Analysis</CardContainer>
        <CardContainer>Brokers</CardContainer>
        <CardContainer>Employee Data</CardContainer>
        <CardContainer>Verify Property</CardContainer>
        <CardContainer>Announcement</CardContainer>
        <CardContainer>Reports</CardContainer>
        <CardContainer>Total Sales</CardContainer>
        <CardContainer>Financial Data </CardContainer>
        <CardContainer>Posts </CardContainer>
      </CardDetailsContainer>
    </HomepageContainer>
  );
}
