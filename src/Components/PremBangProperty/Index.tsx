import { useEffect, useState } from "react";
import {
  BaseContainer,
  CardContainer,
  InputReviewContainer,
  BtnBaseContainer,
  InputNameContainer,
  SubmitButton,
  CardColContainer,
  InputImageContainer,
  CheckBoxContainer,
  InputCheckContainer,
  CardCheckBoxContainer,
  LabelContainer,
  CheckRowContainer,
  LabelContainerOnImages,
  RadioButtonForPrice,
  PriceNegoContainer,
  CardColumnContainerForFacing,
} from "./Skins";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { App } from "../FirebaseConfig/Firebase";

export default function Index(props:any) {
  const [File, setFile] = useState<any>([]);
  const [percent, setPercent] = useState(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);
  const [getImageContainer, setGetImageContainer] = useState<boolean>(true);
  const [getApartmentType, setGetApartmentType] = useState<boolean>(false);
  const [showProjectName, setShowProjectName] = useState<boolean>(false);
  const [showBHK, setShowBHK] = useState<boolean>(false);
  const [showFacing, setShowFacing] = useState<boolean>(false);
  const [showPropertyAge, setShowFPropertyAge] = useState<boolean>(false);
  const [showFloor, setShowFloor] = useState<boolean>(false);
  const [showPrices, setShowPrices] = useState<boolean>(false);
  const [showFurnishing, setShowFurnishing] = useState<boolean>(false);
  const [showParking, setShowParking] = useState<boolean>(false);
  const [showWater, setShowWater] = useState<boolean>(false);
  const [showPowerSupply, setshowPowerSupply] = useState<boolean>(false);
  const [showSecurity, setShowSecurity] = useState<boolean>(false);
  const [showamenities, setShowamenities] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const [getApartmentTypeData, setGetApartmentTypeData] = useState<any>("");
  const [getPropertyNameData, setPropertyNameData] = useState<any>("");
  const [getBuildUpAreaData, setBuildUpAreaData] = useState<any>("");
  const [getCarpetAreaData, setCarpetAreaData] = useState<any>("");
  const [getBHKData, setShowBHKData] = useState<any>("");
  const [getFacingData, setShowFacingData] = useState<any>("");
  const [getPropertyAgeData, setShowFPropertyAgeData] = useState<any>("");
  const [getAvalibleFrom, setShowAvalibleFromData] = useState<any>("");
  const [getFloor, setShowFloorData] = useState<any>("");
  const [getTotalFloor, setShowTotalFloorData] = useState<any>("");
  const [getPrices, setPricesData] = useState<any>("");
  const [getMaintenance, setMaintenanceData] = useState<any>("");
  const [getPricesnegotiable, setPricesnegotiableData] = useState<any>("");
  const [getFurnishing, setFurnishingeData] = useState<any>("");
  const [getParking, setParkingData] = useState<any>("");
  const [getDescription, setDescriptionData] = useState<any>("");
  const [getWater, setWaterData] = useState<any>("");
  const [getPower, setPowerData] = useState<any>("");
  const [getSecurity, setSecurityData] = useState<any>("");
  const [getClubhouse, setClubhouseData] = useState<any>("N/A");
  const [getGym, setGymData] = useState<any>("N/A");
  const [getplayground, setplaygroundData] = useState<any>("N/A");
  const [getGas, setGasData] = useState<any>("N/A");
  const [getOpenGym, setOpenGymData] = useState<any>("N/A");
  const [getLift, setLifData] = useState<any>("N/A");
  const [getSewageSystem, setSewageSystemData] = useState<any>("N/A");
  const [getFireAlarm, setFireAlarmData] = useState<any>("N/A");
  const [getPark, setparkData] = useState<any>("N/A");
  const [getShoppingCentre, setShoppingCentreData] = useState<any>("N/A");
  const [getInterCom, setInterComData] = useState<any>("N/A");
  const [getSwimmingPool, setSwimmingPoolData] = useState<any>("N/A");
  const [getVisitorsParking, setVisitorsParkingData] = useState<any>("N/A");

  const [getUniqueid, setUniqueId] = useState<any>("")

  const navigate = useNavigate();

  const ImageFile: any = [];
  const storage = getStorage(App);
  const auth = getAuth(App);
  const user: any = auth.currentUser;

  function handleChange(event: any) {
    //  setFile(event.target.files[0]);
    ImageFile[0] = event.target.files[0];
  }

  function handleChange1(event: any) {
    ImageFile[1] = event.target.files[0];
  }

  function handleChange2(event: any) {
    ImageFile[2] = event.target.files[0];
  }

  function handleChange3(event: any) {
    ImageFile[3] = event.target.files[0];
  }

  function handleChange4(event: any) {
    ImageFile[4] = event.target.files[0];
  }

  const handleUpload = () => {
    if (user === null){
      navigate("/")
    }
    else{
      const uid = user.uid;
    
    if (ImageFile.length == 0) {
      // alert("Please upload an image first!");

      setShowAnimation(false);
      setTimeout(() => {
        setGetImageContainer(false);
        setGetApartmentType(true);
        setShowAnimation(true);
      }, 400);
    } else {
      setFile(ImageFile);
      ImageFile.forEach((element: any) => {
        const storageRef = ref(storage, `${uid}/${element.name}`);
        const uploadTask = uploadBytesResumable(storageRef, element);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setPercent((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setShowAnimation(false);
            setTimeout(() => {
              setGetImageContainer(false);
              setGetApartmentType(true);
              setShowAnimation(true);
              setUniqueId("id" + Math.random().toString(36).slice(2));
            }, 400);

            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              let index = ImageFile.indexOf(element);
              ImageFile[index] = downloadURL;
            });
          }
        );
      });
    }
  }
    setFile(ImageFile);
  };

  const HandelSubmitBtn = async () => {
    try {
      const db = getFirestore(App);
      const uid = user.uid;

      try {
        const docRef = await addDoc(collection(db, props.TypeOfProperty), {
          uid: uid,
          images: {
            img1: File[0],
            img2: File[1],
            img3: File[2],
            img4: File[3],
            img5: File[4],
          },
          ApartmentType: getApartmentTypeData,
          PropertyName: getPropertyNameData,
          BuildUpArea: getBuildUpAreaData,
          CarpetArea: getCarpetAreaData,
          BHK: getBHKData,
          Facing: getFacingData,
          PropertyAge: getPropertyAgeData,
          AvalibleData: getAvalibleFrom,
          Floor: getFloor,
          TotalFloor: getTotalFloor,
          Prices : getPrices,
          MaintenanceCost : getMaintenance,
          Negotiable : getPricesnegotiable,
          Furnishing : getFurnishing,
          Parking : getParking,
          Description : getDescription,
          WaterSupply : getWater,
          Power : getPower,
          Security : getSecurity,
          uniqueId : getUniqueid,
          Amenities : {
            ClubHouse : getClubhouse,
            Gym : getGym,
            PlayGround : getplayground,
            Gas : getGas,
            OpenGym : getOpenGym,
            Lift : getLift,
            SewageSystem : getSewageSystem,
            FireAlarm : getFireAlarm,
            Park : getPark,
            ShoppingCentre : getShoppingCentre,
            InterCom : getInterCom,
            SwimmingPool : getSwimmingPool,
            VisitorsParking : getVisitorsParking,
          }
        });
        alert("Upload Successful  id : " + docRef.id);
        navigate("/DisplayProperty")
      } catch (e) {
        console.error("Error adding document: ", e);
        navigate("/DisplayProperty")
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      navigate("/DisplayProperty")
    }
  };

  const handleApartmentType = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setGetApartmentType(false);
      setShowProjectName(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleApartmentName = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowProjectName(false);
      setShowBHK(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleSubmitBHK = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowFacing(true);
      setShowBHK(false);
      setShowAnimation(true);
    }, 400);
  };

  const handleSubmitFacing = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowFacing(false);
      setShowFPropertyAge(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleSubmitProperty = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowFloor(true);
      setShowFPropertyAge(false);
      setShowAnimation(true);
    }, 400);
  };

  const handleAvaliableBtn = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowFloor(false);
      setShowPrices(true);
      setShowAnimation(true);
    }, 400);
  };

  const handlePricing = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowPrices(false);
      setShowFurnishing(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleFurnished = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowFurnishing(false);
      setShowParking(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleParking = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowParking(false);
      setShowWater(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleWaterSupply = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowWater(false);
      setshowPowerSupply(true);
      setShowAnimation(true);
    }, 400);
  };

  const handlePowerSupply = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setshowPowerSupply(false);
      setShowSecurity(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleSecurity = () => {
    if (getApartmentTypeData === "Stand Alone Building"){
      setShowAnimation(false);
    setTimeout(() => {
      setShowSecurity(false);
      setShowDescription(true)
      setShowAnimation(true);
    }, 400);
    } else {
      setShowAnimation(false);
      setTimeout(() => {
        setShowSecurity(false);
        setShowamenities(true);
        setShowAnimation(true);
      }, 400);
    }
  };

  const handleAmenities = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowamenities(false);
      setShowDescription(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleApartmentTypeData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGetApartmentTypeData(event.target.value);
  };

  const handlePropertyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyNameData(event.target.value);
  };

  const handleBuildUpArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuildUpAreaData(event.target.value);
  };

  const handleCarpetArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarpetAreaData(event.target.value);
  };

  const handleBHKData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowBHKData(event.target.value);
  };

  const handleFacingData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFacingData(event.target.value);
  };

  const handlePropertyAgeData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowFPropertyAgeData(event.target.value);
  };

  const handleAvalibleFromData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowAvalibleFromData(event.target.value);
  };

  const handleFloorData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFloorData(event.target.value);
  };

  const handleTotalFloorData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTotalFloorData(event.target.value);
  };

  const HandelReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionData(event.target.value);
  };

  const HandlePrices = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricesData(event.target.value);
  };

  const HandleNegotiable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricesnegotiableData(event.target.value);
  };

  const HandleMaintenance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenanceData(event.target.value);
  };

  const HnadleFurnished = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFurnishingeData(event.target.value);
  };

  const HandleParking = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParkingData(event.target.value);
  };

  const HandelWater = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWaterData(event.target.value);
  };

  const HandlePower = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPowerData(event.target.value);
  };

  const HandleSecurity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityData(event.target.value);
  };

  const HandleClubHouse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClubhouseData(event.target.value);
  };

  const HandleGym = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGymData(event.target.value);
  };

  const HandlePlayground = (event: React.ChangeEvent<HTMLInputElement>) => {
    setplaygroundData(event.target.value);
  };

  const HandleGas = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGasData(event.target.value);
  };

  const HandlePark = (event: React.ChangeEvent<HTMLInputElement>) => {
    setparkData(event.target.value);
  };

  const HandleShopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShoppingCentreData(event.target.value);
  };

  const HandleOpenGym = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenGymData(event.target.value);
  };

  const HandkeLift = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLifData(event.target.value);
  };

  const HandleSewage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSewageSystemData(event.target.value);
  };

  const HandleFireAlarm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFireAlarmData(event.target.value);
  };

  const HandleInterCom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterComData(event.target.value);
  };

  const HandleSwimming = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwimmingPoolData(event.target.value);
  };

  const HandleVisitor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisitorsParkingData(event.target.value);
  };

  return (
    <BaseContainer>
    
      {getImageContainer && (
        <CardContainer AnimationStart={showAnimation}>
          <CardColContainer>
          <LabelContainerOnImages> Please upload Property Images </LabelContainerOnImages>
            {/* {percent} */}
            <InputImageContainer
              type="file"
              accept="/image/*"
              onChange={handleChange}
              multiple
            />
            <InputImageContainer
              type="file"
              accept="/image/*"
              onChange={handleChange1}
              multiple
            />
            <InputImageContainer
              type="file"
              accept="/image/*"
              onChange={handleChange2}
              multiple
            />
            <InputImageContainer
              type="file"
              accept="/image/*"
              onChange={handleChange3}
              multiple
            />
            <InputImageContainer
              type="file"
              accept="/image/*"
              onChange={handleChange4}
              multiple
            />
          </CardColContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleUpload}> Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {getApartmentType && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
           <LabelContainerOnImages> Please select Property Type </LabelContainerOnImages>
            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="ApartmentType"
                value="Flats"
                onChange={handleApartmentTypeData}
              />
              <LabelContainer> Flats </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="ApartmentType"
                value="Gated Community Villa"
                onChange={handleApartmentTypeData}
              />
              <LabelContainer> Gated community Villa </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="ApartmentType"
                value="Independent Houses Villa"
                onChange={handleApartmentTypeData}
              />
              <LabelContainer> Independent Houses/Villa </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="ApartmentType"
                value="Stand Alone Building"
                onChange={handleApartmentTypeData}
              />
              <LabelContainer> Stand Alone Building </LabelContainer>
            </CheckBoxContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleApartmentType}> Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showProjectName && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Property Name and sqrt </LabelContainerOnImages>
            <LabelContainer> Name of the Property : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "Godrej"'
              onChange={handlePropertyName}
            />
            <LabelContainer> Super Built up Area : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "1000 sqft"'
              onChange={handleBuildUpArea}
            />
            <LabelContainer> Carpet Area : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "7000 sqft"'
              onChange={handleCarpetArea}
            />
          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleApartmentName}>
                Next &gt;
              </SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showBHK && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter BHK </LabelContainerOnImages>
        
              <CheckBoxContainer>
                <InputCheckContainer
                  type="radio"
                  name="ApartmentType"
                  value="1 BHK"
                  onChange={handleBHKData}
                />
                <LabelContainer> 1 BHK </LabelContainer>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <InputCheckContainer
                  type="radio"
                  name="ApartmentType"
                  value="2 BHK"
                  onChange={handleBHKData}
                />
                <LabelContainer> 2 BHK </LabelContainer>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <InputCheckContainer
                  type="radio"
                  name="ApartmentType"
                  value="3 BHK"
                  onChange={handleBHKData}
                />
                <LabelContainer> 3 BHK </LabelContainer>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <InputCheckContainer
                  type="radio"
                  name="ApartmentType"
                  value="4 BHK"
                  onChange={handleBHKData}
                />
                <LabelContainer> 4 BHK </LabelContainer>
              </CheckBoxContainer>

              <CheckBoxContainer>
                <InputCheckContainer
                  type="radio"
                  name="ApartmentType"
                  value="5 BHK"
                  onChange={handleBHKData}
                />
                <LabelContainer> 4 BHK + </LabelContainer>
              </CheckBoxContainer>
          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleSubmitBHK}> Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showFacing && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Property Facing </LabelContainerOnImages>
            <CheckRowContainer>
              <CardColumnContainerForFacing>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="East"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> East </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="North"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> North </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="South"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> South </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="West"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> West </LabelContainer>
                </CheckBoxContainer>
              </CardColumnContainerForFacing>

              <CardColumnContainerForFacing>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="South-west"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> South-west </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="North-east"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> North-east </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="North-west"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> North-west </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="South-east"
                    onChange={handleFacingData}
                  />
                  <LabelContainer> South-east </LabelContainer>
                </CheckBoxContainer>
              </CardColumnContainerForFacing>
            </CheckRowContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleSubmitFacing}>
              Next &gt;
              </SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showPropertyAge && (
        <CardContainer marginTop="2em" AnimationStart={showAnimation}>
          <CardColContainer>
          <LabelContainerOnImages> Please Enter Property Age </LabelContainerOnImages>
            <CheckRowContainer>
              <CardCheckBoxContainer>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="Under construction"
                    onChange={handlePropertyAgeData}
                  />
                  <LabelContainer> Under construction </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="Less than a year"
                    onChange={handlePropertyAgeData}
                  />
                  <LabelContainer> Less than a year </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="1-3 years"
                    onChange={handlePropertyAgeData}
                  />
                  <LabelContainer> 1-3 years </LabelContainer>
                </CheckBoxContainer>
              </CardCheckBoxContainer>

              <CardCheckBoxContainer>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="3-6 years"
                    onChange={handlePropertyAgeData}
                  />
                  <LabelContainer>3-6 years </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="7-10 years"
                    onChange={handlePropertyAgeData}
                  />
                  <LabelContainer> 7-10 years </LabelContainer>
                </CheckBoxContainer>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="radio"
                    name="ApartmentType"
                    value="More than 10 years"
                    onChange={handlePropertyAgeData}
                  />
                  <LabelContainer> More than 10 years </LabelContainer>
                </CheckBoxContainer>
              </CardCheckBoxContainer>
            </CheckRowContainer>

          </CardColContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleSubmitProperty}>
              Next &gt;
              </SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showFloor && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Property Basic Info </LabelContainerOnImages>
            <LabelContainer> Available from : </LabelContainer>
            <InputNameContainer
              type="date"
              placeholder='eg : "Godrej"'
              onChange={handleAvalibleFromData}
            />
            <LabelContainer> Floor : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "6th floor"'
              onChange={handleFloorData}
            />
            <LabelContainer> Total floor : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "10 floors"'
              onChange={handleTotalFloorData}
            />

            <LabelContainer> Number of Bedrooms : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "3 Bedrooms"'
              onChange={handleTotalFloorData}
            />

            <LabelContainer> Number of Toilet : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "2 Toilet"'
              onChange={handleTotalFloorData}
            />
            <LabelContainer> Number of Balconies : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "2 Balconies"'
              onChange={handleTotalFloorData}
            />
          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleAvaliableBtn}>  Next &gt; </SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showPrices && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Property Pricing Info </LabelContainerOnImages>
            <LabelContainer> Expected price : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "87 lacks"'
              onChange={HandlePrices}
            />
            <PriceNegoContainer>
              <RadioButtonForPrice>
                <InputCheckContainer
                  type="radio"
                  name="Prices"
                  value="negotiable"
                  onChange={HandleNegotiable}
                />
                <LabelContainer> Negotiable </LabelContainer>
              </RadioButtonForPrice>
              <RadioButtonForPrice>
                <InputCheckContainer
                  type="radio"
                  name="Prices"
                  value="Not"
                  onChange={HandleNegotiable}
                />
                <LabelContainer> Not </LabelContainer>
              </RadioButtonForPrice>
            </PriceNegoContainer>
            <LabelContainer> Monthly Maintenance : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "2k"'
              onChange={HandleMaintenance}
            />

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handlePricing}>  Next &gt; </SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showFurnishing && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Furnished type </LabelContainerOnImages>
            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Furnished"
                value="Unfurnished"
                onChange={HnadleFurnished}
              />
              <LabelContainer> Unfurnished </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Furnished"
                value="Semi- furnished"
                onChange={HnadleFurnished}
              />
              <LabelContainer> Semi- furnished </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Furnished"
                value="Fully furnished "
                onChange={HnadleFurnished}
              />
              <LabelContainer> Fully furnished </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Furnished"
                value="N/A"
                onChange={HnadleFurnished}
              />
              <LabelContainer> None </LabelContainer>
            </CheckBoxContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleFurnished}>  Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showParking && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Parking type </LabelContainerOnImages>
            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="parking"
                value="Open car parking"
                onChange={HandleParking}
              />
              <LabelContainer> Open car parking</LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="parking"
                value="Covered car parking"
                onChange={HandleParking}
              />
              <LabelContainer> Covered car parking </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="parking"
                value="No car parking"
                onChange={HandleParking}
              />
              <LabelContainer> No car parking </LabelContainer>
            </CheckBoxContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleParking}>  Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showWater && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Water Supply </LabelContainerOnImages>
            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Water"
                value="Borewell"
                onChange={HandelWater}
              />
              <LabelContainer>Borewell</LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Water"
                value="Cooperation"
                onChange={HandelWater}
              />
              <LabelContainer> Cooperation </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Water"
                value="Both Borewell and Co-operation"
                onChange={HandelWater}
              />
              <LabelContainer>Both Borewell and Co-operation </LabelContainer>
            </CheckBoxContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleWaterSupply}> Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showPowerSupply && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Power Supply </LabelContainerOnImages>
            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Power"
                value="Partially"
                onChange={HandlePower}
              />
              <LabelContainer>Partially</LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Power"
                value="Full"
                onChange={HandlePower}
              />
              <LabelContainer> Full </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Power"
                value="None"
                onChange={HandlePower}
              />
              <LabelContainer> None </LabelContainer>
            </CheckBoxContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handlePowerSupply}> Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showSecurity && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Security type </LabelContainerOnImages>
            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Security"
                value="CCTV"
                onChange={HandleSecurity}
              />
              <LabelContainer>CCTV</LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Security"
                value="Guards"
                onChange={HandleSecurity}
              />
              <LabelContainer> Guards </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Security"
                value="Both CCTV & guards"
                onChange={HandleSecurity}
              />
              <LabelContainer> Both CCTV & guards </LabelContainer>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="radio"
                name="Security"
                value="none"
                onChange={HandleSecurity}
              />
              <LabelContainer> none </LabelContainer>
            </CheckBoxContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleSecurity}>  Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showamenities && (
        <CardContainer marginTop="2em" AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter other Amenities</LabelContainerOnImages>
            <CheckRowContainer>
              <CardCheckBoxContainer>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    value=" Club house"
                    onChange={HandleClubHouse}
                  />
                  <LabelContainer> Club house </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="Gym"
                    onChange={HandleGym}
                  />
                  <LabelContainer> Gym </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="playground"
                    onChange={HandlePlayground}
                  />
                  <LabelContainer> playground </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="Gas"
                    onChange={HandleGas}
                  />
                  <LabelContainer> Gas </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="park"
                    onChange={HandlePark}
                  />
                  <LabelContainer> park </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="Shopping centre"
                    onChange={HandleShopping}
                  />
                  <LabelContainer> shopping centre </LabelContainer>
                </CheckBoxContainer>
              </CardCheckBoxContainer>

              <CardCheckBoxContainer>
                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="open gym "
                    onChange={HandleOpenGym}
                  />
                  <LabelContainer> open gym </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="Lift"
                    onChange={HandkeLift}
                  />
                  <LabelContainer> Lift </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="sewage system "
                    onChange={HandleSewage}
                  />
                  <LabelContainer>sewage system </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="fire alarm "
                    onChange={HandleFireAlarm}
                  />
                  <LabelContainer> fire alarm </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="inter com "
                    onChange={HandleInterCom}
                  />
                  <LabelContainer> inter com </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="swimming pool"
                    onChange={HandleSwimming}
                  />
                  <LabelContainer> swimming pool </LabelContainer>
                </CheckBoxContainer>

                <CheckBoxContainer>
                  <InputCheckContainer
                    type="checkbox"
                    name="ApartmentType"
                    value="visitors parking"
                    onChange={HandleVisitor}
                  />
                  <LabelContainer> visitors parking </LabelContainer>
                </CheckBoxContainer>
              </CardCheckBoxContainer>
            </CheckRowContainer>

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={handleAmenities}> Next &gt;</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}

      {showDescription && (
        <CardContainer AnimationStart={showAnimation}>
          <CardCheckBoxContainer>
          <LabelContainerOnImages> Please Enter Property Description</LabelContainerOnImages>
            <InputReviewContainer
              onChange={(e: any) => HandelReview(e)}
              placeholder="Enter the review here"
            />

          </CardCheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton onClick={HandelSubmitBtn}> Submit Data</SubmitButton>
            </BtnBaseContainer>
        </CardContainer>
      )}
    </BaseContainer>
  );
}
