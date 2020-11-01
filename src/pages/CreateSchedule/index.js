import React, { useCallback, useRef, useState } from 'react'

import { useHistory } from 'react-router-dom'

import * as Yup from 'yup'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import Header from '../../components/Header'

import { MdTitle, MdDescription } from 'react-icons/md'

import { Container, Infos, Option, Content, Type, Form } from './styles'

import ButtonLogout from '../../components/ButtonLogout'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'


const Options = () => {

    const history = useHistory()

    const handleNavigateToAvaluations = useCallback(() => {
        history.push('/schedules-list')
    }, [history])

    return (
        <>
        <Option>
            {/* <button>APONTAMENTO</button> */}
            <button onClick={handleNavigateToAvaluations}><p>AVALIAÇÕES</p></button>
        </Option>
        <ButtonLogout />
        </>
    )
}


const CreateSchedule = () => {

    const formRef = useRef(null)
    const history = useHistory()
    const { signIn } = useAuth()
    const { addToast } = useToast()

    const [type, setType] = useState('')


    const handleSubmit = useCallback( async ( data ) => {
        if ( !type ) {
            addToast({
                type: 'error',
                title: 'Campo obrigatório',
                description: 'Selecione uma das opções REGRA / ATA para prosseguir.'
            })
        }
        
        try {
            if ( formRef.current ) {
                formRef.current.setErrors({})
            }

            const schema = Yup.object().shape({
                title: Yup.string().required('Titulo obrigatório'),
                description: Yup.string().required('Descrição obrigatória')
            })

            await schema.validate(data, { abortEarly: false })

            const { title, description } = data

            const dataForm = {
                title,
                description,
                type
            }

            await api.post('schedule', dataForm)

            addToast({
                type: 'success',
                title: 'ATA / REGRA inserido',
                description: 'Sua ATA / REGRA foi inserida com sucesso.'
            })

            history.push('/schedules-list')
        } catch ( err ) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)
                if ( formRef.current ) {
                    formRef.current.setErrors(errors)
                }
                return
            }

            addToast({
                type: 'error',
                title: 'Erro na inserção',
                description: 'Ocorreu um erro ao inserir ATA / REGRA, tente novamente.'
            })
        }
    }, [signIn, addToast, history, type])

    return (
        <>
        <Header
            title='ATA / REGRA'
            options={<Options />}
        />
        <Container>
            <Content>
                <Form ref={formRef} style={{width: '100%'}} onSubmit={handleSubmit}>
                    
                    <Input name='title' icon={MdTitle} placeholder='Titulo' />

                    <Textarea 
                        name='description' 
                        icon={MdDescription} 
                        placeholder='Descrição' 
                        cols="40" 
                        rows="5"    
                    />
                    <Type>
                        <div>
                            <input 
                                type='radio' 
                                name='type' 
                                value='rule' 
                                id='typeREGRA'
                                onChange={( value ) => setType(value.target.value)}
                                />
                            <span>REGRA</span>
                            <input 
                                type='radio' 
                                name='type'
                                value='schedule' 
                                id='typeATA'     
                                onChange={( value ) => setType(value.target.value)}
                            />
                            <span>ATA</span>
                        </div>
                        <Button type='submit' >
                            CRIAR
                        </Button>
                    </Type>
                </Form>
            </Content>
        </Container>
        </>
    )
}

export default CreateSchedule