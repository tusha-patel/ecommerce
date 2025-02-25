import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../component/Container"
import CardClient from "./CardClient"
import { safeUser } from "@/types"

const Cart = async () => {
    const currentUser = await getCurrentUser() as safeUser | null
    return (
        <div className="pt-8" >
            <Container>
                <CardClient currentUser={currentUser} />
            </Container>
        </div>
    )
}

export default Cart