import { useState, useEffect, useMemo } from 'react';

interface FormState {
    [key: string]: string;
}

interface FormValidations {
    [key: string]: [Function, string];
}

const useForm = (initialForm: FormState = {}, formValidations: FormValidations = {}) => {
    const [formState, setFormState] = useState<FormState>(initialForm);
    const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

    // Actualiza las validaciones cada vez que formState cambia
    useEffect(() => {
        createValidators();
    }, [formState]);

    // Comprueba si el formulario es válido
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    // Actualiza el estado del formulario cuando un campo cambia
    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Resetea el formulario al estado inicial
    const onResetForm = () => {
        setFormState(initialForm);
    };

    // Crea las validaciones en función de las reglas pasadas
    const createValidators = () => {
        const formCheckedValues: Record<string, string | null> = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    };
};

export default useForm;
