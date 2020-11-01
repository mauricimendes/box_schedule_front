import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 15vh;
    background-color: #5CA5E9;

    justify-content: space-between;
    align-items: center;

    padding: 48px;
`

export const Info = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
