import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

const Input = ({ name, icon: Icon, ...rest }) => {
    const { fieldName, defaultValue, error, registerField } = useField(name);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
            {Icon && <Icon />}
            <input
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                type="text"
                {...rest}
            />
        </Container>
    );
};

export default Input;
