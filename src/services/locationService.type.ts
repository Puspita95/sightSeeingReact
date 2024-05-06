
export type DisplayFirstClassDetail = {
  vehicleName: string;
  vehicleClass: string;
  vehicleCategory: string;
  vehicleCode: string;
  vehicleDescription: string;
  vehicleTitle: string;
  vehicleBenefits: string;
  noOfPassengers: string;
  noOfBaggage: string;
  amount: string;
  currency: string;
  vehicleImage: string;
  logo: string;
};
export type DisplayVanDetail = {
  vanName: string;
  vanClass: string;
  vanCategory: string;
  vanCode: string;
  vanDescription: string;
  vanTitle: string;
  vanBenefits: string;
  noOfPassengers: string;
  noOfBaggage: string;
  amount: string;
  currency: string;
  vanImage: string;
  logo: string;
};
export type DisplayOffer = {
    vanList: DisplayVanDetail[];
    firstClassVehicleList:DisplayFirstClassDetail[]
  };
  
