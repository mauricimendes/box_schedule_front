import styled, { keyframes } from 'styled-components'
import { Form as FormApp } from '@unform/web'

export const Container = styled.div`
    height: 85vh;
`

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateY(24px)
    }
    to {
        opacity: 1;
        transform: translateY(0)
    }
`

export const Form = styled(FormApp)`
    animation: ${appearFromLeft} 1s;
`

export const Option = styled.div`
    button {
        background-color: #ABDBB2;
        border: 0;
        border-radius: 5px;
        padding: 8px;
        min-width: 160px;

        p {
            font-size: 16px;
            font-weight: 700;
            color: #f3f3f3;
            font-family: 'Nunito', sans-serif; 
        }
    }
`

export const Content = styled.main`
    height: 100%;
    max-width: 1120px;
    margin: auto;
    padding: 24px;
    display: flex;
    background-color: #FFFFFF;
`

export const Stars = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const ButtonStar = styled.div`
    margin: 16px;
    border: 0;
    background-color: transparent;
    cursor: pointer;

    svg {
        font-size: 48px;
        color: ${props => props.select ? '#ABDBB2' : '#5CA5E9'};
    }

    p {
        margin-top: -40px;
        margin-left: ${props => props.option10 ? '14' : '19'}px ;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
    }
`