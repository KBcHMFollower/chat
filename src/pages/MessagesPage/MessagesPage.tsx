import React, { FC, useEffect, useRef, useState } from 'react'
import { IMessage, IUser } from '../../api/interfaces'
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { stringAvatar } from '../../services/avatar-services'
import { MessageItem } from '../../components/MessageItem/MessageItem'
import { SentMessageType, messagesApi } from '../../api/endpoints/messages-endpoints'
import { usersApi } from '../../api/endpoints/users-endpoints'
import { useParams } from 'react-router-dom'

export const MessagesPage: FC<{ user: IUser }> = ({ user }) => {

    const { userId } = useParams();
    const [outgoingMessage, setOutgoingMessage] = useState('');
    const [incomingMessage, setincomingMessage] = useState('');

    const massageContainerRef = useRef<HTMLDivElement>(null);

    const { data: SentMessagesData, isLoading: sentLoading } = messagesApi.useGetSentMessagesQuery({ userid: user.id });
    const { data: ReceivedMessagesData, isLoading: receivedLoading } = messagesApi.useGetReceivedMessagesQuery({ userid: user.id });
    const { data: CompanionData, isLoading: companionLoading } = usersApi.useGetUserQuery(Number(userId));

    const [SentMessage, { }] = messagesApi.useSentMessageMutation();

    const onSentMessage = (type: 'incoming' | 'outgoing') => {
        const message = type === 'incoming' ? incomingMessage : outgoingMessage;

        if (message === '') return;

        const inuser = type === 'incoming' ? Number(userId) : user.id;
        const touser = type === 'incoming' ? user.id : Number(userId);
        const date = new Date();
        const data: SentMessageType = {
            inuserid: inuser,
            touserid: touser,
            message: message,
            date: date
        }

        SentMessage(data).then(()=>{setTimeout(()=>{
            if (massageContainerRef.current) {
                massageContainerRef.current.scrollTop = massageContainerRef.current.scrollHeight
            }
        }, 100)
        })


    }


    const ConvertMessagesToComponents = (e: IMessage[]) => {
        return MessageDateCompiler(e).sort((a, b) => MessageSort(a.date, b.date)).map((e) => MessageToComponent(e));
    }
    const MessageDateCompiler = (e: IMessage[]) => {
        const newMessages = e.map((e) => ({ ...e, date: new Date(e.date) }))
        return newMessages;
    }
    const MessageSort = (a: Date, b: Date) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return a.getTime() - b.getTime();
    }
    const MessageToComponent = (e: IMessage) => {
        if (e.inuserid === user.id) {
            return <MessageItem user={CompanionData ? CompanionData : user} message={e} />
        }
        return <MessageItem user={user} message={e} incoming />
    }


    const isLoading = !CompanionData || companionLoading || !SentMessagesData || !ReceivedMessagesData || sentLoading || receivedLoading;
    return (
        <Container sx={{ padding: 1 }}>

            <Box
                ref={massageContainerRef}
                sx={{
                    backgroundColor: '#343541',
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    height: '80vh',
                    alignItems:'flex-start',
                    overflowY: 'auto',
                    borderRadius: 5,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
                }}>
                {isLoading ? (
                    <>Loading...</>
                ) : (
                    <>
                        {ConvertMessagesToComponents([...SentMessagesData.messages, ...ReceivedMessagesData.messages])}
                    </>
                )}
            </Box>
            <Paper elevation={10}
                sx={{
                    backgroundColor: '#D8DBDD',
                    display: 'flex',
                    gap: 3,
                    justifyContent: 'space-between',
                    height: '7vh'
                }}>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    width: 500
                }}>
                    <TextField
                        fullWidth
                        label='Incoming Messages Simulator'
                        required
                        multiline
                        defaultValue={outgoingMessage}
                        onChange={(e) => setOutgoingMessage(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 3 }}
                    />

                    <Button onClick={() => onSentMessage('outgoing')}
                        variant='contained'
                    >
                        send
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    width: 500
                }}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        defaultValue={incomingMessage}
                        onChange={(e) => setincomingMessage(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 3 }}
                    />

                    <Button onClick={() => onSentMessage('incoming')}
                        variant='contained'
                    >
                        send
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
