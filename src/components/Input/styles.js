import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

export const Container = styled.div`
    background: #F3F3F3;
    border-radius: 10px;
    border: 2px solid #5CA5E9;
    padding: 16px;
    width: 100%;
    color: #5CA5E9;
    display: flex;
    align-items: center;
    & + div {
        margin-top: 8px;
    }
    ${props => props.isErrored && css`
        border-color: #c53030;
    `}
    ${props => props.isFocused && css`
        color: #ABDBB2;
        border-color: #ABDBB2;
    `}
    ${props => props.isFilled && css`
        color: #ABDBB2;
    `}
    
    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #1D1D23;
        height: 100%;
        &::placeholder {
            color: #5CA5E9;
        }
    }
    svg {
        margin-right: 16px;
    }
`

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #f4ede8;
        &::before {
            border-color: #c53030 transparent;
        }
    }
`