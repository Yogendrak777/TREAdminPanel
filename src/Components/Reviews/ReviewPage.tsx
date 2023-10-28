import { useState } from "react"
import { ReviewBaseContainer, CardContainer, InputNameContainer, InputReviewContainer, BtnBaseContainer, SubmitButton } from "./Skins"
import { getFirestore, collection, addDoc, getDocs,setDoc, doc, getDocFromCache, query, where, getDoc } from "firebase/firestore";
import { App } from "../FirebaseConfig/Firebase"
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function ReviewPage() {

  
  const [addData, setAddData] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");
  const auth = getAuth(App);
  const user:any = auth.currentUser;
  const navigate =  useNavigate();

    //const AddData = async() => {

        // try {
        //   const db = getFirestore(App)
    
    
          //Add data with uniqe id
    
          // try {
          //   const docRef = await addDoc(collection(db, "Review"), {
          //     num : 5,
          //     review : "lets meet up "
          //   });
          //   console.log("Document written with ID: ", docRef.id);
          // } catch (e) {
          //   console.error("Error adding document: ", e);
          // }
    
    
    
    
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
          
          // const q = query(collection(db, "Review"), where("num", "==", 5));
          // const querySnapshot = await getDocs(q);
          // querySnapshot.forEach((doc) => {
          //   // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, " => ", doc.data());
          // });
                
          
          
          // get All data in particular instance
          
          // const querySnapshot = await getDocs(collection(db, "Review"));
          // querySnapshot.forEach((doc) => {
          //   // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, " => ", doc.data().num);
          // });    
          
    
    
    
    // }
    //   catch (e) {
    //     console.log("Error getting cached document:", e);
    //   }
    //}

    const HandelNameOfReviewer = (event : React.ChangeEvent<HTMLInputElement>) => {
      setReviewerName(event.target.value)
    }

    const HandelReview = (event : React.ChangeEvent<HTMLInputElement>) => {
      setAddData(event.target.value)
    }

    const HandelSubmitBtn = async() => {
      if (addData && reviewerName) {
       try {
         const db = getFirestore(App)
         const uid = user.uid;
            
          try {
            const docRef = await addDoc(collection(db, "Review"), {
              num : uid,
              review : addData,
              name : reviewerName
            });
           
           alert("Document written with ID: "+ docRef.id);
           navigate("/home")
          
          } catch (e) {
            console.error("Error adding document: ", e);
            alert("failed to uploaded")
          } 
        }
        catch (e) {
          console.error("Error adding document: ", e);
        }
    }
    else{
      alert ( "please will all the filed!")
    }
  }
  
  return (
    <ReviewBaseContainer>
      <CardContainer>
        <InputReviewContainer onChange={(e:any)=>HandelReview(e)} placeholder="Enter the review here"/>
        <BtnBaseContainer>
        <InputNameContainer type="text" onChange={(e:any)=>HandelNameOfReviewer(e)} placeholder="Enter your name here" />
        <SubmitButton onClick={HandelSubmitBtn}> submit</SubmitButton>
        </BtnBaseContainer>
      </CardContainer>
    </ReviewBaseContainer>
  )
}
