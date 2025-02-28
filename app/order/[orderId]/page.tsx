import Container from '@/app/component/Container';
import React from 'react'
import OrderDetails from './OrderDetails';
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/component/NullData';

interface ParamsProps {
    orderId?: String | any;
}

const Order = async ({ params }: { params: ParamsProps }) => {

    const order = await getOrderById(params);

    if (!order) return <NullData title='No order' />

    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order} />
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>
                </div>
            </Container>
        </div>
    )
}

export default Order