import { useState, useEffect, ChangeEvent } from 'react';

//replace 'any'
export const useForm = (options: any) => {
    const [data, setData] = useState(options?.initialValues || {});

    const handleChange =
        (key: number, sanitizeFn: Function) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = sanitizeFn
                ? sanitizeFn(e.target.value)
                : e.target.value;

            setData({
                ...data,
                [key]: value,
            });
        };

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        options?.onSubmit && options.onSubmit();
    };

    return {
        data,
        handleChange,
        handleSubmit,
    };
};
