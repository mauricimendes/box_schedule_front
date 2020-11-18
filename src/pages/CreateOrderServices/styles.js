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
  
  .button-submit {
    display: flex;
    justify-content: flex-end;
    
    button {
      width: 33%;
    }
  }

  .div-category {
    background: #F3F3F3;
    border-radius: 10px;
    border: 2px solid #5CA5E9;
    padding: 16px;
    width: 100%;
    max-height: 40px;
    color: #5CA5E9;
    display: flex;
    align-items: center;
    margin-top: 8px;

    select {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      color: #5CA5E9;
    }
  }
`
