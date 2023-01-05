export const getTypeSession = (id) => {
    if (id === 1) {
        return 'Disponible';
    }
    if (id === 2) {
        return 'Agendada';
    }
    if (id === 5) {
        return 'Cancelada';
    }
    if (id === 6) {
        return 'Finalizada';
    }
    return '';
};
