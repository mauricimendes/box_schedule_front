import styled, { keyframes } from 'styled-components'

const numItemsPerRow = 3;

export const Container = styled.div`
    padding: 24px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(24px)
    }
    to {
        opacity: 1;
        transform: translateX(0)
    }
`

export const Infos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h1 {
        font-size: 32px;
        font-weight: 500;
        color: #f3f3f3;
    }

    span {
        font-size: 16px;
        font-weight: 400;
        color: #f3f3f3;
    }
`

export const AvaluationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    animation: ${appearFromLeft} 1s;

    width: ${92 / numItemsPerRow}%;
    height: 148px;
    margin: 16px;

    background-color: #FFF;
    padding: 8px;
    border: 0;
    border-radius: 5px;
`

export const AvaluationNumber = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    label {
        color: #5CA5E9;
        font-size: 16px;
        font-weight: 700;
    }

    span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        color: #5CA5E9;
        font-size: 16px;
        font-weight: 700;

        svg {
            margin-top: -2px;
            margin-left: 2px;
        }
    }
`

export const AvaluationDescription = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
        color: #1D1D23;
        font-size: 16px;
        font-weight: 600;
    }
`

export const AvaluationComments = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    button {
        border: 0;
        background-color: transparent;

        color: #5CA5E9;
        font-size: 16px;
        font-weight: 700;
    }

    span {
        color: #5CA5E9;
        font-size: 16px;
        font-weight: 700;
    }
`