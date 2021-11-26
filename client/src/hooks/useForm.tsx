import { useState, ChangeEvent, FormEvent } from 'react';

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

    const handleClick = (key: keyof T) => (e: any) => {
        const value = !data[key];

        setData({
            ...data,
            [key]: value,
        });
    };

    const handleChange =
        <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = sanitizeFn ? sanitizeFn(e.target.value) : !data[key];

            setData({
                ...data,
                [key]: value,
            });
        };

    const handleSubmit = async (
        e: FormEvent<HTMLInputElement & HTMLSelectElement>
    ) => {
        e.preventDefault();
        performCheck();
    };

    const performCheck = () => {
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
            options?.onClick && options?.onClick();
        }
    };

    return {
        data,
        errors,
        handleClick,
        handleChange,
        handleSubmit,
    };
};
