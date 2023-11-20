import { TextFields } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FC, FormEvent, useState } from 'react'
import { usersApi } from '../../api/endpoints/users-endpoints';
import { useAppDispatch } from '../../hooks/redux';
import { IUser } from '../../api/interfaces';
import { SetUser } from '../../store/slices/user-slice';

export const LogInPage: FC = () => {

    const [CreateUser, rezult] = usersApi.useCreateUserMutation();

    const [formData, setFormData] = useState({
        fname: '',
        lname: ''
    });

    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        CreateUser(formData)
        .unwrap()
        .then((data) => {
          console.log('Успешно создан пользователь:', data);
          dispatch(SetUser(data));
        })
        .catch((error) => {
          console.error('Ошибка при создании пользователя:', error);
        });
    }

    return (
        <div>
            <Box component={'form'} onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: "column", gap: 2, justifyContent: 'center', alignItems: 'center', height: 1000 }}>
                <Typography variant='h2'>
                    Write who are you
                </Typography>
                <TextField
                    type={'text'}
                    required
                    label='First name'
                    defaultValue={formData.fname}
                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                    sx={{ width: 500 }}
                />
                <TextField
                    type={'text'}
                    required
                    label='Last name'
                    defaultValue={formData.lname}
                    onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                    sx={{ width: 500 }}
                />
                <Button type='submit'
                    sx={{ width: 500 }}
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Go to chats!!
                </Button>
            </Box>
        </div>
    )
}
