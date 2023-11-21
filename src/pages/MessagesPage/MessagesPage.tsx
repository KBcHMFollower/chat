import { Box, Button, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { MessageItem } from '../../components/MessageItem/MessageItem'
import { IUser } from '../../api/interfaces'
import { messagesApi } from '../../api/endpoints/messages-endpoints'
import { usersApi } from '../../api/endpoints/users-endpoints'

type PropsType = {
    user:IUser
}

export const MessagesPage:FC<PropsType> = ({user}) => {

    const [limit, setLimit] = useState(6);

    const {data: usersData, isLoading: usersLoading} = usersApi.useGetAllUsersQuery({limit:limit, page:1})

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
                {usersData.users.map(e=><MessageItem user = {e}/>)}
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
