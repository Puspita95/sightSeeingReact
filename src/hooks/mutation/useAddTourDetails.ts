import { useMutation } from "@tanstack/react-query"
import { addTourDetails } from "../../services/locationService"

export const useAddTourDetails=()=>{
    return useMutation({
        mutationFn:addTourDetails,
        onSuccess:(data)=>{
            
            return data
        },
        onError:(error)=>{
            console.log("error from useAddUserDetails hooks", error);
          throw error;
        }
    })
}