"use client"
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { login, registerUser } from "../services/authService";

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_REGISTRATION"],
        mutationFn: async (userInfo) => await registerUser(userInfo),
        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async (userData) => await login(userData),
        onSuccess: () => {
            toast.success("User login successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};