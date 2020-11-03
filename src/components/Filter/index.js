import React, { useState, useCallback } from 'react'

import { AiOutlineCalendar } from 'react-icons/ai'
import { FcSearch } from 'react-icons/fc'

import InputMask from 'react-input-mask'

import { Container, Filters } from './styles'

const Filter = ({ open, onFiltered }) => {

    const [initalDate, setInitalDate] = useState()
    const [finalDate, setFianlDate] = useState()
    const [type, setType] = useState('')
    const [state, setState] = useState('')
    const [active, setActive] = useState('')

    const handleSearch = useCallback(() => {
        const filters = {
            initial_date: initalDate,
            final_date: finalDate,
            type,
            state,
            active
        }
        onFiltered(filters)
    }, [initalDate, type, state, finalDate, active])

    return (
        <Container open={open}>
            <Filters>
                <div>
                    <AiOutlineCalendar />
                    <InputMask mask='99/99/9999' value={initalDate} onChange={(e) => setInitalDate(e.target.value)} placeholder='Data inicial' />
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