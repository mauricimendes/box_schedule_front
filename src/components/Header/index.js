import React from 'react'

import { Container, Info, Title, Options } from './styles'

const Header = ({ info, title, options }) => {
    return (
        <Container>
            <Info>
                {info}
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