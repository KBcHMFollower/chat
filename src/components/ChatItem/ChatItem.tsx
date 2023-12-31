import { Avatar, Button, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'
import { stringAvatar } from '../../services/avatar-services'
import { IUser } from '../../api/interfaces'
import { useNavigate } from 'react-router-dom'



export const ChatItem:FC<{user:IUser}> = ({user}) => {

    const navigator = useNavigate();

    return (
        <Button
        onClick={()=>navigator(`/messages/${user.id}`)}>
            <Paper elevation={10}
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems:'center',
                    backgroundColor:'#D8DBDD',
                    width:600,
                    height:50,
                    padding:3
                }}>
                    <Avatar
                     {...stringAvatar(user.fname + ' ' + user.lname)}
                     sx={{width:70, height:70}}/>
                     <Typography>
                     {user.fname + ' ' + user.lname}
                     </Typography>
            </Paper>
        </Button>
    )
}
