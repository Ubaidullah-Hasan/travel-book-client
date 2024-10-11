"use client"
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { updateUserProfile } from "../services/userServices";

export const useUpdateProfile = (userEmail:string) => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PROFILE_UPDATE"],
        mutationFn: async (data) => await updateUserProfile(data, userEmail),
        onSuccess: () => {
            toast.success("Successfully updated your profile!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}