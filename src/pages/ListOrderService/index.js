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

import OrderBlock from '../../components/OrderBlock'

const Options = () => {
    
    const history = useHistory()

    const handleNavigateToCreateOrders = useCallback(() => {
        history.push('/orders-service')
    }, [history])

    const handleNavigateToListAppointments = useCallback(() => {
        history.push('/appointments-list')
    }, [history])

    const handleNavigateToListSchedules = useCallback(() => {
        history.push('/schedules-list')
    }, [history])

    return (
        <>
        <Option haveMoreThanOneButton>
            <button onClick={handleNavigateToCreateOrders}><p>CRIAR ORDEM</p></button>
            <button onClick={handleNavigateToListAppointments}><p>APONTAMENTOS</p></button>
            <button onClick={handleNavigateToListSchedules}><p>AVALIAÇÕES</p></button>
        </Option>
        <ButtonLogout />
        </>
    )
}

const ListAppointments = () => {

    const history = useHistory()

    const { addToast } = useToast()

    const [orders, setOrders] = useState([])

    const handleNavigateToCreateOrders = useCallback(() => {
        history.push('/orders-service')
    }, [history])

    useEffect(() => {
        api.get('/orderservice')
        .then(response => {
            setOrders(response.data)
        })
        .catch(err => {
            addToast({
                type: 'error',
                title: 'Erro na busca',
                description: 'Não foi possível carregas as ordens de serviço, tente novamente mais tarde.'
            })
        })
    }, [addToast])

    return (
        <>
        <Header 
            title='ORDENS DE SERVIÇO'
            options={<Options />}
        />
        <Container>
            {
                orders.map(order => (
                  <OrderBlock
                    id={order.id}
                    created_at={order.created_at}
                    title={order.title}
                    expected_hours={order.expected_hours}
                    hours_performed={order.hours_performed}
                    client_name={order.client_name}
                    category={order.category.category}
                    active={false}
                  />
                ))
            }
        </Container>
        <ButtonCreateAppointment><BiPlus onClick={handleNavigateToCreateOrders}/></ButtonCreateAppointment>
        </>
    )
}

export default ListAppointments