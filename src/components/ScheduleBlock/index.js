import React, { useCallback, useMemo, useState } from 'react'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { RiStarFill, RiPencilFill, RiChatCheckFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { FiAlertCircle } from 'react-icons/fi'

import { 
    AvaluationContainer, 
    AvaluationNumber, 
    AvaluationTitle, 
    AvaluationComments,
    AvaluationDate,
    Buttons,
    ButtonAlter,
    ButtonDelete,
    ButtonAssurance
} from './styles'

const ScheduleBlock = ({ 
        numberAvaluations, 
        avaluation, 
        created_at, 
        title, 
        hidden, 
        type, 
        state, 
        schedule, 
        active,
        onDelete,
        onAlter,
        onOpenComments
    }) => {

    const [id, setId] = useState(schedule.schedule.id)
    const [assurance, setAssurance] = useState(false)
    
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

    const handleDelete = useCallback(() => {
        onDelete(id)
    }, [id])

    const handleAlter = useCallback(() => {
        onAlter(schedule)
    }, [schedule])

    const handleComment = useCallback(() => {
        onOpenComments(schedule)
    }, [schedule])

    const date = useMemo(() => {
        return format(parseISO(created_at), 'dd/MM/yyyy', { locale: ptBR })
    }, [])

    return (
        <AvaluationContainer key={id} active={active} occult={hidden}>
            <AvaluationNumber active={active} occult={hidden}>
                {type === 'rule' ? 
                    <label>
                        {numberAvaluations} Avaliações
                    </label>
                : 
                    <label>
                        PAUTA
                    </label>
                }
                {type === 'rule' && 
                    <span>
                        {note(avaluation)} <RiStarFill />
                    </span>
                }
            </AvaluationNumber>
            <AvaluationTitle active={active} occult={hidden}>
                <p>
                    {title}
                </p>
            </AvaluationTitle>
            <AvaluationDate active={active} occult={hidden}>
                <p>
                    {date}
                </p>
            </AvaluationDate>
            <AvaluationComments active={active} occult={hidden}>
                <span>
                    { type === 'schedule' ? 'ATA' : 'REGRA' } 
                    { active === 'no' ? ' (EXCLUÍDO)' : state === 'pending' ? ' (PENDENTE)' : ' (CONCLUÍDO)'}
                </span>
                {
                    active === 'yes' &&
                    <Buttons>
                        <ButtonAlter onClick={type === 'schedule' ? handleAlter : handleComment} active={active} occult={hidden}>
                            { type === 'schedule' ? <RiPencilFill /> : <RiChatCheckFill /> }
                        </ButtonAlter>
                        { assurance ? 
                            <ButtonAssurance>
                                <FiAlertCircle active={active} onClick={handleDelete} occult={hidden}/>
                            </ButtonAssurance>
                        : 
                            <ButtonDelete active={active} onClick={() => setAssurance(true)} occult={hidden}>
                                <MdDelete />
                            </ButtonDelete>
                        }
                    </Buttons>
                }
            </AvaluationComments>
        </AvaluationContainer>
    )
}

export default ScheduleBlock