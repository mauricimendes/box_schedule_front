import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'
import { BiPlus } from 'react-icons/bi'

import Header from '../../components/Header'
import ButtonLogout from '../../components/ButtonLogout'

import { 
    Container,
    Option,
    ButtonCreateAppointment
} from './styles'

import AppointmentsBlock from '../../components/AppointmentsBlock'

const Options = () => {
    
    const history = useHistory()

    const handleNavigateToListOrders = useCallback(() => {
        history.push('/orders-list')
    }, [history])

    const handleNavigateToCreateAppointments = useCallback(() => {
        history.push('/appointment')
    }, [history])

    const handleNavigateToListSchedules = useCallback(() => {
        history.push('/schedules-list')
    }, [history])

    return (
        <>
        <Option haveMoreThanOneButton>
            <button onClick={handleNavigateToListOrders}><p>ORDENS DE SERVIÇO</p></button>
            <button onClick={handleNavigateToCreateAppointments}><p>CRIAR APONTAMENTO</p></button>
            <button onClick={handleNavigateToListSchedules}><p>AVALIAÇÕES</p></button>
        </Option>
        <ButtonLogout />
        </>
    )
}

const ListAppointments = () => {

    const history = useHistory()

    const { addToast } = useToast()

    const [appointments, setAppointments] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)

    const handleNavigateToCreateAppointments = useCallback(() => {
        history.push('/appointment')
    }, [history])

    useEffect(() => {
        api.get('/appointments')
        .then(response => {
            console.log(response)
            setAppointments(response.data)
        })
        .catch(err => {
            addToast({
                type: 'error',
                title: 'Erro na busca',
                description: 'Não foi possível carregar os apontamentos, tente novamente mais tarde.'
            })
        })
    }, [addToast])

    return (
        <>
        <Header 
            title='APONTAMENTOS'
            options={<Options />}
        />
        <Container>
            {
                appointments.map(appointment => (
                  <AppointmentsBlock
                    created_at={appointment.created_at}
                    title={appointment.title}
                    client_name={appointment.client_name}
                    category={appointment.category}
                    active={false}
                  />
                ))
            }
        </Container>
        <ButtonCreateAppointment><BiPlus onClick={handleNavigateToCreateAppointments}/></ButtonCreateAppointment>
        </>
    )
}

export default ListAppointments