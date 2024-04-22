import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateEditCabin as CreateCabinApi } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

export function useCreateCabin() {
  const { reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: CreateCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
