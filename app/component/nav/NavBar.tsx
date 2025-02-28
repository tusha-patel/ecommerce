import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google"
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { safeUser } from "@/types";
import Categories from "./Categories";
import SeacrchBar from "./SeacrchBar";

const redRessed = Redressed({ subsets: ['latin'], weight: ["400"] })

const NavBar = async () => {
    const currentUser = await getCurrentUser() as safeUser | null;
    return (
        <div className="sticky top-0 left-0 w-full bg-slate-200 z-30 shadow-sm ">
            <div className="py-4 border-b=[1px]">
                <Container>
                    <div className="flex justify-between items-center gap-3 md:gap-0 " >
                        <Link href={"/"} className={`${redRessed.className} font-bold text-2xl `} > E-shop</Link>
                        <div className="hidden md:block" >
                            <SeacrchBar />
                        </div>
                        <div className="flex items-center gap-8 md:gap-12 ">
                            <div>
                                <CartCount />
                            </div>
                            <div>
                                <UserMenu currentUser={currentUser} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
}

export default NavBar;