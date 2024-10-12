"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createPost, getAllPosts, getUserAllPosts, toggleDownVote, toggleUpVote, TToggleVote } from "../services/post"
import { IQueryOptions } from "../types"

interface IUploadOptions {
    onSuccess: (urls: string[]) => void;
    onError: (error: Error) => void;
}

export const useGetAllPosts = (queryOptions: IQueryOptions) => {
    return useQuery({
        queryKey: ["POST", queryOptions],
        queryFn: async () => await getAllPosts(queryOptions),
    })
}

export const useGetUserAllPosts = (queryOptions: IQueryOptions, userId: string | undefined) => {
    return useQuery({
        queryKey: ["POST", queryOptions],
        queryFn: async () => await getUserAllPosts(queryOptions, userId as string),
    })
}

export const useCreatePosts = () => {
    const router = useRouter();
    // console.log({ hi: envConfig.img_bb_key }) // todo

    return useMutation<any, Error, FormData>({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (postData) => await createPost(postData),
        onSuccess: () => {
            router.push("/");
            toast.success("Post created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}


export const useTogglePostUpVote = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, TToggleVote>({
        mutationKey: ["POST"],
        mutationFn: async (info) => await toggleUpVote(info),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["POST"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useTogglePostDownVote = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, TToggleVote>({
        mutationKey: ["POST"],
        mutationFn: async (info) => await toggleDownVote(info),
        onSuccess: () => {
            toast.success("Down vote successfull");
            // @ts-ignore
            queryClient.invalidateQueries(["POST"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}





// Upload Multiple Images
export const uploadImages = async (imageFiles: File[], { onSuccess, onError }: IUploadOptions) => {
    const apiKey = '21cddba9e429154e3c42d3c011ea0762';

    const promises = imageFiles.map(async (imageFile: any) => {
        const formData = new FormData();

        formData.append('image', imageFile);
        formData.append('key', apiKey);

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error);
        }

        return data.data.url;
    });

    try {
        const urls = await Promise.all(promises);

        if (onSuccess) {
            onSuccess(urls);
        }
    } catch (error) {
        if (onError) {
            onError(error as any);
        }
    }
};
