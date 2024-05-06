import { useQuery } from "@tanstack/react-query"
import { fetchPickUpLocation } from "../../services/locationService"

export const useSearchPickup=(pickUpInputValue:string)=>{
    return useQuery({
        queryKey:["pickupLocation"],
        queryFn:()=>fetchPickUpLocation(pickUpInputValue),
        enabled:!!pickUpInputValue,
    })
}