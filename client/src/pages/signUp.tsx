import { useState, ReactElement, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Box,
    FormLabel,
    TextField,
    FormGroup,
    FormControl,
    FormControlLabel,
    OutlinedInput,
    Select,
    Checkbox,
    MenuItem,
    Button,
    Link,
    Typography,
    Alert,
    RadioGroup,
    Radio,
    FormHelperText,
} from '@mui/material';
import { Logo } from '../components';
import { signup } from '../context/authActions';
import useAuth from '../hooks/useAuth';

const initialValues = {
    email: '',
    confirmEmail: '',
    password: '',
    username: '',
    birthDate: {
        day: '',
        month: '',
        year: '',
    },
    gender: '',
    newsletter: false,
    agreed: false,
};

const initialErrors = {
    email: {
        isInvalid: false,
        showMessage: false,
        message:
            '✕  Podany adres jest nieprawidłowy. Sprawdź, czy wpisujesz go zgodnie z formatem przyklad@email.com.',
    },
    confirmEmail: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Potwierdź swój adres e-mail.',
    },
    password: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wprowadź hasło.',
    },
    username: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wprowadź nazwę użytkownika dla swojego profilu.',
    },
    day: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Podaj prawidłowy dzień miesiąca.',
    },
    month: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wybierz miesiąc z listy.',
    },
    year: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Podaj prawidłowy rok.',
    },
    gender: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wybierz swoją płeć.',
    },
    agreed: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Zaakceptuj warunki, aby kontynuować.',
    },
    incorrectCredentials: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Nieprawidłowa nazwa użytkownika lub błędne hasło.',
    },
};

const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

