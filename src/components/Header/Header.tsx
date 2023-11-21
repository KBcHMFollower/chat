import { Avatar, Button, Collapse, Container, Paper } from '@mui/material'
import React, { FC, useState } from 'react'
import { stringAvatar } from '../../services/avatar-services'
import { IUser } from '../../api/interfaces'
import { useAppDispatch } from '../../hooks/redux'
import { SetUser } from '../../store/slices/user-slice'

type PropsType={
    user:IUser;
}

export const Header:FC<PropsType> = ({user}) => {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    return (
        <Paper elevation={10}
            sx={{ width: '100vw', height: 100, backgroundColor: '#D8DBDD' }}>
            <Container sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center'
            }}>
                <Button
                    onClick={() => setOpen(!open)}
                >
                    <Avatar {...stringAvatar(user.fname + ' ' + user.lname)}
                        sx={{ width: 70, height: 70 }} />
                </Button>

                <Collapse
                    in={open}>
                    <Button
                    onClick={()=>dispatch(SetUser({fname:'', lname:'', id:-1}))}>Log Out</Button>
                </Collapse>
            </Container>
        </Paper>
    )
}
