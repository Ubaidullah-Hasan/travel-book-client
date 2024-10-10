"use client"
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { changePassword, forgotPassword, login, registerUser, resetPassword } from "../services/authService";

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

export const usePasswordChange = () => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PASSWORD_CHANGE"],
        mutationFn: async (passInfo) => await changePassword(passInfo),
        onSuccess: () => {
            toast.success("Password change successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const usePasswordForgot = () => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PASSWORD_FORGOT"],
        mutationFn: async (email) => await forgotPassword(email),
        onSuccess: () => {
            toast.success("Check your email to reset password!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export const usePasswordReset = () => {

    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PASSWORD_RESET"],
        mutationFn: async (data) => await resetPassword(data.password, data.token),
        onSuccess: () => {
            toast.success("Successfully reset your password!", {
                position: "top-center"
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}