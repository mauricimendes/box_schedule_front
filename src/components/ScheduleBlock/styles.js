import styled, { keyframes } from 'styled-components'
const numItemsPerRow = 3;

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

export const AvaluationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    animation: ${appearFromLeft} 1s;

    width: ${92 / numItemsPerRow}%;
    height: 148px;
    margin: 16px;

    background-color: ${props => props.active === 'no' ? '#F6DBDB' : props.active === 'yes' && props.occult === 'yes' ? '#BEBEBE' : '#fff'} ;
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
        color: ${props => props.active === 'no' ? '#A98282' : props.active === 'yes' && props.occult === 'yes' ? '#FFFFFF' : '#5CA5E9'};
        font-size: 16px;
        font-weight: 700;
    }

    span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        color: ${props => props.active === 'no' ? '#A98282' : props.active === 'yes' && props.occult === 'yes' ? '#FFFFFF' : '#ABDBB2'};
        font-size: 16px;
        font-weight: 700;

        svg {
            margin-top: -2px;
            margin-left: 2px;
        }
    }
`

export const AvaluationTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
        color: ${props => props.active === 'no' ? '#A98282' : props.active === 'yes' && props.occult === 'yes' ? '#FFFFFF' : '#1D1D23'};
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
    }
`

export const AvaluationComments = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    span {
        color: ${props => props.active === 'no' ? '#A98282' : props.active === 'yes' && props.occult === 'yes' ? '#FFFFFF' : '#5CA5E9'};
        font-size: 16px;
        font-weight: 700;
    }
`

export const AvaluationDate = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    p {
        font-size: 16px;
        color: ${props => props.active === 'no' ? '#A98282' : props.active === 'yes' && props.occult === 'yes' ? '#FFFFFF' : '#ABDBB2'};
        font-weight: 700;
    }
`

export const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ButtonAlter = styled.button`
    border: 0;
    background-color: transparent;

    svg {
        font-size: 18px;
        margin-left: 8px;
        color: ${props => props.occult === 'yes' ? '#FFFFFF' : '#ABDBB2'};
    }
`

export const ButtonDelete = styled.button`
    border: 0;
    background-color: transparent;

    svg {
        font-size: 18px;
        margin-left: 8px;
        color: ${props => props.occult === 'yes' ? '#FFFFFF' : '#CF6565'};
    }
`

export const ButtonAssurance = styled.button`
    border: 0;
    background-color: transparent;

    svg {
        font-size: 18px;
        margin-left: 8px;
        color: ${props => props.occult === 'yes' ? '#FFFFFF' : '#CF6565'};
    }
`