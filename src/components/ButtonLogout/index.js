import React, { useCallback } from 'react'

import { FiPower } from 'react-icons/fi'

import { useAuth } from '../../hooks/auth'

import { Button } from './styles'

const ButtonLogout = () => {

    const { signOut } = useAuth()

    const handleLogout = useCallback(() => {
        signOut()
    }, [signOut])

    return(
        <Button onClick={handleLogout} >
            <FiPower />
        </Button>
    )
}

export default ButtonLogout 