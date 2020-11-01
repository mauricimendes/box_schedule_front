import React, { useEffect, useCallback, useState } from 'react'

import Modal from 'react-modal'

import { RiStarFill } from 'react-icons/ri'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'

import Header from '../../components/Header'
import ButtonLogout from '../../components/ButtonLogout'

import { 
    Container, 
    Infos, 
    AvaluationContainer,
    AvaluationNumber,
    AvaluationDescription,
    AvaluationComments 
} from './styles'

const Info = () => {
    return (
        <Infos>
            <h1>Maurici</h1>
            <span>27/10/2020 12:45:00</span>
        </Infos>
    )
}

const Options = () => {
    return (
        <>
        <ButtonLogout />
        </>
    )
}

const ListSchedule = () => {

    const { addToast } = useToast()

    const [schedules, setSchedules] = useState([])
    const [comments, setComments] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        api.get('/schedule')
            .then(response => {
                setSchedules(response.data)
            })
            .catch(err => {
                addToast({
                    type: 'error',
                    title: 'Erro na busca',
                    description: 'Não foi possível carregas as avaliações, tente novamente mais tarde.'
                })
            })
    }, [addToast])

    const note = useCallback(avaluations => {
        var total = 0
        for ( var i = 0; i < avaluations.length; i++ ) {
            total = total + avaluations[i].note
        }
        if ( total >= 1 ) {
            return total / avaluations.length
        }
        else {
            return 0
        }
    }, [])

    const handleSeeComments = useCallback((schedule) => {
        setComments(schedule.schedule.avaluation)
        setModal(true)
    }, [])
    
    return (
        <>
        <Modal 
            isOpen={modal}
        />
        <Header 
            info={<Info/>}
            title='AVALIAÇÕES'
            options={<Options />}
        />
        <Container>
            { schedules.map(schedule => (
                <AvaluationContainer key={schedule.schedule.id}>
                    <AvaluationNumber>
                        <label>
                            {schedule.avaluation.length} Avaliações
                        </label>
                        <span>
                            {note(schedule.avaluation ? schedule.avaluation : [])} <RiStarFill />
                        </span>
                    </AvaluationNumber>
                    <AvaluationDescription>
                        <p>
                            {schedule.schedule.description}
                        </p>
                    </AvaluationDescription>
                    <AvaluationComments>
                        <button onClick={() => handleSeeComments(schedule)}>
                            comentários
                        </button>
                        <span>
                            {schedule.schedule.type === 'schedule' ? 'ATA' : 'REGRA'}
                        </span>
                    </AvaluationComments>
                </AvaluationContainer>  
            ))}
        </Container>
        </>
    )
}

export default ListSchedule