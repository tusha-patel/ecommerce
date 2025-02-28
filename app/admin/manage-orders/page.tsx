import Container from "@/app/component/Container"
import ManageOrderClient from "./ManageOrderClient"
import getOrders from "@/actions/getOrders"
import { getCurrentUser } from "@/actions/getCurrentUser";
import { safeUser } from "@/types";
import NullData from "@/app/component/NullData";


const ManageOrders = async () => {
    const orders = await getOrders();
    const currentUser = await getCurrentUser() as safeUser;

    // console.log(products);

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title="Oops ! access denied" />
    }


    return (
        <div>
            <Container>
                <ManageOrderClient orders={orders} />
            </Container>
        </div>
    )
}

export default ManageOrders