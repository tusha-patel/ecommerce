import React from 'react'
import Summary from './Summary'
import getOrders from '@/actions/getOrders'
import getProducts from '@/actions/getProducts';
import getUsers from '@/actions/getUsers';
import Container from '../component/Container';
import BarGraph from './BarGraph';
import getGraphData from '@/actions/getGraphData';

const Admin = async () => {

    const orders = await getOrders();
    const products = await getProducts({ category: null });
    const users = await getUsers();

    const graphData = await getGraphData()

    return (
        <div className='mt-8' >
            <Container>
                <Summary products={products} orders={orders} users={users} />
                <div className='mt-4 max-w-[1150px] m-auto' >
                    <BarGraph data={graphData} />
                </div>

            </Container>
        </div>
    )
}

export default Admin