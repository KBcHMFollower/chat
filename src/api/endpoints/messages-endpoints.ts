import { apiSlice } from "../../store/slices/api-slice";
import { IMessage, IUser } from "../interfaces";

export type SentMessageType = {
    inuserid:number;
    touserid:number;
    message:string;
    date:Date;
}

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetSentMessages: builder.query<{ messages: IMessage[]; totalCount: number }, { userid:  number;limit?: number; page?: number }>({
            query: ({ limit, page, userid }) => {
                const limitProps = limit ? `&_limit=${limit}` : '';
                const pageProps = page ? `&_page=${page}` : '';
                const userIdProps = `&inuserid=${userid}`
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
                const userIdProps = `&touserid=${userid}`
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
        SentMessage: builder.mutation<IMessage, SentMessageType>({
            query: (newMessage) => ({
                url: '/messages',
                method: 'POST',
                body: newMessage,
            }),
            invalidatesTags: ['Messages']
        })
    })
})