import { useEffect, useState } from 'react';

export const useLayout = () => {
    const [width, setWidth] = useState('0px');
    const [height, setHeight] = useState('0px');
    const [heightLayout, setHeightLayout] = useState('100%');
    const clientHeight = document.querySelector(
        '#CreditCard-container',
    )?.clientHeight;

    useEffect(() => {
        setWidth(clientHeight ? '86%' : '100%');
        setHeight(clientHeight ? `${clientHeight}px` : '100%');

        if (clientHeight) {
            setHeightLayout('50vh');
        }
    }, [clientHeight]);

    return { width, height, heightLayout };
};
