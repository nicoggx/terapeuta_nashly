import moment from 'moment';

export const formatRut = (rut) => {
    let rutPuntos;
    const actual = rut.replace(/^0+/, '');
    if (actual !== '' && actual.length > 1) {
        const sinPuntos = actual.replace(/\./g, '');
        const actualLimpio = sinPuntos.replace(/-/g, '');
        const inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        rutPuntos = '';
        let i = 0;
        let j = 1;
        for (i = inicio.length - 1; i >= 0; i -= 1) {
            const letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 === 0 && j <= inicio.length - 1) {
                rutPuntos = `.${rutPuntos}`;
            }
            j += 1;
        }
        const dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = `${rutPuntos}-${dv}`;
    }
    return rutPuntos;
};

export const formatDate = (d) => {
    return moment(d).utc().format('DD-MM-YYYY');
};

export const formatDateTwo = (d) => {
    return moment(d).utc().format('YYYY-MM-DD');
};

export const hourConvert = (hour) => {
    return moment(hour).utc().format('HH:mm');
};
