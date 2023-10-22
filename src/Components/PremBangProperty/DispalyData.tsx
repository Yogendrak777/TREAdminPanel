import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDocFromCache,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BaseContainer, CheckBoxContainer } from "./Skins";
import { App } from "../FirebaseConfig/Firebase";
import Carousel from "./Caurosel";

export default function DispalyData(props:any) {

  const [showData, setShowData] = useState<Array<any>>([])

  const getDisaplyData = async () => {
    try {
      const db = getFirestore(App);
      const querySnapshot = await getDocs(collection(db, props.TypeOfProperty? props.TypeOfProperty: "PremBangProperty" ));
      const data = querySnapshot.docs.map((doc) => doc.data());
       setShowData(data);
      
       
      //  querySnapshot.forEach((doc) => {
      //    setShowData(doc.data())
      //  });  
      
        // const q = query(collection(db, "PremBangProperty"), where("num", "==", "1"));
        //    const querySnapshot = await getDocs(q);
        //    querySnapshot.forEach((doc) => {
        //      console.log( doc.id +"  " +JSON.stringify(doc.data()))
        //     setShowData(JSON.stringify(doc.data()));
        //   });
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getDisaplyData();
  }, []);

  return ( 
  <BaseContainer>
    {showData.map((docs:any)=>(
      <div key={docs.uniqueId}>
        <Carousel img1 = {docs.images.img1} img2 = {docs.images.img2} img3 = {docs.images.img3} img4 = {docs.images.img4}/>
          <h1>{docs.PropertyName}</h1>
          <p>{docs.Prices}</p>
        </div>
    ))}

  </BaseContainer>
  )
}
