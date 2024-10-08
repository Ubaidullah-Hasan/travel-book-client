"use client"
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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


export const useUserLogin =() => {
    const router = useRouter();

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async (userData) => await login(userData),
        onSuccess: () => {
            router.push("/"); 
            toast.success("User login successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};