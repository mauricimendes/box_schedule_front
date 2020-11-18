import React, { useCallback, useMemo, useState } from 'react'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
    OrderContainer, 
    OrderNumber, 
    OrderTitle, 
    OrderComments
} from './styles'

const OrderBlock = ({
        id,
        created_at, 
        title,
        expected_hours,
        hours_performed,
        client_name,
        category,
        active,
    }) => {

    const date = useMemo(() => {
        return format(parseISO(created_at), 'dd/MM/yyyy', { locale: ptBR })
    }, [])

    return (
        <OrderContainer active={active}>
            <OrderNumber active={active}>
                    <label>
                        Ordem de serviço
                    </label>
            </OrderNumber>
            <OrderTitle active={active}>
                <p>
                    {title} - {parseFloat((hours_performed * 100 / expected_hours).toFixed(2))}%
                </p>
            </OrderTitle>
            <OrderComments active={active}>
                <span>
                    {id} - {client_name} - {category}
                </span>
                <p>
                    {date}
                </p>
            </OrderComments>
        </OrderContainer>
    )
}

export default OrderBlock