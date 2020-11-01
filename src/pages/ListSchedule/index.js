import React, { useEffect, useCallback, useState } from 'react'

import Modal from 'react-modal'

import { RiStarFill } from 'react-icons/ri'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'

import Header from '../../components/Header'
import ButtonLogout from '../../components/ButtonLogout'

import { 
    Container, 
    Infos, 
    AvaluationContainer,
    AvaluationNumber,
    AvaluationTitle,
    AvaluationComments ,
    CommentContainer,
    Close,
    ButtonAvaluation,
    ButtonClose,
    User,
    Comment
} from './styles'
import { useHistory } from 'react-router-dom'

const Options = () => {
    return (
        <>
        <ButtonLogout />
        </>
    )
}

const ListSchedule = () => {

    const history = useHistory()

    const { addToast } = useToast()

    const [schedules, setSchedules] = useState([])
    const [comments, setComments] = useState([])
    const [scheduleAvaluation, setScheduleAvaluation] = useState('')
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
            var note = total / avaluations.length
            return note.toFixed(1)
        }
        else {
            return 0
        }
    }, [])

    const handleSeeComments = useCallback((schedule) => {
        setComments(schedule.avaluation)
        setScheduleAvaluation(schedule.schedule.id)
        setModal(true)
    }, [])

    const handleNavigationToAvaluation = useCallback(() => {
        history.push('/avaluation', { scheduleAvaluation })
    }, [history, scheduleAvaluation])
    
    return (
        <>
        <Modal 
            isOpen={modal}
        >   
            <Close>
                <ButtonAvaluation onClick={handleNavigationToAvaluation}>
                    AVALIAR
                </ButtonAvaluation>
                <ButtonClose onClick={() => setModal(false)}>
                    <IoIosCloseCircleOutline />
                </ButtonClose>
            </Close>
            {comments.map(comment => (
                <CommentContainer key={comment.id} >
                    <User>
                        <h1>
                            {comment.user.name}
                        </h1>
                        <span>
                            {comment.note} <RiStarFill />
                        </span>
                    </User>
                    <Comment>
                        {comment.observation}
                    </Comment>
                </CommentContainer>
            ))}
        </Modal>
        <Header 
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
                    <AvaluationTitle>
                        <p>
                            {schedule.schedule.title}
                        </p>
                    </AvaluationTitle>
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