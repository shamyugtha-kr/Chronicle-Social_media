import { 
    useQuery, 
    useMutation, 
    useQueryClient, 
    useInfiniteQuery 
} from "@tanstack/react-query";
import { createPost, createUserAccount, getRecentPosts, SignInAccount, SignOutAccount } from "../appWrite/api";
import { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateNewAccount = () => {
    return useMutation({
        mutationFn : (user : INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn : (user : {
            email:string;
            password: string;
        }) => SignInAccount(user),
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn : () => SignOutAccount()
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}