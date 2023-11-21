import { Avatar, Box, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'
import { stringAvatar } from '../../services/avatar-services'
import { IMessage, IUser } from '../../api/interfaces'

type PropsType = {
    user: IUser;
    message: IMessage;
    incoming?: boolean;
}

export const MessageItem: FC<PropsType> = ({ incoming, message, user }) => {

    const MessageAvatar = () => (
        <Box>
            <Avatar {...stringAvatar(user.fname + ' ' + user.lname)}
                sx={{
                    width: 100,
                    height: 100
                }} />
        </Box>
    )

    const MessageText = () => (
        <Box>
            <Paper elevation={6}
                sx={{
                    maxWidth: 100,
                    padding: 3
                }}>
                <Typography fontSize={20}
                    sx={{ overflowWrap: 'break-word' }}>
                    {message.message}
                </Typography>
            </Paper>
        </Box>
    )

    return (
        <Box sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            padding: 5,
            justifyContent: incoming ? 'end' : 'start',
        }}>
            {incoming ? (
                <>

                    <MessageText />
                    <MessageAvatar />
                </>
            ) : (
                <>

                    <MessageAvatar />
                    <MessageText />
                </>
            )}

        </Box>
    )
}
