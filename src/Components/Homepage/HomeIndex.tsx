import {
  HomepageContainer,
  CardContainer,
  CardDetailsContainer,
} from "./Skins";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs,setDoc, doc, getDocFromCache, query, where, getDoc } from "firebase/firestore";
import { App } from "../FirebaseConfig/Firebase"


export default function HomeIndex(props:any) {

  const navigate = useNavigate();

  const submitHandler = (path:string) => {
    navigate(path);
  }

  const submitPropertyHandler = (path:string, Data:any) => {
    navigate(path);
    props.TakePropertyTypeData(Data)
  }
  
  return (
    <HomepageContainer>
      <CardDetailsContainer>
        <CardContainer onClick={() => submitHandler("/review")}>Upload review</CardContainer>
        <CardContainer onClick={() => submitPropertyHandler("/PremBangProperty", "TopBangaloreProperty")}>upload top bangalore property</CardContainer>
        <CardContainer onClick={() => submitPropertyHandler("/PremBangProperty","PremiumProperty" )}>upload Premium property</CardContainer>
        <CardContainer onClick={() => submitPropertyHandler("/PremBangProperty", "Flats")}>upload flats </CardContainer>
        <CardContainer onClick={() => submitPropertyHandler("/PremBangProperty", "IndependentHouse" )}>upload independent house</CardContainer>
        <CardContainer onClick={() => submitHandler("/DisplayProperty")}>Display all data</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")} >Leads</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Analysis</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Brokers</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Employee Data</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Verify Property</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}> Announcement</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Reports</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Total Sales</CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Financial Data </CardContainer>
        <CardContainer onClick={() => submitHandler("/ComingSoon")}>Posts </CardContainer>
      </CardDetailsContainer>
    </HomepageContainer>
  );
}
