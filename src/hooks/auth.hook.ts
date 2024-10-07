"use client"
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "../services/authService";

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_REGISTRATION"],
        mutationFn: async (userInfo) => await registerUser(userInfo),
        onSuccess: () => {
            toast.success("User registration successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};