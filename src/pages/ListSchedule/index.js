import React, { useEffect, useCallback, useState } from 'react'

import Modal from 'react-modal'

import { RiStarFill } from 'react-icons/ri'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'

import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

import Header from '../../components/Header'
import ButtonLogout from '../../components/ButtonLogout'
import ScheduleBlock from '../../components/ScheduleBlock'
import Filter from '../../components/Filter'

import { 
    Container,
    TitleSchedule,
    CommentContainer,
    Close,
    ButtonAvaluation,
    ButtonClose,
    User,
    Comment,
    Option,
    FilterControl
} from './styles'

const Options = () => {
    
    const history = useHistory()

    const handleNavigateToCreateSchedule = useCallback(() => {
        history.push('/schedules')
    }, [history])

    return (
        <>
        <Option>
            <button onClick={handleNavigateToCreateSchedule}><p>CRIAR ATA / REGRA</p></button>
        </Option>
        <ButtonLogout />
        </>
    )
}

const ListSchedule = () => {

    const history = useHistory()

    const { addToast } = useToast()
    const { user } = useAuth()

    const [schedules, setSchedules] = useState([])
    const [comments, setComments] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [descriptionSchedule, setDescriptionSchedule] = useState('')
    const [usersCommented, setUsersCommented] = useState([])
    const [openFilters, setOpenFilters] = useState(false)
    const [filters, setFilters] = useState([])

    const [scheduleAvaluation, setScheduleAvaluation] = useState('')
    const [modal, setModal] = useState(false)

    useEffect(() => {
        console.log(filters)
        api.get('/schedule', {
            params: {
                active: filters.active ? filters.active : undefined,
                final_date: filters.final_date ? filters.final_date : undefined,
                initial_date: filters.initial_date ? filters.initial_date : undefined,
                state: filters.state ? filters.state : undefined,
                type: filters.type ? filters.type : undefined,
            }
        })
            .then(response => {
                console.log(response)
                setSchedules(response.data[0])
                setTotalUsers(response.data[1].total_users)
            })
            .catch(err => {
                addToast({
                    type: 'error',
                    title: 'Erro na busca',
                    description: 'Não foi possível carregas as avaliações, tente novamente mais tarde.'
                })
            })
    }, [addToast, filters])

    const handleSeeComments = useCallback((schedule) => {
        setDescriptionSchedule(schedule.schedule.description)
        setUsersCommented(schedule.avaluation.map(avaluations => avaluations.user_id))
        setComments(schedule.avaluation)
        setScheduleAvaluation(schedule.schedule.id)
        setModal(true)
    }, [])

    const handleDeleteSchedule = useCallback(( id ) => {
        const data = { id }
        api.patch('/schedule/delete', data)
            .then(response => {
                window.location.reload()
            })
            .catch(err => {
                addToast({
                    type: 'error',
                    title: 'Erro ao excluir',
                    description: 'Não foi possível excluir a ATA / REGRA, tente novamente mais tarde.'
                })
            })
    }, [history])

    const handleAlterSchedule = useCallback(( schedule ) => {
        history.push('/schedule-edit', { schedule })
    }, [])

    const handleNavigationToAvaluation = useCallback(() => {
        history.push('/avaluation', { scheduleAvaluation })
    }, [history, scheduleAvaluation])

    const handleFilter = useCallback((filtered) => {
        setFilters(filtered)
    }, [])

    return (
        <>
        <Modal 
            isOpen={modal}
        >   
            <Close>
                {
                   usersCommented.find(ids => ids === user.id) 
                   ?
                        <span>avaliado</span>
                   : 
                    <ButtonAvaluation onClick={handleNavigationToAvaluation}>
                        AVALIAR
                    </ButtonAvaluation>
                }
                <ButtonClose onClick={() => setModal(false)}>
                    <IoIosCloseCircleOutline />
                </ButtonClose>
            </Close>
            <TitleSchedule>
                <span>Descrição:</span> <label>{descriptionSchedule}</label>
            </TitleSchedule>
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
        <FilterControl>
            <button onClick={() => setOpenFilters(!openFilters)}>
                Filtros <FaFilter />
            </button>
        </FilterControl>
        <Filter open={openFilters} onFiltered={handleFilter} />
        <Container>
            {
                schedules.map(schedule => (
                    <ScheduleBlock
                        key={schedule.schedule.id}
                        numberAvaluations={`${totalUsers}/${schedule.avaluation.length}`}
                        avaluation={schedule.avaluation ? schedule.avaluation : []}
                        title={schedule.schedule.title}
                        created_at={schedule.schedule.created_at}
                        hidden={schedule.schedule.hidden}
                        active={schedule.schedule.active}
                        type={schedule.schedule.type}
                        state={schedule.schedule.state}
                        schedule={schedule}
                        onDelete={handleDeleteSchedule}
                        onAlter={handleAlterSchedule}
                        onOpenComments={handleSeeComments}
                    />
                ))
            }
        </Container>
        </>
    )
}

export default ListSchedule