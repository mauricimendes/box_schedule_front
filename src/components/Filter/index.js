import React, { useState, useCallback } from 'react'

import { AiOutlineCalendar } from 'react-icons/ai'
import { FcSearch } from 'react-icons/fc'

import InputMask from 'react-input-mask'

import { Container, Filters } from './styles'

import { useToast } from '../../hooks/toast'

const Filter = ({ open, onFiltered }) => {

    const { addToast } = useToast()

    const [initialDate, setInitialDate] = useState()
    const [finalDate, setFianlDate] = useState()
    const [type, setType] = useState('')
    const [state, setState] = useState('')
    const [active, setActive] = useState('')

    const handleSearch = useCallback(() => {

        if (( initialDate && !finalDate ) || ( !initialDate && finalDate )) {
            addToast({
                type: 'error',
                title: 'Datas Obrigatórias',
                description: 'Necessário um intervalo de datas.'
            })
        } 

        const formatedInitialDate = initialDate ? initialDate.split('/') : '' 
        const formatedFinalDate = finalDate ? finalDate.split('/') : '' 

        const lastDay = Number(formatedFinalDate[0]) + 1

        const filters = {
            initial_date: initialDate ? new Date(`${formatedInitialDate[2]}/${formatedInitialDate[1]}/${formatedInitialDate[0]}`).toISOString() : false,
            final_date: finalDate ? new Date(`${formatedFinalDate[2]}/${formatedFinalDate[1]}/${String(lastDay)}`).toISOString() : false,
            type,
            state,
            active
        }
        onFiltered(filters)
    }, [initialDate, type, state, finalDate, active, addToast])

    return (
        <Container open={open}>
            <Filters>
                <div>
                    <AiOutlineCalendar />
                    <InputMask mask='99/99/9999' value={initialDate} onChange={(e) => setInitialDate(e.target.value)} placeholder='Data inicial' />
                </div>

                <div>
                    <AiOutlineCalendar />
                    <InputMask mask='99/99/9999' value={finalDate} onChange={(e) => setFianlDate(e.target.value)} placeholder='Data final' />
                </div>

                <select onChange={(e) => setType(e.target.value)}>
                    <option value=''>Selecione</option>
                    <option value='schedule'>ATA</option>
                    <option value='rule'>REGRA</option>
                </select>
                <select onChange={(e) => setState(e.target.value)}>
                    <option value=''>Selecione</option>
                    <option value='concluded'>Cocluído</option>
                    <option value='pending'>Pendente</option>
                </select>
                <select onChange={(e) => setActive(e.target.value)}>
                    <option value=''>Selecione</option>
                    <option value='yes'>Ativos</option>
                    <option value='no'>Não ativos</option>
                </select>
                <button onClick={handleSearch}>
                    <FcSearch />
                </button>
            </Filters>
        </Container>
    )
}

export default Filter