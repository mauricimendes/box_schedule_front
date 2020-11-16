import React, { useCallback, useRef, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

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

    const handleNavigateToAvaluations = useCallback(() => {
        history.push('/schedules-list')
    }, [history])

    return (
        <>
        <Option>
            <button onClick={handleNavigateToAvaluations}><p>AVALIAÇÕES</p></button>
        </Option>
        <ButtonLogout />
        </>
    )
}


const EditSchedule = () => {

    const formRef = useRef(null)
    const history = useHistory()
    const { signIn, user } = useAuth()
    const { addToast } = useToast()
    const location = useLocation()

    const [initialData, setInitialData] = useState(location.state.schedule.schedule)
    const [type, setType] = useState('schedule')
    const [hidden, setHidden] = useState(initialData.hidden)
    const [finaly, setFinaly] = useState(initialData.state === 'concluded' ? 'yes' : 'no')
    const [disabled, setDisabled] = useState(false)

    const handleSubmit = useCallback( async ( data ) => {
        if ( !type ) {
            addToast({
                type: 'error',
                title: 'Campo obrigatório',
                description: 'Selecione uma das opções REGRA / ATA para prosseguir.'
            })
        }
        setDisabled(true)
        try {
            if ( formRef.current ) {
                formRef.current.setErrors({})
            }

            const schema = Yup.object().shape({
                title: Yup.string().required('Titulo obrigatório'),
                description: Yup.string().required('Descrição obrigatória')
            })

            await schema.validate(data, { abortEarly: false })

            const { schedule, title, description } = data

            const dataForm = {
                id: initialData.id,
                title,
                schedule,
                description,
                finaly,
                type,
                hidden
            }

            await api.patch('schedule', dataForm)

            addToast({
                type: 'success',
                title: 'ATA / REGRA alterada',
                description: 'Sua ATA / REGRA foi alterada com sucesso.'
            })

            history.push('/schedules-list')
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
                title: 'Erro na inserção',
                description: 'Ocorreu um erro ao inserir ATA / REGRA, tente novamente.'
            })
        }
    }, [signIn, addToast, history, type, hidden, initialData, finaly])

    return (
        <>
        <Header
            title='ATA / REGRA'
            options={<Options />}
        />
        <Container>
            <Content>
                <Form initialData={initialData} ref={formRef} style={{width: '100%'}} onSubmit={handleSubmit}>

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
                                checked
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
                                    checked={hidden === 'yes' ? true : false}
                                    value={hidden}
                                    onChange={( value ) => setHidden(value.target.checked ? 'yes' : 'no')}
                                /> 
                                <span>Ocultar</span>
                                </>
                            }
                            <input 
                                type='checkbox'
                                name='finaly'
                                checked={finaly === 'yes' ? true : false}
                                value={finaly}
                                onChange={( value ) => setFinaly(value.target.checked ? 'yes' : 'no')}
                            /> 
                            <span>Finalizar</span>
                            </Checkbox>

                        <Button disabled={disabled} type='submit' >
                            ALTERAR
                        </Button>
                    
                    </Type>
                </Form>
            </Content>
        </Container>
        </>
    )
}

export default EditSchedule