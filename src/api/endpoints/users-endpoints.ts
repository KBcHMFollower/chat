import { apiSlice } from "../../store/slices/api-slice";
import { IUser } from "../interfaces";

type AddUserType = {
    login: string,
    pass: string,
    about: {
        fname: string;
        lname: string;
        number: string;
        description: string
    }
}

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetAllUsers: builder.query<{ clients: IUser[]; totalCount: number }, { limit?: number; page?: number }>({
            query: ({ limit, page }) => {
                const limitProps = limit ? `&_limit=${limit}` : '';
                const pageProps = page ? `&_page=${page}` : '';
                return `users?${limitProps}${pageProps}`;
            },
            transformResponse(response: IUser[], meta) {
                return {
                    clients: response,
                    totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
                };
            },
            providesTags: result => ['Users']
        }),
        GetUser: builder.query<IUser, number>({
            query: (id) => `/users/${id}`,
            providesTags: result => ['Users'] // Замените на действительный URL
        }),
        CreateUser: builder.mutation<IUser, AddUserType>({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users']
        }),
        UpdateUser: builder.mutation({
            query: ({id,stateName,data}) => ({
              url: `/users/${id}`, // Замените на свой путь обновления данных
              method: 'PATCH',
              body: {
                [stateName]:data
              },
            }),
            invalidatesTags: ['Users']
          }),
    })
})