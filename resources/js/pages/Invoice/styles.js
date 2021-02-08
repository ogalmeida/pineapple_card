import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Container = styled.div`
    width: 100%;
    margin-top: 36px;
`;

export const IconText = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-right: 6px;
    }

    & + div {
        margin-top: 4px;
    }
`;

export const Transaction = styled.ul`
    list-style: none;
    margin-top: 12px;

    li {
        background-color: ${shade(0.03, '#f9f9f9')};
        border-radius: 4px;
        padding: 12px 8px;

        transition: transform .2s;

        & + li {
            margin-top: 8px;
        }

        &:hover {
            transform: translateX(5px);
            cursor: pointer;
        }

        > div {

            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        > span {
            font-size: 12px;
        }

        section {
            margin-top: 16px;
        }
    }
`;

export const Status = styled.div`
    width: 100%;
    padding: 24px 12px;
    text-align: center;
    font-size: 20px;
    color: #f9f9f9;
    font-weight: medium;

    border-radius: 8px;
    background-color: ${props => props.color};

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    span {
        display: block;
        font-size: 16px;
    }

    > svg {
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
`;
