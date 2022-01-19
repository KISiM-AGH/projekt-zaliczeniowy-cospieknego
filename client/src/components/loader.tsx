import { ReactElement } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        width: 100,
        height: 30,
        zIndex: 99,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    blob: {
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary.dark,
        display: 'block',
        float: 'left',
        margin: '4px',
        position: 'relative',
        height: '10px',
        width: '10px',
        transform: 'translate3d(0, 0, 0)',
        animation: `$bouncing 1.2s infinite ease-in-out`,
    },

    blob1: {
        animationDelay: '0ms',
    },

    blob2: {
        animationDelay: '150ms',
    },

    blob3: {
        animationDelay: '150ms',
    },

    '@keyframes bouncing': {
        '0%, 50%, 100%': {
            width: '8px',
            height: '8px',
        },
        '25%': {
            width: '10px',
            height: '10px',
            backgroundColor: '#f7f7f7',
        },
    },
}));

export default function Loader(): ReactElement {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <span className={`${styles.blob} ${styles.blob1}`}></span>
            <span className={`${styles.blob} ${styles.blob2}`}></span>
            <span className={`${styles.blob} ${styles.blob3}`}></span>
        </div>
    );
}
