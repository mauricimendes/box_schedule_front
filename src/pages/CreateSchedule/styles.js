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
    animation: ${appearFromLeft} 0.5s;
`

export const Option = styled.div`
    button {
        background-color: #ABDBB2;
        border: 0;
        border-radius: 5px;
        padding: 8px;
        min-width: 160px;
        margin-left: 10px;
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

export const Type = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 220%;
        
        input {
            margin-right: 8px;
            width: 24px;
            height: 24px;
        }

        span {
            margin-right: 48px;
            color: #1D1D23;
            font-size: 16px;
            font-weight: 600;
        }
    }
`

export const Checkbox = styled.div`
    display: flex;
    width: 100%;
        
    span {
        color: #1D1D23;
        font-size: 16px;
        font-weight: 600;
        margin-left: 8px;
    }
`