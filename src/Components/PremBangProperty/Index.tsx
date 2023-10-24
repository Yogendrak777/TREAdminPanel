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
  LabelContainer,
  LabelContainerOnImages,
  LabelContainerForCheckBox,
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
import Select from "react-select";

export default function Index(props: any) {
  const [File, setFile] = useState<any>([]);
  const [percent, setPercent] = useState(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  const [getImageContainer, setGetImageContainer] = useState<boolean>(false);
  const [showPropertyDetailsSlide, setShowPropertyDetailsSlide] =
    useState<boolean>(true);
  const [showSaleDetailsSlide, setShowSaleDetailsSlide] =
    useState<boolean>(false);
  const [showAmenitiesSlide, setShowAmenitiesSlide] = useState<boolean>(false);
  const [showLocationSlide, setShowLocationSlide] = useState<boolean>(false);
  const [showAdditionInfoSlide, setShowAdditionInfoSlide] =
    useState<boolean>(false);
  const [showYourAvailabilitySlide, setShowYourAvailabilitySlide] =
    useState<boolean>(false);

  const [getApartmentTypeData, setGetApartmentTypeData] = useState<any>("N/A");
  const [getPropertyNameData, setPropertyNameData] = useState<any>("N/A");
  const [getBuildUpAreaData, setBuildUpAreaData] = useState<any>("");
  const [getCarpetAreaData, setCarpetAreaData] = useState<any>("");
  const [getBHKData, setShowBHKData] = useState<any>("N/A");
  const [getFacingData, setShowFacingData] = useState<any>("N/A");
  const [getPropertyAgeData, setShowFPropertyAgeData] = useState<any>("N/A");
  const [getAvalibleFrom, setShowAvalibleFromData] = useState<any>("");
  const [getFloor, setShowFloorData] = useState<any>("");
  const [getTotalFloor, setShowTotalFloorData] = useState<any>("");
  const [getPrices, setPricesData] = useState<any>("");
  const [getMaintenance, setMaintenanceData] = useState<any>("");
  const [getPricesnegotiable, setPricesnegotiableData] = useState<any>("N/A");
  const [getFurnishing, setFurnishingeData] = useState<any>("N/A");
  const [getParking, setParkingData] = useState<any>("N/A");
  const [getDescription, setDescriptionData] = useState<any>("");
  const [getWater, setWaterData] = useState<any>("N/A");
  const [getPower, setPowerData] = useState<any>("N/A");
  const [getSecurity, setSecurityData] = useState<any>("N/A");
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
  const [getAddressData, setAddressData] = useState<any>("");
  const [getContentData, setContentData] = useState<any>("");
  const [getUniqueid, setUniqueId] = useState<any>("N/A");
  const [getcityData, setCityData] = useState<any>("");
  const [getLocalityData, setLocalityData] = useState<any>("");
  const [getKathaData, setKathaData] = useState<any>("N/A");
  const [getSaleSeedData, setSaleSeedData] = useState<any>("N/A");
  const [getPropertyTaxData, setPropertyTaxData] = useState<any>("N/A");
  const [getOccupancyCertificateData, setOccupancyCertificateData] =
    useState<any>("N/A");
  const [getOwerShowData, setOwerShowData] = useState<any>("N/A");
  const [getOwnerAvalibilityData, setOwnerAvalibilityData] =
    useState<any>("N/A");

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
    if (user === null) {
      navigate("/");
    } else {
      const uid = user.uid;

      if (ImageFile.length == 0) {
        // alert("Please upload an image first!");

        setShowAnimation(false);
        setTimeout(() => {
          setShowLocationSlide(false);
          setGetImageContainer(false);
          setShowAdditionInfoSlide(true);
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
              setPercent(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setShowAnimation(false);
              setTimeout(() => {
                setGetImageContainer(false);
                setShowAdditionInfoSlide(true);
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
        const docRef = await addDoc(collection(db, "PropertyData"), {
          uid: uid,
          images: {
            img1: File[0],
            img2: File[1],
            img3: File[2],
            img4: File[3],
            img5: File[4],
          },
          ApartmentType: getApartmentTypeData.value,
          PropertyName: getPropertyNameData,
          BuildUpArea: getBuildUpAreaData,
          CarpetArea: getCarpetAreaData,
          BHK: getBHKData.value,
          Facing: getFacingData.value,
          PropertyAge: getPropertyAgeData.value,
          AvalibleData: getAvalibleFrom,
          Floor: getFloor,
          TotalFloor: getTotalFloor,
          Prices: getPrices,
          MaintenanceCost: getMaintenance,
          Negotiable: getPricesnegotiable.value,
          Furnishing: getFurnishing.value,
          Parking: getParking.value,
          Description: getDescription,
          WaterSupply: getWater.value,
          Power: getPower.value,
          Security: getSecurity.value,
          uniqueId: getUniqueid,
          City: getcityData,
          Locality: getLocalityData,
          Address: getAddressData,
          ContactNumber: getContentData,
          KhataType: getKathaData.value,
          SaleSeed: getSaleSeedData.value,
          PropertyTax: getPropertyTaxData.value,
          OccupancyCertificate: getOccupancyCertificateData.value,
          OwerShow: getOwerShowData.value,
          OwnerAvalibility: getOwnerAvalibilityData.value,
          Amenities: {
            ClubHouse: getClubhouse,
            Gym: getGym,
            PlayGround: getplayground,
            Gas: getGas,
            OpenGym: getOpenGym,
            Lift: getLift,
            SewageSystem: getSewageSystem,
            FireAlarm: getFireAlarm,
            Park: getPark,
            ShoppingCentre: getShoppingCentre,
            InterCom: getInterCom,
            SwimmingPool: getSwimmingPool,
            VisitorsParking: getVisitorsParking,
          },
        });
        alert("Upload Successful  id : " + docRef.id);
        navigate("/DisplayProperty");
      } catch (e) {
        console.error("Error adding document: ", e);
        navigate("/DisplayProperty");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      navigate("/DisplayProperty");
    }
  };

  const HandlePropertyDetailsSlide = () => {
      setShowAnimation(false);
    setTimeout(() => {
      setShowPropertyDetailsSlide(false);
      setShowSaleDetailsSlide(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleSalesDetailsSlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowAmenitiesSlide(true);
      setShowSaleDetailsSlide(false);
      setShowAnimation(true);
    }, 400);
  };

  const HandleAmenitiesSlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowAmenitiesSlide(false);
      setShowLocationSlide(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleLocationDetailsSlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowLocationSlide(false);
      setGetImageContainer(true);
      setShowAnimation(true);
    }, 400);
  };

  const handleAdditionalInfoSlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setGetImageContainer(false);
      setShowAdditionInfoSlide(false);
      setShowYourAvailabilitySlide(true);
      setShowAnimation(true);
    }, 400);
  };

  const HandelOwnerAvalibitilySlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setShowYourAvailabilitySlide(false);
      HandelSubmitBtn();
      setShowAnimation(true);
    }, 400);
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

  const HandleMaintenance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenanceData(event.target.value);
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

  const HandelAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData(event.target.value);
  };

  const handleContantData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentData(event.target.value);
  };

  const HandleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityData(event.target.value);
  };

  const HandelLocality = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalityData(event.target.value);
  };

  const ApartmentType = [
    { value: "Flats", label: "Flats" },
    { value: "Gated community Villa", label: "Gated community Villa" },
    { value: "Independent Houses/Villa", label: "Independent Houses/Villa" },
    { value: "Stand Alone Building", label: "Stand Alone Building" },
  ];

  const BHKType = [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "4 BHK Plus", label: "4 BHK Plus" },
  ];

  const FacingDirection = [
    { value: "North", label: "North" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "South", label: "South" },
    { value: "North-East", label: "North-East" },
    { value: "North-West", label: "North-West" },
    { value: "South-West", label: "South-West" },
    { value: "South-East", label: "South-East" },
    { value: "I Don't Facing", label: "I Don't Facing" },
  ];

  const PropertyAge = [
    { value: "Under Construction", label: "Under Construction" },
    { value: "Less than a year", label: "Less than a year" },
    { value: "1-3 years", label: "1-3 years" },
    { value: "3-6 years", label: "3-6 years" },
    { value: "7-10 years", label: "7-10 years" },
    { value: "More than 10 years", label: "More than 10 years" },
  ];

  const Negotiable = [
    { value: "Negotiable", label: "Negotiable" },
    { value: "Not", label: "Not" },
  ];

  const FurnishingType = [
    { value: "Unfurnished", label: "Unfurnished" },
    { value: "Semi-furnished", label: "Semi-furnished" },
    { value: "Fully furnished", label: "Fully furnished" },
  ];

  const ParkingType = [
    { value: "Open car parking", label: "Open car parking" },
    { value: "Covered car parking", label: "Covered car parking" },
    { value: "No car parking", label: "No car parking" },
  ];

  const WaterSupply = [
    { value: "Borewell", label: "Borewell" },
    { value: "Cooperation", label: "Cooperation" },
    {
      value: "Both Borewell and Cooperation",
      label: "Both Borewell and Cooperation",
    },
  ];

  const PowerSupply = [
    { value: "Partially", label: "Partially" },
    { value: "Full", label: "Full" },
    { value: "None", label: "None" },
  ];

  const Security = [
    { value: "CCTV", label: "CCTV" },
    { value: "Guards", label: "Guards" },
    { value: "Both CCTV & Guards", label: "Both CCTV & Guards" },
    { value: "None", label: "None" },
  ];

  const KhataType = [
    { value: "A Khata", label: "A Khata" },
    { value: "B Khata", label: "B Khata" },
    { value: "E Khata", label: "E Khata" },
    { value: "Punchayat khata", label: "Punchayat khata" },
    { value: "DC conversion", label: "DC conversion" },
  ];

  const SeedType = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const PropertyTaxType = [
    { value: "Upto data", label: "Upto data" },
    { value: "No", label: "No" },
  ];

  const OwnerShowType = [
    { value: "I will show the property", label: "I will show the property" },
    { value: "I Want Taj staff to show", label: "I Want Taj staff to show" },
  ];

  const OwnerAvalibilyType = [
    { value: "Everyday (mon-sun)", label: "Everyday (mon-sun)" },
    { value: "Weekdays (mon-fri)", label: "Weekdays (mon-fri)" },
    {
      value: "Weekends (Saturday-sunday)",
      label: "Weekends (Saturday-sunday)",
    },
  ];

  return (
    <BaseContainer>
      {showPropertyDetailsSlide && (
        <CardContainer marginTop="3em" AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainer> Property Type* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getApartmentTypeData}
              onChange={setGetApartmentTypeData}
              options={ApartmentType}
              placeholder="ApartmentType"
              isSearchable
            />

            <LabelContainer> Apartment Society / Project Name* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "LG"'
              onChange={handlePropertyName}
            />

            <LabelContainer> BHK Type* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getBHKData}
              onChange={setShowBHKData}
              options={BHKType}
              placeholder="BHK Type"
              isSearchable
            />

            <LabelContainer> Super Built up area* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "1200 sqft"'
              onChange={handleBuildUpArea}
            />

            <LabelContainer> Carpet area* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "7000 sqft"'
              onChange={handleCarpetArea}
            />
          </CardColContainer>
          <CardColContainer>
            <LabelContainer> Facing* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getFacingData}
              onChange={setShowFacingData}
              options={FacingDirection}
              placeholder="Facing Direction"
              isSearchable
            />

            <LabelContainer> Property Age* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getPropertyAgeData}
              onChange={setShowFPropertyAgeData}
              options={PropertyAge}
              placeholder="Property Age"
              isSearchable
            />

            <LabelContainer> Floor* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "5th"'
              onChange={handleFloorData}
            />

            <LabelContainer> Total Floor* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "10"'
              onChange={handleTotalFloorData}
            />

            <LabelContainer> Available from : </LabelContainer>
            <InputNameContainer
              type="date"
              placeholder='eg : "Godrej"'
              onChange={handleAvalibleFromData}
            />
          </CardColContainer>

          { 
          getApartmentTypeData.value !== "N/A" && 
          getBHKData.value !== "N/A"  && 
          getPropertyAgeData.value!== "N/A" && 
          getFacingData.value !== "N/A"  && 
          (getAvalibleFrom !== "") &&
          (getTotalFloor !== "") &&
          (getFloor !== "") &&
          (getCarpetAreaData !== "") &&
          (getBuildUpAreaData !== "") &&

          <BtnBaseContainer>
            <SubmitButton onClick={HandlePropertyDetailsSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>
          }
        </CardContainer>
      )}

      {showSaleDetailsSlide && (
        <CardContainer marginTop="3em" AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainer> Expected price : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "87 lacks"'
              onChange={HandlePrices}
            />

            <LabelContainer> Monthly Maintenance : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "2k"'
              onChange={HandleMaintenance}
            />

            <LabelContainer> Furnishing* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getFurnishing}
              onChange={setFurnishingeData}
              options={FurnishingType}
              placeholder="Furnishing Type"
              isSearchable
            />

            <LabelContainer> Parking* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getParking}
              onChange={setParkingData}
              options={ParkingType}
              placeholder="Parking Type"
              isSearchable
            />
          </CardColContainer>
          <CardColContainer>
            <LabelContainer> Negotiable / Not* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getPricesnegotiable}
              onChange={setPricesnegotiableData}
              options={Negotiable}
              placeholder="Negotiable/Not"
            />

            <LabelContainer> Property Description* </LabelContainer>
            <InputReviewContainer
              onChange={(e: any) => HandelReview(e)}
              placeholder="Write the about the project / property"
            />
          </CardColContainer>

          <BtnBaseContainer>
            <SubmitButton onClick={handleSalesDetailsSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>
        </CardContainer>
      )}

      {showAmenitiesSlide && (
        <CardContainer marginTop="2em" AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainer> Water Supply* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getWater}
              onChange={setWaterData}
              options={WaterSupply}
              placeholder="water supply"
              isSearchable
            />

            <LabelContainer> Power Supply* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getPower}
              onChange={setPowerData}
              options={PowerSupply}
              placeholder="Power supply"
              isSearchable
            />

            <LabelContainer> Amenities* </LabelContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                value=" Club house"
                onChange={HandleClubHouse}
              />
              <LabelContainerForCheckBox>
                {" "}
                Club house{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="Gym"
                onChange={HandleGym}
              />
              <LabelContainerForCheckBox> Gym </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="playground"
                onChange={HandlePlayground}
              />
              <LabelContainerForCheckBox>
                {" "}
                playground{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="Gas"
                onChange={HandleGas}
              />
              <LabelContainerForCheckBox> Gas </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="park"
                onChange={HandlePark}
              />
              <LabelContainerForCheckBox> park </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="Shopping centre"
                onChange={HandleShopping}
              />
              <LabelContainerForCheckBox>
                {" "}
                shopping centre{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>
          </CardColContainer>
          <CardColContainer>
            <LabelContainer> Security* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getSecurity}
              onChange={setSecurityData}
              options={Security}
              placeholder="Security"
              isSearchable
            />

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="open gym "
                onChange={HandleOpenGym}
              />
              <LabelContainerForCheckBox> open gym </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="Lift"
                onChange={HandkeLift}
              />
              <LabelContainerForCheckBox> Lift </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="sewage system "
                onChange={HandleSewage}
              />
              <LabelContainerForCheckBox>
                sewage system{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="fire alarm "
                onChange={HandleFireAlarm}
              />
              <LabelContainerForCheckBox>
                {" "}
                fire alarm{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="inter com "
                onChange={HandleInterCom}
              />
              <LabelContainerForCheckBox> inter com </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="swimming pool"
                onChange={HandleSwimming}
              />
              <LabelContainerForCheckBox>
                {" "}
                swimming pool{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>

            <CheckBoxContainer>
              <InputCheckContainer
                type="checkbox"
                name="ApartmentType"
                value="visitors parking"
                onChange={HandleVisitor}
              />
              <LabelContainerForCheckBox>
                {" "}
                visitors parking{" "}
              </LabelContainerForCheckBox>
            </CheckBoxContainer>
            <BtnBaseContainer>
              <SubmitButton marginTop="2em" onClick={HandleAmenitiesSlide}>
                {" "}
                Next &gt;
              </SubmitButton>
            </BtnBaseContainer>
          </CardColContainer>
        </CardContainer>
      )}

      {showLocationSlide && (
        <CardContainer AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainer> City* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "Bangalore"'
              onChange={HandleCity}
            />

            <LabelContainer> Locality* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "India"'
              onChange={HandelLocality}
            />

            <LabelContainer> Landmark/street* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "#44 Cube square homes"'
              onChange={(e: any) => HandelAddress(e)}
            />

            <LabelContainer> Contact Number* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder="Enter the Contact Number"
              onChange={handleContantData}
            />
          </CardColContainer>
          <BtnBaseContainer>
            <SubmitButton onClick={handleLocationDetailsSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>
        </CardContainer>
      )}

      {getImageContainer && (
        <CardContainer AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainerOnImages>
              {" "}
              Please upload Property Images{" "}
            </LabelContainerOnImages>
            {percent}
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

      {showAdditionInfoSlide && (
        <CardContainer AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainer> khata Certificate type* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getKathaData}
              onChange={setKathaData}
              options={KhataType}
              placeholder="Khata Type"
              isSearchable
            />

            <LabelContainer> Sale Seed* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getSaleSeedData}
              onChange={setSaleSeedData}
              options={SeedType}
              placeholder="Sale Seed"
              isSearchable
            />

            <LabelContainer> Property tax* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getPropertyTaxData}
              onChange={setPropertyTaxData}
              options={PropertyTaxType}
              placeholder="Sale Seed"
              isSearchable
            />

            <LabelContainer> Occupancy Certificate* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getOccupancyCertificateData}
              onChange={setOccupancyCertificateData}
              options={SeedType}
              placeholder="occupancy certificate"
              isSearchable
            />
          </CardColContainer>
          <BtnBaseContainer>
            <SubmitButton onClick={handleAdditionalInfoSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>
        </CardContainer>
      )}

      {showYourAvailabilitySlide && (
        <CardContainer AnimationStart={showAnimation}>
          <CardColContainer>
            <LabelContainer> Who will show the property* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getOwerShowData}
              onChange={setOwerShowData}
              options={OwnerShowType}
              placeholder="Who will show the property"
              isSearchable
            />
            <br />

            {getOwerShowData.value === "I will show the property" && (
              <div>
                <LabelContainer> Availability* </LabelContainer>

                <Select
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      padding: "5px",
                      width: "20em",
                    }),
                  }}
                  defaultValue={getOwnerAvalibilityData}
                  onChange={setOwnerAvalibilityData}
                  options={OwnerAvalibilyType}
                  placeholder="Availability"
                  isSearchable
                />
              </div>
            )}
          </CardColContainer>
          <BtnBaseContainer>
            <SubmitButton onClick={HandelOwnerAvalibitilySlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>
        </CardContainer>
      )}
    </BaseContainer>
  );
}
