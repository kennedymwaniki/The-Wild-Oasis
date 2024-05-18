/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
export function useCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // the queryFn needs to return a promise
    queryFn: getCabins,
  });

  return { isLoading, cabins ,error};
}
