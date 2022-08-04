import { sha512 } from 'js-sha512';

export const encrypt = (message) => {
    return sha512(message);
};
