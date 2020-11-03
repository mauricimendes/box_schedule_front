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

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 48px;
    animation: ${appearFromLeft} 0.5s;
`

export const User = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h1 {
        font-size: 24px;
        color: #ABDBB2;
        font-weight: 700;
    }

    span {
        font-size: 24px;
        color: #5CA5E9;
        font-weight: 700;

        svg {
            margin-bottom: -2px;
            margin-left: 2px
        }
    }
`

export const Comment = styled.p`
    color: #1D1D23;
    font-size: 18px;
    font-weight: 600;
`

export const Close = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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

export const ButtonClose = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: ceter;
    align-items: center;

    border: 0;
    background-color: transparent;

    svg {
        font-size: 36px;
        color: #c53030;
    }
`

export const ButtonAvaluation = styled.button`
    background-color: #ABDBB2;
    padding: 8px;
    border: 0;
    border-radius: 5px;

    color: #f3f3f3;
    font-size: 16px;
    font-weight: 700;

    min-width: 120px;
`

export const TitleSchedule = styled.div`
    span {
        font-size: 24px;
        margin-top: 24px;
        font-weight: 700;
        color: #1D1D23;
    }
    label {
        font-size: 24px;
        margin-top: 24px;
        color: #1D1D23;
    }
    margin-bottom: 16px;
`

export const FilterControl = styled.div`
    display: flex;
    width: 100%;
    padding: 16px 48px;
    justify-content: flex-end;

    button {
        border: 0;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;

        color: #5CA5E9;
        font-size: 20px;
    }
`
