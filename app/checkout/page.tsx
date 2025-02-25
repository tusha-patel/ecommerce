import Container from "../component/Container";
import FormWrap from "../component/FormWrap";
import CheckoutClients from "./CheckoutClients";

const CheckOut = () => {
    return (
        <div className="p-8" >
            <Container>
                <FormWrap>
                    <CheckoutClients />
                </FormWrap>
            </Container>
        </div>
    )
}

export default CheckOut;