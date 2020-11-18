import styled, { keyframes } from 'styled-components';
import { Form as FormApp } from '@unform/web';

export const Option = styled.div`
  button {
      background-color: #ABDBB2;
      border: 0;
      border-radius: 5px;
      padding: 8px;
      min-width: 160px;
      margin-left: ${props => props.haveMoreThanOneButton ? '10px' : 'none'};

      p {
          font-size: 16px;
          font-weight: 700;
          color: #f3f3f3;
          font-family: 'Nunito', sans-serif; 
      }
  }
`

export const Container = styled.div`
  height: 85vh;
`

export const Content = styled.main`
  height: 100%;
  max-width: 1120px;
  margin: auto;
  padding: 24px;
  display: flex;
  background-color: #FFFFFF;
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
  width: 100%;
  
  .search-input {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 8px;

    .div-input {
      width: 66%;
      position: relative;

      .data-search {
        position: absolute;
        left: 0;
        width: 100%;
        background: #f2f2f2;
        border-radius: 5px;
        border: 1px solid;

        ul {
          padding: 0;
          list-style: none;

          li {
            display: flex;
            justify-content: space-around;
            padding: 10px;
            background: #f2f2f2;
            cursor: pointer;
            border-radius: 5px;
          }

          li:hover {
            background: #f0f0f0;
          }
        }
      }
    }

    button {
      margin-top: 0;
      width: 33%;
    }
  }

  .data-appointments {
    h4 > span {
      color: #5CA5E9;
    }

    > h4 {
      margin: 1.5rem 0;
    }

    .grid-data-appointments {
      width: 75%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin: 1.5rem 0;
    }
  }

  .data-appointments-date {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 1.5rem 0;
    column-gap: 8px;

    > div {
      margin: 0;
    }
  }

  .button-submit {
    display: flex;
    justify-content: flex-end;
    
    button {
      width: 33%;
    }
  }
`
