import styled from 'styled-components';
import{ shade } from 'polished';

export const Container = styled.div`
    width: 100%;
    padding: 12px 8px;

    background-color: #670d64;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        max-width: 991px;
        margin: 0 auto;

        span {
            cursor: pointer;
            transition: color .2s;
            color: #f9f9f9;

            &:hover {
                color: ${shade(0.2, '#f9f9f9')};
            }
        }
    }

    img {
        width: 100%;
        max-width: 300px;
    }
`;
