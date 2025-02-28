import Container from '@/app/component/Container'
import React from 'react'
import AddProductForm from './AddProductForm'
import FormWrap from '@/app/component/FormWrap'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { safeUser } from '@/types'
import NullData from '@/app/component/NullData'

const AddProducts = async () => {

    const currentUser = await getCurrentUser() as safeUser;
    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title='Oops ! Access denied' />
    }

    return (
        <div className='p-8' >
            <Container>
                <FormWrap>
                    <AddProductForm />
                </FormWrap>
            </Container>
        </div>
    )
}

export default AddProducts