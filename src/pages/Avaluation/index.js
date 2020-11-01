import React, { useCallback, useRef, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import * as Yup from 'yup'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import Header from '../../components/Header'

import { MdDescription } from 'react-icons/md'
import { RiStarFill } from 'react-icons/ri'

import { Container, Infos, Option, Content, Stars, Form, ButtonStar } from './styles'

import ButtonLogout from '../../components/ButtonLogout'
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
    const location = useLocation()
    const { signIn, user } = useAuth()
    const { addToast } = useToast()

    const [user_id, setUser] = useState(user.id)
    const [schedule, setSchedule] = useState(location.state.scheduleAvaluation)
    const [note, setNote] = useState(0)

    const handleSubmit = useCallback( async ( data ) => {
        try {
            if ( formRef.current ) {
                formRef.current.setErrors({})
            }

            const schema = Yup.object().shape({
                observation: Yup.string().required('Observação obrigatória'),
            })

            await schema.validate(data, { abortEarly: false })

            const { observation } = data

            const dataForm = {
                user_id,
                schedule_id: schedule,
                observation,
                note,
            }

            await api.post('avaluation', dataForm)

            addToast({
                type: 'success',
                title: 'Avaliação',
                description: 'Sua avaliação foi inserida com sucesso.'
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
                description: 'Ocorreu um erro ao avaliar, tente novamente.'
            })
        }
    }, [signIn, addToast, history, note])

    return (
        <>
        <Header
            title='AVALIAÇÃO'
            options={<Options />}
        />
        <Container>
            <Content>
                <Form ref={formRef} style={{width: '100%'}} onSubmit={handleSubmit}>

                    <Textarea 
                        name='observation' 
                        icon={MdDescription} 
                        placeholder='Observação' 
                        cols="40" 
                        rows="5"    
                    />

                    <Stars>
                        <ButtonStar onClick={() => setNote(1)} select={note === 1 ? true : false}><RiStarFill /><p>1</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(2)} select={note === 2 ? true : false}><RiStarFill /><p>2</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(3)} select={note === 3 ? true : false}><RiStarFill /><p>3</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(4)} select={note === 4 ? true : false}><RiStarFill /><p>4</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(5)} select={note === 5 ? true : false}><RiStarFill /><p>5</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(6)} select={note === 6 ? true : false}><RiStarFill /><p>6</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(7)} select={note === 7 ? true : false}><RiStarFill /><p>7</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(8)} select={note === 8 ? true : false}><RiStarFill /><p>8</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(9)} select={note === 9 ? true : false}><RiStarFill /><p>9</p></ButtonStar>
                        <ButtonStar onClick={() => setNote(10)} option10 select={note === 10 ? true : false}><RiStarFill /><p>10</p></ButtonStar>
                    </Stars>
                    
                    <Button type='submit'>AVALIAR</Button>
                </Form>
            </Content>
        </Container>
        </>
    )
}

export default CreateSchedule
