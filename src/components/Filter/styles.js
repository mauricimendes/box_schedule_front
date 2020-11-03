import styled, { keyframes } from 'styled-components'

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateY(-24px)
    }
    to {
        opacity: 1;
        transform: translateY(0)
    }
`

export const Container = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    animation: ${appearFromLeft} 0.5s;
`

export const Filters = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 8px;

    border: 2px solid transparent;
    border-bottom-color: #CACACA;
    margin: 8px 40px;

    div {
        display: flex;
        flex-direction: row;
        border: 2px solid transparent;
        background-color: transparent;
        border-bottom-color: #5CA5E9;
        justify-content: flex-start;
        align-items: center;
        
        svg {
            color: #5CA5E9;
            font-size: 24px;
        }

        input {
            margin-left: 8px;
            font-size: 16px;
            border: 0;
            min-width: 18%;
            background-color: transparent;
        }
    }

    select {
        margin-top: 8px;
        margin-bottom: 16px;
        border: 2px solid #5CA5E9;
        border-radius: 5px;
        background-color: transparent;
        min-width: 18%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }

    button {
        border: 0;
        background-color: transparent;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            font-size: 32px;
        }
    }
`