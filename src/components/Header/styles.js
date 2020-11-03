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
`

export const Options = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
