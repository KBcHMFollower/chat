import { Box, Button, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { ChatItem } from '../../components/ChatItem/ChatItem'
import { IUser } from '../../api/interfaces'
import { messagesApi } from '../../api/endpoints/messages-endpoints'
import { usersApi } from '../../api/endpoints/users-endpoints'
import { useNavigate } from 'react-router-dom'

type PropsType = {
    user:IUser
}

export const ChatsPage:FC<PropsType> = ({user}) => {

    const [limit, setLimit] = useState(6);

    const {data: usersData, isLoading: usersLoading} = usersApi.useGetAllUsersQuery({limit:limit, page:1});
  return (
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:2,
        alignItems:'center',
        justifyContent:'center'
    }}>
        <Typography variant='h3'
        sx={{mt:10}}>
            Chats
        </Typography>

        {usersLoading || !usersData ? (
            <> Lodaing...</>
        ) : (
            <>
                {usersData.users.map(e=><ChatItem user = {e}/>)}
                {limit < usersData.totalCount && 
                <Button
                variant='contained'
                onClick={()=>setLimit(limit+4)}
                >Load More</Button>
                }
            </>
        )}

    </Box>
  )
}
