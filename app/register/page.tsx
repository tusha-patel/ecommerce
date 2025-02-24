import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "../component/Container"
import FormWrap from "../component/FormWrap"
import RegisterForm from "./RegisterForm"
import { safeUser } from "@/types"


const Register = async () => {

    const currentUser = await getCurrentUser() as safeUser | null;

    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    )
}

export default Register