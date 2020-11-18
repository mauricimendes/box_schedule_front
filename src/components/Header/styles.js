import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 68px;
    background-color: #5CA5E9;

    justify-content: space-between;
    align-items: center;

    padding: 16px 48px;

    @media only screen and (max-width: 768px) {
        padding: 8px;
    }
`


export const Info = styled.div`
    display: flex;
    flex: 1;
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

    @media only screen and (max-width: 768px) {
        h1, span {
            font-size: 16px;
        }
        display: ${props => props.name ? 'none' : 'flex'};
    }
`

export const Title = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 36px;
        font-weight: 700;
        color: #f3f3f3;
    }

    @media only screen and (max-width: 768px) {
        h1 {
            font-size: 16px;
        }
    }
`

export const Options = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    @media only screen and (max-width: 768px) {
        button {
            min-width: 0 !important;
        }

        p {
            font-size: 12px !important;
        }
    }
`
