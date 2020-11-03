import styled from 'styled-components'

import { shade } from 'polished'

export const Container = styled.button`
    background: #ABDBB2;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #FFF;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 22px;
    width: 100%;
    max-height: 40px;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
    &:hover {
        background: ${shade(0.2, '#ABDBB2')}
    }
`