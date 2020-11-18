import React, { useCallback, useRef, useState } from 'react'

import { useHistory } from 'react-router-dom'

import * as Yup from 'yup'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import Header from '../../components/Header'

import { MdDescription, MdTitle } from 'react-icons/md'

import { Container, Option, Content, Type, Form, Checkbox} from './styles'

import ButtonLogout from '../../components/ButtonLogout'
import Textarea from '../../components/Textarea'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Options = () => {

    const history = useHistory()

    const handleNavigateToListOrders = useCallback(() => {
        history.push('/orders-list')
    }, [history])

    const handleNavigateToListAppointments = useCallback(() => {
        history.push('/appointments-list')
    }, [history])

    const handleNavigateToAvaluations = useCallback(() => {
        history.push('/schedules-list')
    }, [history])

    return (
        <>
        <Option haveMoreThanOneButton>
            <button onClick={handleNavigateToListOrders}><p>ORDENS DE SERVIÇO</p></button>
            <button onClick={handleNavigateToListAppointments}><p>APONTAMENTOS</p></button>
            <button onClick={handleNavigateToAvaluations}><p>AVALIAÇÕES</p></button>
        </Option>
        <ButtonLogout />
        </>
    )
}


const CreateSchedule = () => {

    const formRef = useRef(null)
    const history = useHistory()
    const { signIn, user } = useAuth()
    const { addToast } = useToast()

    const [type, setType] = useState('')
    const [hidden, setHidden] = useState('no')
    const [finaly, setFinaly] = useState('no')

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
                title: Yup.string().required('Título é obrigatório'),
                schedule: Yup.string().required('Pauta é obrigatório'),
            })

            await schema.validate(data, { abortEarly: false })

            const { schedule, description, title } = data

            const dataForm = {
                title,
                schedule,
                description,
                finaly: type === 'rule' ? 'no' : finaly,
                type,
                hidden
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
    }, [signIn, addToast, history, type, hidden, finaly])

    return (
        <>
        <Header
            title='ATA / REGRA'
            options={<Options />}
        />
        <Container>
            <Content>
                <Form ref={formRef} style={{width: '100%'}} onSubmit={handleSubmit}>

                    <Input 
                        name='title'
                        icon={MdTitle}
                        placeholder='Título'
                    />
                
                    <Textarea 
                        name='schedule' 
                        icon={MdDescription} 
                        placeholder='Pauta' 
                        cols="40" 
                        rows="5"    
                    />

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
                    </Type>
                    <Type>

                            <Checkbox>
                                {user.type === 'admin' &&
                                    <>
                                    <input 
                                        type='checkbox'
                                        name='hidden'
                                        value={hidden}
                                        onChange={( value ) => setHidden(value.target.checked ? 'yes' : 'no')}
                                    /> 
                                    <span>Ocultar</span>
                                    </>
                                }
                                {type !== 'rule' ? 
                                    <>
                                    <input 
                                        type='checkbox'
                                        name='finaly'
                                        value={finaly}
                                        onChange={( value ) => setFinaly(value.target.checked ? 'yes' : 'no')}
                                    /> 
                                    <span>Finalizar</span>
                                    </>
                                : ''}
                            </Checkbox>

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