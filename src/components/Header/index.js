import React, { useMemo } from 'react'

import { useAuth } from '../../hooks/auth'

import { Container, Info, Title, Options } from './styles'

const Header = ({ title, options }) => {

    const { user } = useAuth()
    
    const name = useMemo(() => {
        const name_separed = user.name.split(' ')
        return name_separed[0]
    }, [user])

    return (
        <Container>
            <Info>
                <h1>{name}</h1>
            </Info>
            <Title>
                <h1>{title}</h1>
            </Title>
            <Options>
                { options }
                <div>
                    &nbsp;
                    &nbsp;
                </div>
            </Options>
        </Container>
    )
}

export default Header