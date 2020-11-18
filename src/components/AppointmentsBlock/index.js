import React, { useCallback, useMemo, useState } from 'react'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
    AppointmentContainer, 
    AppointmentNumber, 
    AppointmentTitle, 
    AppointmentComments
} from './styles'

const AppointmentsBlock = ({ 
        created_at, 
        title,
        client_name,
        category,
        active,
    }) => {

    const date = useMemo(() => {
        return format(parseISO(created_at), 'dd/MM/yyyy', { locale: ptBR })
    }, [])

    return (
        <AppointmentContainer active={active}>
            <AppointmentNumber active={active}>
                    <label>
                        Appontamento
                    </label>
            </AppointmentNumber>
            <AppointmentTitle active={active}>
                <p>
                    {title}
                </p>
            </AppointmentTitle>
            <AppointmentComments active={active}>
                <span>
                    {client_name} - {category}
                </span>
                <p>
                    {date}
                </p>
            </AppointmentComments>
        </AppointmentContainer>
    )
}

export default AppointmentsBlock