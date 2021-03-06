import React, { useCallback, useRef, useState } from 'react'

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Link, useHistory } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import { 
    Background, 
    Container, 
    Content,
    AnimationContainer
} from './styles'

import box_schedule from '../../assets/box_schedule.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

const Login = () => {

    const formRef = useRef(null)
    const history = useHistory()

    const { signIn } = useAuth()
    const { addToast } = useToast()

    const [disabled, setDisabled] = useState(false)

    const handleSubmit = useCallback( async ( data ) => {
        setDisabled(true)
        try {
            if ( formRef.current ) {
                formRef.current.setErrors({})
            }

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            })

            await schema.validate(data, { abortEarly: false })

            await signIn({
                email: data.email,
                password: data.password
            })

            addToast({
                type: 'success',
                title: 'Login realizado com sucesso',
                description: 'Bem-vindo(a), você já pode utilizar todas as fuções do Box Schedule.'
            })

            history.push('/schedules')
        } catch ( err ) {
            setDisabled(false)
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)
                if ( formRef.current ) {
                    formRef.current.setErrors(errors)
                }
                return
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            })
        }
    }, [signIn, addToast, history])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    
                    <img src={box_schedule} alt='BoxSchedule' />
                    
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça login</h1>
                    
                        <Input name='email' icon={FiMail} placeholder='E-mail' />
                    
                        <Input name='password' icon={FiLock} type='password' placeholder='Senha' />
                    
                        <Button disabled={disabled} type='submit'>Entrar</Button>
                
                    </Form>
                
                    <Link to='singup'>
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default Login