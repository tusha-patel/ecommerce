import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "../component/NullData";
import Container from "../component/Container";
import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { safeUser } from "@/types";


const Orders = async () => {

    const currentUser = await getCurrentUser() as safeUser;

    const orders = await getOrdersByUserId(currentUser?.id)
    if (!currentUser) {
        return <NullData title="Oops ! access denied .. " />
    }
    if (!orders) {
        return <NullData title="No orders yet.. " />
    }

    return (
        <div className="pt-8" >
            <Container>
                <OrderClient orders={orders} />
            </Container>
        </div>
    )
}

export default Orders