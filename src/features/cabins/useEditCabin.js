import toast from "react-hot-toast";
import { CreateEditCabin as CreateCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { reset } = useForm();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => CreateCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
