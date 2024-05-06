import axios from "axios";
import {
  DisplayFirstClassDetail,
  DisplayOffer,
  DisplayVanDetail,
} from "./locationService.type";

export const fetchPickUpLocation = async (pickUpInputValue: string) => {
  try {
    const response = await axios.get(
      "https://www.mydriver.com/api/v5/locations/autocomplete?searchString=" +
        pickUpInputValue
    );

    return response.data;
  } catch (error) {
    console.log("error from fetchPickUpLocation", error);
    throw error;
  }
};
export const addTourDetails = async ({
  pickupLocation,
  formattedDateTime,
  duration,
}: {
  pickupLocation: string;
  formattedDateTime: string;
  duration: string;
}) => {
  try {
    const response = await axios.post(
      "https://www.mydriver.com/api/v5/offers",
      {
        originPlaceId: pickupLocation,
        selectedStartDate: formattedDateTime,
        duration: duration,
        type: "DURATION",
      }
    );
    console.log("data from addTourDetails", response.data);
    return getTourDetail(response.data);
  } catch (error) {
    console.log("error from useAddUserDetails", error);
    throw error;
  }
};
const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};
const getTourDetail = (data: any) => {
  let displayedOffer: DisplayOffer = {
    vanList: [],
    firstClassVehicleList: [],
  };
  let firstClassVehicleDetail: DisplayFirstClassDetail;
  let vanDetail: DisplayVanDetail;

  let firstClassVehicleList = data.filter(
    (item: any) => item.vehicleType.name === "FIRST_CLASS"
  );
  let vanVehicleList = data.filter(
    (item: any) => item.vehicleType.name === "BUSINESS_VAN"
  );
  firstClassVehicleList.forEach((vehicle: any) => {
     firstClassVehicleDetail = {
      vehicleName: vehicle.vehicleType.name,
      vehicleClass: vehicle.vehicleType.class,
      vehicleCategory: vehicle.vehicleType.category,
      vehicleCode: vehicle.vehicleType.code,
      vehicleDescription: vehicle.vehicleType.description,
      vehicleTitle: vehicle.vehicleType.title,
      vehicleBenefits: vehicle.vehicleType.benefits[1],
      noOfPassengers: vehicle.vehicleType.nrOfPassengers,
      noOfBaggage: vehicle.vehicleType.nrOfBaggage,
      amount: formatCurrency(vehicle.amount, vehicle.currency),
      currency: vehicle.currency,
      vehicleImage: vehicle.vehicleType.images.x1,
      logo: vehicle.vehicleType.logo.x1,
    };
    // displayOffer.firstClassVehicleDetails.shift();
    displayedOffer.firstClassVehicleList.push(firstClassVehicleDetail);
  });
  vanVehicleList.forEach((vehicle: any) => {
     vanDetail = {
      vanName: vehicle.vehicleType.name,
      vanClass: vehicle.vehicleType.class,
      vanCategory: vehicle.vehicleType.category,
      vanCode: vehicle.vehicleType.code,
      vanDescription: vehicle.vehicleType.description,
      vanTitle: vehicle.vehicleType.title,
      vanBenefits: vehicle.vehicleType.benefits[1],
      noOfPassengers: vehicle.vehicleType.nrOfPassengers,
      noOfBaggage: vehicle.vehicleType.nrOfBaggage,
      amount: formatCurrency(vehicle.amount, vehicle.currency),
      currency: vehicle.currency,
      vanImage: vehicle.vehicleType.images.x1,
      logo: vehicle.vehicleType.logo.x1,
    };
    displayedOffer.vanList.push(vanDetail);
  });
  // console.log("displayedOffer", displayedOffer);
  return displayedOffer;
};
