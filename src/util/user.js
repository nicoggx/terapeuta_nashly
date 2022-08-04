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

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export const formatDate = (d) => {
    const date = new Date(d);
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
};

export const formatDateTwo = (d) => {
    const date = new Date(d);
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
};

export const hourConvert = (hour) => {
    const date = new Date(hour)
        .toLocaleString()
        .split(' ')[1]
        .split(':')
        .splice(0, 2);
    return date.join(':');
};
