import React from 'react'
import Container from '../component/Container'
import FormWrap from '../component/FormWrap'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { safeUser } from '@/types'

const Login = async () => {

    const currentUser = await getCurrentUser() as safeUser | null;



    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    )
}

export default Login