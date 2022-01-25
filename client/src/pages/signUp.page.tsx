import { useState, useEffect, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
    RadioGroup,
    Radio,
    FormHelperText,
    Stack,
} from '@mui/material';
import { Logo } from '../components';
import { signup } from '../actions/authActions';
import { useForm } from '../hooks/useForm';
import useAuth from '../hooks/useAuth';
import * as ROUTES from '../constants/routes';

interface IMonth {
    [num: string]: string;
}

const months: IMonth = {
    '01': 'styczeń',
    '02': 'luty',
    '03': 'marzec',
    '04': 'kwiecień',
    '05': 'maj',
    '06': 'czerwiec',
    '07': 'lipiec',
    '08': 'sierpień',
    '09': 'wrzesień',
    '10': 'październik',
    '11': 'listopad',
    '12': 'grudzień',
};

type Gender = 'male' | 'female' | 'non-binary';

interface IUser {
    email: string;
    confirmEmail: string;
    password: string;
    username: string;
    gender: Gender;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    isSubscribedToNewsletter: boolean;
    hasAcceptedTos: boolean;
}

export default function SignUpPage(): ReactElement {
    const [emailToMatch, setEmailToMatch] = useState<string>('');
    const { dispatch } = useAuth();
    const history = useHistory();

    const createAccount = async () => {
        const payload = {
            email: user.email,
            confirm_email: user.confirmEmail,
            password: user.password,
            username: user.username,
            birth_date: `${user.birthYear}-${user.birthMonth}-${user.birthDay}`,
            gender: user.gender,
            send_newsletter: user.isSubscribedToNewsletter,
            tos_accepted: user.hasAcceptedTos,
            images: [
                {
                    url: `/images/avatars/${
                        Math.floor(Math.random() * 10) + 1
                    }.jpg`,
                    height: '300',
                    width: '300',
                },
            ],
        };

        try {
            const response = await signup(dispatch, payload);
            if (response?.user) history.push(ROUTES.HOME);
        } catch (e) {
            console.error(e);
        }
    };

    const {
        data: user,
        errors,
        handleClick,
        handleSubmit,
        handleChange,
        handleSelect,
        handleFocusEvent,
    } = useForm<IUser>({
        validations: {
            email: {
                required: {
                    value: true,
                    message: '✕  Podaj swój adres e-mail.',
                },
                pattern: {
                    value: `^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`,
                    // value: `^S+@S+.S+$`, // Spotify alike
                    message:
                        '✕  Podany adres jest nieprawidłowy. Sprawdź, czy wpisujesz go zgodnie z formatem przyklad@email.com.',
                },
                onBlur: true,
            },
            confirmEmail: {
                required: {
                    value: true,
                    message: '✕  Potwierdź swój adres e-mail.',
                },
                custom: {
                    isValid: (value: string) => value === emailToMatch,
                    message: '✕  Podane adresy e-mail są różne.',
                },
            },
            password: {
                required: {
                    value: true,
                    message: '✕  Wprowadź hasło.',
                },
                custom: {
                    isValid: (value: string) => value.length >= 8,
                    message: '✕  Twoje hasło jest za krótkie.',
                },
            },
            username: {
                required: {
                    value: true,
                    message:
                        '✕  Wprowadź nazwę użytkownika dla swojego profilu.',
                },
            },
            birthDay: {
                required: {
                    value: true,
                    message: '✕  Podaj prawidłowy dzień miesiąca.',
                },
                pattern: {
                    value: '^([1-9]|1[0-9]|2[0-9]|3[0-1])$',
                    message: '✕  Podaj prawidłowy dzień miesiąca.',
                },
            },
            birthMonth: {
                required: {
                    value: true,
                    message: '✕  Wybierz miesiąc z listy.',
                },
                custom: {
                    isValid: (value: string) =>
                        Object.keys(months).includes(value),
                    message: '✕  Wybierz prawidłowy miesiąc.',
                },
            },
            birthYear: {
                required: {
                    value: true,
                    message: '✕  Podaj prawidłowy rok.',
                },
                pattern: {
                    value: `^(19[0-9][0-9]|(20[0-9][0-9]))$`,
                    message: '✕  Podaj prawidłowy rok.',
                },
            },
            gender: {
                required: {
                    value: true,
                    message: '✕  Wybierz swoją płeć.',
                },
            },
            hasAcceptedTos: {
                required: {
                    value: true,
                    message: '✕  Zaakceptuj warunki, aby kontynuować.',
                },
            },
        },
        onSubmit: createAccount,
    });

    useEffect(() => {
        setEmailToMatch(user.email);
    }, [user.email]);

    return (
        <>
            <Helmet>
                <title>Zarejestruj się - Spotify</title>
            </Helmet>
            <Container
                maxWidth={false}
                sx={{ bgcolor: 'background.paper', py: 3 }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Link href={ROUTES.HOME} sx={{ height: 40 }}>
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
                        <Typography
                            component='h1'
                            textAlign='center'
                            py={2}
                            sx={{ fontSize: 32, marginBottom: '-12px' }}
                        >
                            Zarejestruj się za darmo i zacznij słuchać.
                        </Typography>
                        <Typography
                            component='h1'
                            variant='h6'
                            textAlign='center'
                        >
                            Zarejestruj się za pomocą adresu e-mail
                        </Typography>
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
                                value={user.email || ''}
                                error={errors.email ? true : false}
                                helperText={errors?.email}
                                onChange={handleChange('email')}
                                onBlur={handleFocusEvent('email')}
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
                                value={user.confirmEmail || ''}
                                error={errors.confirmEmail ? true : false}
                                helperText={errors?.confirmEmail}
                                onChange={handleChange('confirmEmail')}
                                onBlur={handleFocusEvent('confirmEmail')}
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
                                value={user.password || ''}
                                error={errors.password ? true : false}
                                helperText={errors?.password}
                                onChange={handleChange('password')}
                                onBlur={handleFocusEvent('password')}
                            />
                        </Box>
                        <Box>
                            <FormLabel>
                                Jak mamy się do Ciebie zwracać?
                            </FormLabel>
                            <TextField
                                fullWidth
                                size='small'
                                name='username'
                                type='text'
                                margin='dense'
                                placeholder='Wpisz nazwę użytkownika'
                                value={user.username || ''}
                                error={errors.username ? true : false}
                                helperText={errors?.username}
                                onChange={handleChange('username')}
                                onBlur={handleFocusEvent('username')}
                            />
                        </Box>
                        <FormLabel>Podaj swoją datę urodzenia</FormLabel>
                        <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                        >
                            <FormControl sx={{ maxWidth: 60 }}>
                                <Typography variant='subtitle2'>
                                    Dzień
                                </Typography>
                                <TextField
                                    size='small'
                                    type='text'
                                    placeholder='DD'
                                    margin='dense'
                                    name='birthDay'
                                    value={user.birthDay || ''}
                                    error={errors.birthDay ? true : false}
                                    onChange={handleChange('birthDay')}
                                    onBlur={handleFocusEvent('birthDay')}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography variant='subtitle2'>
                                    Miesiąc
                                </Typography>
                                <Select
                                    displayEmpty
                                    size='small'
                                    input={<OutlinedInput />}
                                    renderValue={(selected: any) => {
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

                                        return months[user.birthMonth];
                                    }}
                                    sx={{
                                        mt: 1,
                                        mb: 0.5,
                                        height: '40px',
                                        boxSizing: 'border-box',
                                    }}
                                    value={user.birthMonth || ''}
                                    error={errors.birthMonth ? true : false}
                                    onChange={handleSelect('birthMonth')}
                                >
                                    <MenuItem disabled>
                                        <div>Miesiąc</div>
                                    </MenuItem>
                                    {Object.entries(months)
                                        .sort((a, b) =>
                                            a[0].localeCompare(b[0])
                                        )
                                        .map(([key, month], i) => (
                                            <MenuItem key={key} value={key}>
                                                {month}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ maxWidth: 120 }}>
                                <Typography variant='subtitle2'>Rok</Typography>
                                <TextField
                                    fullWidth
                                    size='small'
                                    name='birthYear'
                                    type='text'
                                    margin='dense'
                                    placeholder='RRRR'
                                    value={user.birthYear || ''}
                                    error={errors.birthYear ? true : false}
                                    onChange={handleChange('birthYear')}
                                    onBlur={handleFocusEvent('birthYear')}
                                />
                            </FormControl>
                        </Stack>
                        <FormControl>
                            {errors.birthDay && (
                                <FormHelperText error>
                                    {errors.birthDay}
                                </FormHelperText>
                            )}
                            {errors.birthMonth && (
                                <FormHelperText error>
                                    {errors.birthMonth}
                                </FormHelperText>
                            )}
                            {errors.birthYear && (
                                <FormHelperText error>
                                    {errors.birthYear}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormGroup>
                            <FormLabel>Podaj swoją płeć</FormLabel>
                            <RadioGroup
                                row
                                aria-label='gender'
                                name='gender'
                                value={user.gender || ''}
                                onChange={handleChange('gender')}
                            >
                                <FormControlLabel
                                    label='Mężczyzna'
                                    value='male'
                                    control={
                                        <Radio
                                            inputProps={{
                                                'aria-label': 'male',
                                            }}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label='Kobieta'
                                    value='female'
                                    control={
                                        <Radio
                                            inputProps={{
                                                'aria-label': 'female',
                                            }}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label='Osoba niebinarna'
                                    value='non-binary'
                                    control={
                                        <Radio
                                            inputProps={{
                                                'aria-label': 'non-binary',
                                            }}
                                        />
                                    }
                                />
                            </RadioGroup>
                            <FormControl>
                                <FormHelperText
                                    error={errors.gender ? true : false}
                                >
                                    {errors?.gender}
                                </FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <FormControlLabel
                            label='Chcę otrzymywać wiadomości i oferty od Spotify'
                            control={
                                <Checkbox
                                    name='isSubscribedToNewsletter'
                                    value={
                                        user.isSubscribedToNewsletter || false
                                    }
                                    onClick={handleClick(
                                        'isSubscribedToNewsletter'
                                    )}
                                />
                            }
                        />
                        <FormGroup>
                            <FormControlLabel
                                label={
                                    <div>
                                        <span>Akceptuję </span>
                                        <Link
                                            color='primary'
                                            target='_blank'
                                            href={ROUTES.USER_AGREEMENT}
                                        >
                                            Warunki korzystania z serwisu
                                            Spotify
                                        </Link>
                                        <span>.</span>
                                    </div>
                                }
                                control={
                                    <Checkbox
                                        name='hasAcceptedTos'
                                        value={user.hasAcceptedTos || false}
                                        onClick={handleClick('hasAcceptedTos')}
                                    />
                                }
                            />
                            <FormControl>
                                <FormHelperText
                                    error={errors.hasAcceptedTos ? true : false}
                                >
                                    {errors?.hasAcceptedTos}
                                </FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <Typography
                            gutterBottom
                            align='center'
                            component='h4'
                            variant='caption'
                        >
                            Aby dowiedzieć się więcej o tym, w jaki sposób
                            Spotify zbiera, wykorzystuje i udostępnia Twoje dane
                            osobowe, zapoznaj się z{' '}
                            <Link
                                color='primary'
                                target='_blank'
                                href={ROUTES.PRIVACY_POLICY}
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
                            <Link color='primary' href={ROUTES.LOGIN}>
                                Zaloguj się
                            </Link>
                            .
                        </Typography>
                    </Box>
                </Container>
            </Container>
        </>
    );
}
