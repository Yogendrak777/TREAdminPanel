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
  const [getPrices, setPricesData] = useState<any>("N/A");
  const [getMaintenance, setMaintenanceData] = useState<any>("");
  const [getPricesnegotiable, setPricesnegotiableData] = useState<any>("N/A");
  const [getEmiData, setEmiData] = useState<any>("N/A");
  const [getBuyOrRentData, setBuyOrRentData] = useState<any>("N/A");
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
  const [getstreetData, setStreetData] = useState<any>("");
  const [getKathaData, setKathaData] = useState<any>("N/A");
  const [getSaleSeedData, setSaleSeedData] = useState<any>("N/A");
  const [getPropertyTaxData, setPropertyTaxData] = useState<any>("N/A");
  const [getAdvanceData, setAdvanceData] = useState<any>("N/A");
  const [getEmiInputData, setEmiInputData] = useState<any>("N/A");
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

      if (ImageFile.length < 4) {
        alert("Please upload the images");
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
                setTimeout(() => {
                  setShowAnimation(false);
                  setTimeout(() => {
                    setGetImageContainer(false);
                    setShowAdditionInfoSlide(true);
                    setShowAnimation(true);
                    setUniqueId("id" + Math.random().toString(36).slice(2));
                  }, 400);
                }, 1000);
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
          Prices: getPrices.value,
          Advance: getAdvanceData,
          MaintenanceCost: getMaintenance,
          BuyOrRent : getBuyOrRentData,
          Negotiable: getPricesnegotiable.value,
          Furnishing: getFurnishing.value,
          EmiAmount : getEmiInputData,
          Emi : getEmiData,
          Parking: getParking.value,
          Description: getDescription,
          WaterSupply: getWater.value,
          Power: getPower.value,
          Security: getSecurity.value,
          uniqueId: getUniqueid,
          City: getcityData.value,
          Locality: getstreetData,
          Address: getAddressData,
          ContactNumber: getContentData,
          KhataType: getKathaData.value,
          SaleSeed: getSaleSeedData.value,
          PropertyTax: getPropertyTaxData.value,
          OccupancyCertificate: getOccupancyCertificateData.value,
          OwerShow: getOwerShowData.value,
          OwnerAvalibility: getOwnerAvalibilityData,
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
        alert("Error adding document: " + e);
      }
    } catch (e) {
      alert("Error adding document: "+ e);
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
    HandelSubmitBtn();
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

  const HandleAdvance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdvanceData(event.target.value);
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

  const HandleEmi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmiInputData(event.target.value);
  };

  const HandelLocality = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreetData(event.target.value);
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

  const EmiOption = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
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

  const CityOptions = [
    { value: "Jayanagar", label: "Jayanagar" },
    { value: "Indira Nagar", label: "Indira Nagar" },
    { value: "Ashok Nagar", label: "Ashok Nagar" },
    { value: "Koramangala", label: "Koramangala" },
    { value: "Whitefield", label: "Whitefield" },
    { value: "Marathahalli", label: "Marathahalli" },
    { value: "BTM Layout", label: "BTM Layout" },
    { value: "Vijaya Nagar", label: "Vijaya Nagar" },
    { value: "JP Nagar", label: "JP Nagar" },
    { value: "HSR Layout", label: "HSR Layout" },
    { value: "Malleshwaram", label: "Malleshwaram" },
    { value: "Bannerghatta Road", label: "Bannerghatta Road" },
    { value: "Kaggadasapura", label: "Kaggadasapura" },
    { value: "Basavanagudi", label: "Basavanagudi" },
    { value: "Banashankari", label: "Banashankari" },
    { value: "Bellandur", label: "Bellandur" },
    { value: "T Dasarahalli", label: "T Dasarahalli" },
    { value: "Brookefield", label: "Brookefield" },
    { value: "Yelahanka", label: "Yelahanka" },
    { value: "Sarjapur Road", label: "Sarjapur Road" },
    { value: "Sadashiva Nagar", label: "Sadashiva Nagar" },
    { value: "Kalyan Nagar", label: "Kalyan Nagar" },
    { value: "KR Puram", label: "KR Puram" },
    { value: "Hebbal", label: "Hebbal" },
    { value: "Bilekahalli", label: "Bilekahalli" },
    { value: "Vidyaranyapura", label: "Vidyaranyapura" },
    { value: "Hosur Road", label: "Hosur Road" },
    { value: "Ramamurthy Nagar", label: "Ramamurthy Nagar" },
    { value: "Domlur", label: "Domlur" },
    { value: "HeShivaji Nagarbbal", label: "Shivaji Nagar" },
    { value: "Arekere", label: "Arekere" },
    { value: "Sanjay Nagar", label: "Sanjay Nagar" },
    { value: "Bagalakunte", label: "Bagalakunte" },
    { value: "New Thippasandra", label: "New Thippasandra" },
    { value: "Banaswadi", label: "Banaswadi" },
    { value: "Vasanth Nagar", label: "Vasanth Nagar" },
    { value: "CV Raman Nagar", label: "CV Raman Nagar" },
    { value: "Frazer Town", label: "Frazer Town" },
    { value: "Bommanahalli", label: "Bommanahalli" },
    { value: "Sahakara Nagar", label: "Sahakara Nagar" },
    { value: "Kumaraswamy Layout", label: "Kumaraswamy Layout" },
    { value: "Yelahanka New Town", label: "Yelahanka New Town" },
    { value: "Seshadripuram", label: "Seshadripuram" },
    { value: "Sadduguntepalya", label: "Sadduguntepalya" },
    { value: "Padmanabha Nagar", label: "Padmanabha Nagar" },
    { value: "Yeshwanthpur", label: "Yeshwanthpur" },
    { value: "Wilson Garden", label: "Wilson Garden" },
    { value: "Kengeri Satellite Town", label: "Kengeri Satellite Town" },
    { value: "Mathikere", label: "Mathikere" },
    { value: "Attiguppe", label: "Attiguppe" },
    { value: "Hongasandra", label: "Hongasandra" },
    { value: "Mahadevapura", label: "Mahadevapura" },
    { value: "Doddanekkundi", label: "Doddanekkundi" },
    { value: "Murugesh Palya", label: "Murugesh Palya" },
    { value: "Ejipura", label: "Ejipura" },
    { value: "Raja Rajeshwari Nagar", label: "Raja Rajeshwari Nagar" },
    { value: "Hulimavu", label: "Hulimavu" },
    { value: "Gandhi Nagar", label: "Gandhi Nagar" },
    { value: "Adugodi", label: "Adugodi" },
    { value: "Kodihalli", label: "Kodihalli" },
    { value: "Bennigana Halli", label: "Bennigana Halli" },
    { value: "Gottigere", label: "Gottigere" },
    { value: "Chamarajpet", label: "Chamarajpet" },
    { value: "Jalahalli West", label: "Jalahalli West" },
    { value: "Uttarahalli", label: "Uttarahalli" },
    { value: "Nagavara", label: "Nagavara" },
    { value: "Panduranga Nagar", label: "Panduranga Nagar" },
    { value: "Sudhama Nagar", label: "Sudhama Nagar" },
    { value: "Bidrahalli", label: "Bidrahalli" },
    { value: "Sampangi Rama Nagar", label: "Sampangi Rama Nagar" },
    { value: "Jalahalli East", label: "Jalahalli East" },
    { value: "Chickpet", label: "Chickpet" },
    { value: "Ganga Nagar", label: "Ganga Nagar" },
    { value: "Hoodi", label: "Hoodi" },
    { value: "RT Nagar", label: "RT Nagar" },
    { value: "HBR Layout", label: "HBR Layout" },
    { value: "Harlur", label: "Harlur" },
    { value: "Sunkadakatte", label: "Sunkadakatte" },
    { value: "Kadubeesanahalli", label: "Kadubeesanahalli" },
    { value: "Jayamahal", label: "Jayamahal" },
    { value: "Begur", label: "Begur" },
    { value: "Jeevanbheema Nagar", label: "Jeevanbheema Nagar" },
    { value: "Nandini Layout", label: "Nandini Layout" },
    { value: "RMV 2nd Stage", label: "RMV 2nd Stage" },
    { value: "Shanthi Nagar", label: "Shanthi Nagar" },
    { value: "Maruthi Sevanagar", label: "Maruthi Sevanagar" },
    {
      value: "Ragavendra Nagar-Sunkadakatte",
      label: "Ragavendra Nagar-Sunkadakatte",
    },
    { value: "Kempegowda Nagar", label: "Kempegowda Nagar" },
    { value: "Kanakapura Road", label: "Kanakapura Road" },
    { value: "Bannerghatta", label: "Bannerghatta" },
    { value: "Kamala Nagar", label: "Kamala Nagar" },
    { value: "Richmond Town", label: "Richmond Town" },
    { value: "Chikkalasandra", label: "Chikkalasandra" },
    { value: "Kalena Agrahara", label: "Kalena Agrahara" },
    { value: "Bidadi", label: "Bidadi" },
    { value: "Kasavanahalli", label: "Kasavanahalli" },
    { value: "Kadugodi", label: "Kadugodi" },
    { value: "Varthur", label: "Varthur" },
  ];

  const BuyOrRent = [
    { value: "Sell", label: "Sell" },
    { value: "Rent", label: "Rent" },
    { value: "lease", label: "Lease" },
  ]

  const BuggetType = [
    { value: "1 to 5", label: "1 to 5 lacks" },
    { value: "6 to 10", label: "6 to 10 lacks" },
    { value: "11 to 15", label: "11 to 15 lacks" },
    { value: "16 to 20", label: "16 to 20 lacks" },
    { value: "21 to 25", label: "21 to 25 lacks" },
    { value: "26 to 30", label: "26 to 30 lacks" },
    { value: "31 to 35", label: "31 to 35 lacks" },
    { value: "36 to 40", label: "36 to 40 lacks" },
    { value: "41 to 45", label: "41 to 45 lacks" },
    { value: "46 to 50", label: "46 to 50 lacks" },
    { value: "51 to 55", label: "51 to 55 lacks" },
    { value: "56 to 60", label: "56 to 60 lacks" },
    { value: "61 to 65", label: "61 to 65 lacks" },
    { value: "66 to 70", label: "66 to 70 lacks" },
    { value: "71 to 75", label: "71 to 75 lacks" },
    { value: "76 to 80", label: "76 to 80 lacks" },
    { value: "81 to 85", label: "81 to 85 lacks" },
    { value: "86 to 90", label: "86 to 90 lacks" },
    { value: "91 to 95", label: "91 to 95 lacks" },
    { value: "96 to 100", label: "96 lacks to 1 Cr " },
    { value: "101", label: "1 Cr to 1.20 Cr" },
    { value: "102", label: "1.20 Cr to 1.50 Cr" },
    { value: "103", label: "1.50 Cr to 2 Cr" },
    { value: "104", label: "2 Cr to 2.5 Cr" },
    { value: "105", label: "3 Cr to 3.5 Cr" },
    { value: "106", label: "4 Cr to 4.5 Cr" },
    { value: "107", label: "5 Cr to 5.5 Cr" },
    { value: "108", label: "6 Cr to 6.5 Cr" },
    { value: "109", label: "7 Cr to 7.5 Cr" },
    { value: "110", label: "8 Cr to 8.5 Cr" },
    { value: "111", label: "10+ Cr" },
  ]

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
          getApartmentTypeData !== "N/A" && 
          getBHKData !== "N/A"  && 
          getPropertyAgeData !== "N/A" && 
          getFacingData !== "N/A"  && 
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
      
          <LabelContainer> Bugget Range* </LabelContainer>
          <Select
             styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                padding: "3px",
                fontStyle: "italic",
              }),
            }}
              defaultValue={getPrices}
              onChange={setPricesData}
              options={BuggetType}
              placeholder="Bugget Range"
            />
             <LabelContainer> Sell/Rent/Lease* </LabelContainer>
            <Select
             styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                padding: "3px",
                fontStyle: "italic",
              }),
            }}
              defaultValue={getBuyOrRentData}
              onChange={setBuyOrRentData}
              options={BuyOrRent}
              placeholder="Bugget Range"
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
            {getBuyOrRentData.value === "Sell" &&
            <>
            <LabelContainer> Emi* </LabelContainer>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "5px",
                  width: "20em",
                }),
              }}
              defaultValue={getEmiData}
              onChange={setEmiData}
              options={EmiOption}
              placeholder="Emi Option"
            />
            {getEmiData.value === "Yes" && 
            <>  
            <LabelContainer> Monthly Emi Amount : </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "50k"'
              onChange={HandleEmi}
            />
            </>} 
            </> }
            {getBuyOrRentData.value === "Rent"  &&
             <>
             <LabelContainer> Advance* </LabelContainer>
             <InputNameContainer
              type="text"
              placeholder='eg : "40k"'
              onChange={HandleAdvance}
            />
             </> 
            }
            

            <LabelContainer> Property Description* </LabelContainer>
            <InputReviewContainer
              onChange={(e: any) => HandelReview(e)}
              placeholder="Write the about the project / property"
            />
          </CardColContainer>
            {
              getBuyOrRentData !== "N/A" &&
              getPricesnegotiable !== "N/A" &&
              getParking !== "N/A" &&
              getFurnishing !== "N/A" &&
             (getMaintenance !== "") &&
              (getPrices !== "N/A") &&
              (getDescription !== "") &&
          <BtnBaseContainer>
            <SubmitButton onClick={handleSalesDetailsSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>
            } 
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

            {
              getSecurity !== "N/A" &&
              getWater !== "N/A" &&
              getPower !== "N/A" &&

            <BtnBaseContainer>
              <SubmitButton marginTop="2em" onClick={HandleAmenitiesSlide}>
                {" "}
                Next &gt;
              </SubmitButton>
            </BtnBaseContainer> 
            }
          </CardColContainer>
        </CardContainer>
      )}

      {showLocationSlide && (
        <CardContainer AnimationStart={showAnimation}>
          <CardColContainer>
              <LabelContainer> Area* </LabelContainer>
              <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "3px",
                  fontStyle: "italic",
                }),
              }}
              defaultValue={getcityData}
              onChange={setCityData}
              options={CityOptions}
              placeholder="Search for the Area 'Whitefiled'"
              isSearchable={true}
              isClearable={true}
            />

            <LabelContainer> Street* </LabelContainer>
            <InputNameContainer
              type="text"
              placeholder='eg : "hosa road"'
              onChange={HandelLocality}
            />

            <LabelContainer> Landmark* </LabelContainer>
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

          {
            getContentData !== "" &&
            getAddressData !== "" &&
            getstreetData !== "" &&
            getcityData !== "" &&

          <BtnBaseContainer>
            <SubmitButton onClick={handleLocationDetailsSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer> }
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
              
            />
          </CardColContainer>
          
          {
            getOccupancyCertificateData !== "N/A" &&
            getPropertyTaxData !== "N/A" &&
            getSaleSeedData !== "N/A" &&
            getKathaData !== "N/A" &&
          
          <BtnBaseContainer>
            <SubmitButton onClick={handleAdditionalInfoSlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer> }
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
                  
                />
              </div>
            )}
          </CardColContainer>
          {
            getOwerShowData !== "N/A" &&
          
          <BtnBaseContainer>
            <SubmitButton onClick={HandelOwnerAvalibitilySlide}>
              {" "}
              Next &gt;
            </SubmitButton>
          </BtnBaseContainer>}
        </CardContainer>
      )}
    </BaseContainer>
  );
}
