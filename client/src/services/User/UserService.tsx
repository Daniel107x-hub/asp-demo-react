import { RegistrationRequest, User } from "../../types";
import { splitApi } from "../SplitApi";

export const userApi = splitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, {email: string, password: string}>({
            query: ({email, password}) => ({
                url: 'account/login',
                method: 'POST',
                body: { email, password },
                params: {
                    useCookies: true,
                    useSessionCookies: true
                }
            })
        }),
        register: builder.mutation<User, RegistrationRequest>({
            query: (request:RegistrationRequest) => ({
                url: 'account/register',
                method: 'POST',
                body: request
            })
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: 'account/user',
                method: 'GET',
            })    
        }),
        logout: builder.mutation<User, void>({
            query: () => ({
                url: 'account/logout',
                method: 'POST',
                body: {}
            })
        })
    })
})

export const { 
    useLoginMutation,
    useLogoutMutation,
    useGetUserQuery, 
    useRegisterMutation 
} = userApi;