export default function SignUp(props: {}): ReactElement {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const history = useHistory();
    const { dispatch } = useAuth();

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        validateForm();

        // const payload = {
        //     email: formValues.email,
        //     password: formValues.password,
        // };

        // try {
        //     const response = await login(dispatch, payload);

        //     if (response?.user) history.push('/');

        //     // Errors from express-validator
        //     if (response?.error?.code === 'errorValidationFailed') return;
        //     if (response?.error?.code === 'errorInvalidCredentials') {
        //         setFormErrors({
        //             ...formErrors,
        //             email: {
        //                 ...formErrors.email,
        //                 isInvalid: true,
        //                 showMessage: false,
        //             },
        //             password: {
        //                 ...formErrors.password,
        //                 isInvalid: true,
        //                 showMessage: false,
        //             },
        //             incorrectCredentials: {
        //                 ...formErrors.incorrectCredentials, // or response message
        //                 isInvalid: true,
        //             },
        //         });
        //         return;
        //     }
        // } catch (e) {
        //     console.error(e);
        // }
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

    const validateForm = () => {
        Object.entries(initialErrors).forEach(([key, value]) => {
            value.showMessage = value.isInvalid ? true : false;
        });
    };

    return (
        <>
            <Box
                p={3}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Link href='/' sx={{ height: 40 }}>
                    <Logo height={40} />
                </Link>
            </Box>
            <Container maxWidth='xs' component='main' disableGutters>
                <Box
                    component='form'
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1.5,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography component='h1' variant='h6' textAlign='center'>
                        Zarejestruj się za pomocą adresu e-mail
                    </Typography>
                    {formErrors.incorrectCredentials.isInvalid && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {formErrors.incorrectCredentials.message}
                        </Alert>
                    )}
                    <Box>
                        <FormLabel>Twój adres e-mail</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='email'
                            type='text'
                            margin='dense'
                            autoComplete='email'
                            placeholder='Podaj adres e-mail'
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
                        <FormLabel>Potwierdź swój e-mail</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='email'
                            type='text'
                            margin='dense'
                            autoComplete='email'
                            placeholder='Wpisz e-mail ponownie'
                            value={formValues.confirmEmail}
                            error={formErrors.email.isInvalid}
                            helperText={
                                formErrors.confirmEmail.showMessage &&
                                formErrors.confirmEmail.message
                            }
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Stwórz hasło</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='password'
                            type='password'
                            margin='dense'
                            placeholder='Stwórz hasło'
                            error={formErrors.password.isInvalid}
                            value={formValues.password}
                            helperText={
                                formErrors.password.showMessage &&
                                formErrors.password.message
                            }
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Jak mamy się do Ciebie zwracać?</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='username'
                            type='text'
                            margin='dense'
                            placeholder='Wpisz nazwę użytkownika'
                            value={formValues.username}
                            error={formErrors.email.isInvalid}
                            helperText={
                                formErrors.username.showMessage
                                    ? formErrors.username.message
                                    : 'Ta nazwa pojawi się na Twoim profilu'
                            }
                            onChange={handleChange}
                        />
                    </Box>
                    <FormLabel>Podaj swoją datę urodzenia</FormLabel>
                    <FormGroup row={true}>
                        <FormControl sx={{ width: 100 }}>
                            <Typography variant='subtitle2'>Dzień</Typography>
                            <TextField
                                fullWidth
                                size='small'
                                name='birthDay'
                                type='text'
                                margin='dense'
                                placeholder='DD'
                                value={formValues.birthDate.day}
                                error={formErrors.email.isInvalid}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl sx={{ minWidth: 200 }} size='small'>
                            <Typography variant='subtitle2'>Miesiąc</Typography>
                            <Select
                                displayEmpty
                                value={formValues.birthDate.month}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography
                                                variant='subtitle1'
                                                color='text.disabled'
                                            >
                                                Miesiąc
                                            </Typography>
                                        );
                                    }
                                }}
                                //onChange={handleSelect}
                            >
                                <MenuItem disabled>
                                    <div>Miesiąc</div>
                                </MenuItem>
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 120 }}>
                            <Typography variant='subtitle2'>Rok</Typography>
                            <TextField
                                fullWidth
                                size='small'
                                name='birthYear'
                                type='text'
                                margin='dense'
                                placeholder='RRRR'
                                value={formValues.birthDate.year}
                                error={formErrors.email.isInvalid}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </FormGroup>
                    <Box>
                        {formErrors.day.isInvalid &&
                            formErrors.day.showMessage && (
                                <FormHelperText error>
                                    {formErrors.day.message}
                                </FormHelperText>
                            )}
                        {formErrors.month.isInvalid &&
                            formErrors.month.showMessage && (
                                <FormHelperText error>
                                    {formErrors.month.message}
                                </FormHelperText>
                            )}
                        {formErrors.year.isInvalid &&
                            formErrors.year.showMessage && (
                                <FormHelperText error>
                                    {formErrors.year.message}
                                </FormHelperText>
                            )}
                    </Box>
                    <Box>
                        <FormLabel>Podaj swoją płeć</FormLabel>
                        <RadioGroup row aria-label='gender' name='gender'>
                            <FormControlLabel
                                label='Mężczyzna'
                                value='male'
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label='Kobieta'
                                value='female'
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label='Osoba niebinarna'
                                value='nonbinary'
                                control={<Radio />}
                            />
                        </RadioGroup>
                    </Box>
                    <FormControlLabel
                        label='Chcę otrzymywać wiadomości i oferty od Spotify'
                        control={
                            <Checkbox
                                value={formValues.newsletter}
                                // onClick={() =>
                                //     setFormValues({
                                //         ...formValues,
                                //         remember: !formValues.remember,
                                //     })
                                // }
                            />
                        }
                    />
                    <FormControlLabel
                        label={
                            <div>
                                <span>Akceptuję </span>
                                <Link
                                    color='primary'
                                    target='_blank'
                                    href='https://www.spotify.com/pl/legal/end-user-agreement/'
                                >
                                    Warunki korzystania z serwisu Spotify
                                </Link>
                                <span>.</span>
                            </div>
                        }
                        control={
                            <Checkbox
                                value={formValues.newsletter}
                                // onClick={() =>
                                //     setFormValues({
                                //         ...formValues,
                                //         remember: !formValues.remember,
                                //     })
                                // }
                            />
                        }
                    />
                    <Typography
                        gutterBottom
                        align='center'
                        component='h4'
                        variant='caption'
                    >
                        Aby dowiedzieć się więcej o tym, w jaki sposób Spotify
                        zbiera, wykorzystuje i udostępnia Twoje dane osobowe,
                        zapoznaj się z{' '}
                        <Link
                            color='primary'
                            target='_blank'
                            href='https://www.spotify.com/pl/legal/privacy-policy/'
                        >
                            Polityką prywatności Spotify
                        </Link>
                        .
                    </Typography>
                    <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        size='large'
                        sx={{ textTransform: 'none' }}
                    >
                        Zarejestruj się
                    </Button>
                    <Typography
                        gutterBottom
                        align='center'
                        component='h2'
                        variant='body1'
                    >
                        Masz już konto?{' '}
                        <Link color='primary' href='/login'>
                            Zaloguj się
                        </Link>
                        .
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
