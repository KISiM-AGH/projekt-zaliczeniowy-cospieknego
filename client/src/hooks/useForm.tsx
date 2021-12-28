/**
 * @TO_REFACTOR
 * MAŁO WYDAJNE! Wymaga zmian, jeżeli ma działać dla `onChange`.
 */
import { SelectChangeEvent } from '@mui/material';
import { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from 'react';

interface Validation {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: string) => boolean;
        message: string;
    };
    onBlur?: boolean;
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
    validations?: Validations<T>;
    initialValues?: Partial<T>;
    onSubmit?: () => void;
    onClick?: () => void;
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T);
    const [errors, setErrors] = useState<ErrorRecord<T>>({});
    const [key, setKey] = useState<any>(''); // @REMOVE 'any'

    useEffect(() => {
        performCheck(key);
    }, [data, key]);

    const handleClick = (key: keyof T) => (e: any) => {
        const value = !data[key]; // true or false
        setKey(key);
        setData({
            ...data,
            [key]: value,
        });
        performCheck(key);
        console.log(key, value);
    };

    const handleChange =
        <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = sanitizeFn
                ? sanitizeFn(e.target.value)
                : (e.target.value as string);

            setKey(key);
            setData({
                ...data,
                [key]: value,
            });
        };

    const handleSelect = (key: keyof T) => (e: SelectChangeEvent) => {
        const value = e.target.value as string;
        setKey(key);
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleFocusEvent =
        <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
        (e: FocusEvent<HTMLInputElement>) => {
            performCheck(key);
        };

    const handleSubmit = async (
        e: FormEvent<HTMLInputElement & HTMLSelectElement>
    ) => {
        e.preventDefault();
        performFullCheck();
    };

    const performCheck = (key: keyof T) => {
        const validations = options?.validations;
        const validation = validations && validations[key];
        const newErrors: ErrorRecord<T> = {};
        const value = data[key];
        let isValid = true;

        // Required
        const required = validation?.required;
        if (required?.value && !value) {
            isValid = false;
            newErrors[key] = required?.message;
        }

        // Pattern
        const pattern = validation?.pattern;
        if (value && pattern?.value && !RegExp(pattern.value).test(value)) {
            isValid = false;
            newErrors[key] = pattern.message;
        }

        // Custom
        const custom = validation?.custom;
        if (value && custom?.isValid && !custom.isValid(value)) {
            isValid = false;
            newErrors[key] = custom.message;
        }

        if (!isValid) {
            setErrors({ ...errors, ...newErrors });
            return;
        }

        delete errors[key];
        setErrors({ ...errors });
        // options?.onClick && options?.onClick();
    };

    const performFullCheck = () => {
        const validations = options?.validations;

        if (validations) {
            const newErrors: ErrorRecord<T> = {};
            let isValid = true;

            for (const key in validations) {
                const validation = validations[key];
                const value = data[key];

                // Required
                const required = validation?.required;
                if (required?.value && !value) {
                    isValid = false;
                    newErrors[key] = required?.message;
                }

                // Pattern
                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    isValid = false;
                    newErrors[key] = pattern.message;
                }

                // Custom
                const custom = validation?.custom;
                if (value && custom?.isValid && !custom.isValid(value)) {
                    isValid = false;
                    newErrors[key] = custom.message;
                }
            }

            if (!isValid) {
                setErrors(newErrors);
                return;
            }

            setErrors({});
            options?.onSubmit && options?.onSubmit();
        }
    };

    return {
        data,
        errors,
        handleClick,
        handleSubmit,
        handleChange,
        handleSelect,
        handleFocusEvent,
    };
};
