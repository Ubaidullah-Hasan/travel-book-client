"use client"
import React, { createContext, useContext, useState } from 'react';
import { IChildren, IQueryOptions, TPost } from '../types';
import { useGetAllPosts } from '../hooks/post.hook';

interface IInitialValue {
    posts: TPost[];
    setQueryOptions: React.Dispatch<React.SetStateAction<IQueryOptions>>;
    isLoading: boolean;
    error: any;
    queryOptions:IQueryOptions;
}

export const AllPostContext = createContext<IInitialValue | undefined>(undefined);

const AllPostProvider = ({ children }: IChildren) => {
    const [queryOptions, setQueryOptions] = useState<IQueryOptions>({
        searchTerm: "",
        sortBy: "",
        categoryId: undefined,
        page: 1,
    });

    const { data: postsResponse, isLoading, error } = useGetAllPosts(queryOptions);
    const posts = postsResponse?.result;

    const initialValue = {
        posts,
        setQueryOptions,
        isLoading,
        error,
        queryOptions,
    }

    return (

        <AllPostContext.Provider value={initialValue}>
            {children}
        </AllPostContext.Provider>

    );
};



export const useGetAllPostsFromProvider = () => {
    const context = useContext(AllPostContext);

    if (context === undefined) {
        throw new Error("Get all post provider must be used within the UserProvider context")
    }

    return context;
}

export default AllPostProvider;