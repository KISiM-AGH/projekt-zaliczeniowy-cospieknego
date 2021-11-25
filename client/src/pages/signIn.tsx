import { useState, ReactElement, ChangeEvent } from 'react';
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

const initialValues = {
    email: '',
    password: '',
    remember: true,
};

const initialErrors = {
    email: {
        isInvalid: false,
        showMessage: false,
        message: 'Wprowadź nazwę użytkownika Spotify lub adres e-mail.',
    },
    password: {
        isInvalid: false,
        showMessage: false,
        message: 'Wpisz swoje hasło.',
    },
    incorrectCredentials: {
        isInvalid: false,
        showMessage: false,
        message: 'Nieprawidłowa nazwa użytkownika lub błędne hasło.',
    },
};

export default function SignIn(props: {}): ReactElement {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const history = useHistory();
    const { dispatch } = useAuth();

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (formErrors.email.isInvalid && formErrors.password.isInvalid)
            console.log('true');

        const payload = {
            email: formValues.email,
            password: formValues.password,
            remember: formValues.remember,
        };

        try {
            const response = await login(dispatch, payload);

            if (response?.user) history.push('/');

            // Errors from express-validator
            if (response?.error?.code === 'errorValidationFailed') return;
            if (response?.error?.code === 'errorInvalidCredentials') {
                setFormErrors({
                    ...formErrors,
                    email: {
                        ...formErrors.email,
                        isInvalid: true,
                        showMessage: false,
                    },
                    password: {
                        ...formErrors.password,
                        isInvalid: true,
                        showMessage: false,
                    },
                    incorrectCredentials: {
                        ...formErrors.incorrectCredentials, // or response message
                        isInvalid: true,
                    },
                });
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string; value: string } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });

        value.length === 0
            ? setFormErrors({
                  ...formErrors,
                  [name]: {
                      message: (formErrors as any)[name].message,
                      isInvalid: true,
                      showMessage: true,
                  },
              })
            : setFormErrors({
                  ...formErrors,
                  [name]: {
                      message: (formErrors as any)[name].message,
                      isInvalid: false,
                      showMessage: false,
                  },
              });
    };

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
                    {formErrors.incorrectCredentials.isInvalid && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {formErrors.incorrectCredentials.message}
                        </Alert>
                    )}
                    <Box>
                        <FormLabel>
                            Adres e-mail lub nazwa użytkownika
                        </FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='email'
                            type='text'
                            margin='dense'
                            autoComplete='email'
                            placeholder='Adres e-mail lub nazwa użytkownika'
                            value={formValues.email}
                            error={formErrors.email.isInvalid}
                            helperText={
                                formErrors.email.showMessage &&
                                formErrors.email.message
                            }
                            onChange={handleChange}
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
                            error={formErrors.password.isInvalid}
                            value={formValues.password}
                            helperText={
                                formErrors.password.showMessage &&
                                formErrors.password.message
                            }
                            onChange={handleChange}
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
                                        value={formValues.remember}
                                        onClick={() =>
                                            setFormValues({
                                                ...formValues,
                                                remember: !formValues.remember,
                                            })
                                        }
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
