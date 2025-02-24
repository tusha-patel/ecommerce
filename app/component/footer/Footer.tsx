import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { TiSocialYoutube } from "react-icons/ti";

const Footer = () => {
    return (
        <div className="bg-slate-700 text-slate-200 text-sm mt-16 ">
            <Container>
                <div className="flex flex-col md:flex-row gap-10 justify-between pt-16 pb-8 ">
                    <FooterList>
                        <h3 className="font-bold text-base mb-2 capitalize " >Shop Categories</h3>
                        <Link href={"/"}>Phones</Link>
                        <Link href={"/"}>Laptops</Link>
                        <Link href={"/"}>Desktops</Link>
                        <Link href={"/"}>Watches</Link>
                        <Link href={"/"}>Tvs</Link>
                        <Link href={"/"}>Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-base mb-2 capitalize " >Customers services</h3>
                        <Link href={"/"}>Contact us</Link>
                        <Link href={"/"}>Shipping policy</Link>
                        <Link href={"/"}>Return & Exchanges</Link>
                        <Link href={"/"}>FAQs</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-base mb-2 capitalize " >About us</h3>
                        <p className="mb-2" >
                            At our electronics store , we are dedicated to providing the latest and greatest
                            devices and accessories to our customers ,
                            with a wide selection of phones , tvs ,watches ,and ,accessories.
                        </p>
                        <p>&copy;{new Date().getFullYear()} E-shop . All right reserved</p>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-base mb-2 capitalize " >Follow us</h3>
                        <div className="flex gap-2">
                            <Link href={"#"}>
                                <FaFacebook size={24} />
                            </Link>
                            <Link href={"#"}>
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link href={"#"}>
                                <RiInstagramFill size={24} />
                            </Link>
                            <Link href={"#"}>
                                <TiSocialYoutube size={24} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </div>
    );
}

export default Footer;