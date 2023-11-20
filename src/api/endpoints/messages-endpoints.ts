import { apiSlice } from "../../store/slices/api-slice";
import { IMessage, IUser } from "../interfaces";

type SentMessageType = {
    inuserid:number;
    touserid:number;
    message:string;
    date:Date;
}

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetSentMessages: builder.query<{ messages: IMessage[]; totalCount: number }, { userid:  number;limit?: number; page?: number }>({
            query: ({ limit, page, userid }) => {
                const limitProps = limit ? `&_limit=${limit}` : '';
                const pageProps = page ? `&_page=${page}` : '';
                const userIdProps = `&_inuserid=${userid}`
                return `messages?${limitProps}${pageProps}${userIdProps}`;
            },
            transformResponse(response: IMessage[], meta) {
                return {
                    messages: response,
                    totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
                };
            },
            providesTags: result => ['Messages']
        }),
        GetReceivedMessages: builder.query<{ messages: IMessage[]; totalCount: number }, { userid:  number;limit?: number; page?: number }>({
            query: ({ limit, page, userid }) => {
                const limitProps = limit ? `&_limit=${limit}` : '';
                const pageProps = page ? `&_page=${page}` : '';
                const userIdProps = `&_touserid=${userid}`
                return `messages?${limitProps}${pageProps}${userIdProps}`;
            },
            transformResponse(response: IMessage[], meta) {
                return {
                    messages: response,
                    totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
                };
            },
            providesTags: result => ['Messages']
        }),
        CreateUser: builder.mutation<IUser, SentMessageType>({
            query: (newMessage) => ({
                url: '/messages',
                method: 'POST',
                body: newMessage,
            }),
            invalidatesTags: ['Messages']
        })
    })
})