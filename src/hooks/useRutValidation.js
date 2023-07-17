import { validate, format } from 'rut.js';

// Hook de validación de RUT
export default function useRutValidation() {
    const validateRut = (rut) => {
        const cleanedRut = rut.replace(/[^0-9kK]/g, '');
        return cleanedRut.length === 8 || cleanedRut.length === 9 ? validate(cleanedRut) : false;
    };

    const formatRut = (rut) => {
        const cleanedRut = rut.replace(/[^0-9kK]/g, '');
        return format(cleanedRut);
    };

    return { validateRut, formatRut };
}
