"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createPost, deletePostPermanently, getAllPosts, getSinglePost, getUserAllPosts, toggleDownVote, toggleUpVote, TToggleVote, TUpdateData, updateSinglePost } from "../services/post"
import { IQueryOptions } from "../types"

interface IUploadOptions {
    onSuccess: (urls: string[]) => void;
    onError: (error: Error) => void;
}

export const useGetAllPosts = (queryOptions: IQueryOptions) => {

    return useQuery({
        queryKey: ["GET_ALL_POST", queryOptions.searchTerm, queryOptions.sortBy, queryOptions.page],
        queryFn: async () => await getAllPosts(queryOptions),
        staleTime: 200,
    })
}

export const useGetUserAllPosts = (queryOptions: IQueryOptions, userId: string | undefined) => {
    return useQuery({
        queryKey: ["GET_USER_ALL_POST", queryOptions],
        queryFn: async () => await getUserAllPosts(queryOptions, userId as string),
    })
}

export const useGetSinglePostsById = (queryOptions: IQueryOptions, userId: string | undefined) => {
    return useQuery({
        queryKey: ["GET_SINGLE_POST_BY_ID", queryOptions],
        queryFn: async () => await getSinglePost(queryOptions, userId as string),
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

export const useUpdatePost = (userId: string) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, Error, TUpdateData>({
        mutationKey: ["UPDATE_POST"],
        mutationFn: async (updateData) => await updateSinglePost(updateData, userId),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["GET_ALL_POST"]);
            router.push("/");
            toast.success("Post updated successfully");
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
            toast.success("Up vote change successfull");
            // @ts-ignore
            queryClient.invalidateQueries({ queryKey: ["GET_ALL_POST"], exact: true });
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
            toast.success("Down vote change successfull");
            // @ts-ignore
            queryClient.invalidateQueries(["GET_ALL_POST"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}


export const useDeletePostPermanantly = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationKey: ["POST"],
        mutationFn: async (postId) => await deletePostPermanently(postId),
        onSuccess: () => {
            toast.success("Post deleted successfull");
            // @ts-ignore
            queryClient.invalidateQueries(["GET_ALL_POST"]);
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
