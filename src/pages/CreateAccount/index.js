import React, { useRef, useCallback, useState } from 'react'

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Link, useHistory } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'

import { 
    Background, 
    Container, 
    Content,
    AnimationContainer,
    Checkbox
} from './styles'

import box_schedule from '../../assets/box_schedule.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

const Login = () => {

    const formRef = useRef(null)
    const { addToast } = useToast()
    const history = useHistory()

    const [type, setType] = useState('team')

    const handleSubmit = useCallback( async ( data ) => {
        try {
            if ( formRef.current ) {
                formRef.current.setErrors({})
            }
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password'), undefined],
                    'Confirmação incorreta',
                )
            })

            await schema.validate(data, { abortEarly: false })

            const { email, name, password } = data

            const dataForm = {
                email,
                name,
                password,
                type
            }

            await api.post('/users', dataForm)

            history.push('/')

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber!'
            })

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)
                if ( formRef.current ) {
                    formRef.current.setErrors(errors)
                }
                return
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
            })
        }
    }, [addToast, history, type])
    
    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    
                    <img src={box_schedule} alt='BoxSchedule' />
                    
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Crie sua conta</h1>

                        <Input name='name' icon={FiUser} placeholder='Nome' />

                        <Input name='email' icon={FiMail} placeholder='E-mail' />
                    
                        <Input 
                            name='password' 
                            icon={FiLock} 
                            type='password' 
                            placeholder='Senha' 
                        />

                        <Input 
                            name='password_confirmation' 
                            icon={FiLock} 
                            type='password' 
                            placeholder='Confirme a senha' 
                        />

                        <Checkbox>
                            <input type='checkbox' value={type} onChange={(value) => setType(value.target.checked ? 'admin' : 'team')} name='type' />
                            <span>Admin</span>
                        </Checkbox>
                    
                        <Button type='submit'>Criar</Button>
                
                    </Form>
                
                    <Link to='/'>
                        <FiArrowLeft />
                        Voltar para login
                    </Link>

                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default Login