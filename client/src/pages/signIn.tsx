import { useState, ReactElement } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    Divider,
    Container,
    Box,
    Grid,
    FormLabel,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link,
    Typography,
    Alert,
} from '@mui/material';
import { Logo } from '../components';
import { login } from '../context/authActions';
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import * as CODES from '../constants/errorCodes';

interface ILoginUser {
    login: string;
    password: string;
    remember: boolean;
}

export default function SignIn(props: {}): ReactElement {
    const [areCredentialsValid, setAreCredentialsValid] = useState(true);
    const history = useHistory();
    const { dispatch } = useAuth();

    const loginUser = async () => {
        const payload = {
            login: user.login, // email or username
            password: user.password,
            remember: user.remember,
        };

        try {
            const response = await login(dispatch, payload);

            if (response?.user) history.push('/');

            // Errors from express-validator
            if (response?.error?.code === CODES.FAILED) return;
            if (response?.error?.code === CODES.INVALID) {
                setAreCredentialsValid(false);
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleFocusEvent = () => {
        setAreCredentialsValid(true);
    };

    const {
        data: user,
        errors,
        handleClick,
        handleSubmit,
        handleChange,
    } = useForm<ILoginUser>({
        validations: {
            login: {
                required: {
                    value: true,
                    message:
                        'Wprowadź nazwę użytkownika Spotify lub adres e-mail.',
                },
            },
            password: {
                required: {
                    value: true,
                    message: 'Wpisz swoje hasło.',
                },
            },
        },
        onSubmit: loginUser,
    });

    return (
        <>
            <Box
                p={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Link href='/' sx={{ height: 60 }}>
                    <Logo height={60} />
                </Link>
            </Box>
            <Divider />
            <Container maxWidth='xs' component='main' disableGutters>
                <Box
                    component='form'
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1.5,
                        mt: 5,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography
                        component='h1'
                        variant='h6'
                        textAlign='center'
                        mt={1}
                    >
                        Aby kontynuować, zaloguj się do Spotify.
                    </Typography>
                    {!areCredentialsValid && (
                        <Alert
                            variant='outlined'
                            severity='error'
                            sx={{ mb: 2 }}
                        >
                            Nieprawidłowa nazwa użytkownika lub błędne hasło.
                        </Alert>
                    )}
                    <Box>
                        <FormLabel>
                            Adres e-mail lub nazwa użytkownika
                        </FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='login'
                            type='text'
                            margin='dense'
                            autoComplete='email'
                            placeholder='Adres e-mail lub nazwa użytkownika'
                            value={user.login || ''}
                            error={
                                errors.login || !areCredentialsValid
                                    ? true
                                    : false
                            }
                            helperText={errors?.login}
                            onBlur={handleFocusEvent}
                            onChange={handleChange('login')}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Hasło</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='password'
                            type='password'
                            margin='dense'
                            autoComplete='current-password'
                            placeholder='Hasło'
                            value={user.password || ''}
                            error={
                                errors.password || !areCredentialsValid
                                    ? true
                                    : false
                            }
                            helperText={errors?.password}
                            onBlur={handleFocusEvent}
                            onChange={handleChange('password')}
                        />
                    </Box>
                    <Link color='textSecondary' href='password-reset'>
                        Nie pamiętasz hasła?
                    </Link>
                    <Grid container mt={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                label='Zapamiętaj mnie'
                                control={
                                    <Checkbox
                                        defaultChecked
                                        value={user.remember}
                                        onClick={handleClick('remember')}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' type='submit' fullWidth>
                                ZALOGUJ SIĘ
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                        gutterBottom
                        align='center'
                        component='h2'
                        variant='body1'
                    >
                        Nie masz jeszcze konta?
                    </Typography>
                    <Button
                        variant='outlined'
                        component={RouterLink}
                        to='/signup'
                        size='large'
                    >
                        ZAREJESTRUJ SIĘ W SPOTiFY
                    </Button>
                </Box>
            </Container>
        </>
    );
}
