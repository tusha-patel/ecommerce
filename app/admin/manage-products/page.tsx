import Container from "@/app/component/Container"
import ManageProductClient from "./ManageProductClient"
import getProducts from "@/actions/getProducts"
import { getCurrentUser } from "@/actions/getCurrentUser";
import { safeUser } from "@/types";
import NullData from "@/app/component/NullData";


const ManageProducts = async () => {

    const products = await getProducts({ category: null }) ;
    const currentUser = await getCurrentUser() as safeUser;

    // console.log(products);

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title="Oops ! access denied" />
    }



    return (
        <Container>
            <ManageProductClient products={products} />
        </Container>
    )
}

export default ManageProducts