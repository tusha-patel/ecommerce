"use client"


import { AiFillCaretDown } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import Link from "next/link"
import MenuItems from "./MenuItems"
import { signOut } from "next-auth/react"
import BackDrop from "./BackDrop"
import { safeUser } from "@/types"


interface userMenuProps {
    currentUser: safeUser | null;
}



const UserMenu = ({ currentUser }: userMenuProps) => {
    // console.log(currentUser);


    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative z-30 ">
            <div className=" flex gap-1 items-center
                p-1 border-[1px] border-slate-400 flex-row rounded-full 
                cursor-pointer hover:shadow-md transition text-slate-700
            " onClick={toggleOpen} >
                <Avatar src={currentUser?.image} />
                <AiFillCaretDown />
            </div>
            {isOpen && (
                <div className="absolute rounded-md w-[200px]  p-2
                bg-white overflow-hidden -right-12 top-12 text-sm flex flex-col 
                cursor-pointer shadow-2xl z-30
                " >
                    {currentUser ?
                        (<div>
                            <Link href={"/orders"} >
                                <MenuItems onClick={toggleOpen} >
                                    Your Orders
                                </MenuItems>
                            </Link>
                            <Link href={"/admin"} >
                                <MenuItems onClick={toggleOpen} >
                                    Admin dashboard
                                </MenuItems>
                            </Link>
                            <MenuItems onClick={() => {
                                toggleOpen();
                                signOut()
                            }} >Logout</MenuItems>
                        </div>) :
                        (<div>
                            <Link href={"/login"} >
                                <MenuItems onClick={toggleOpen} >
                                    Login
                                </MenuItems>
                            </Link>
                            <Link href={"/register"} >
                                <MenuItems onClick={toggleOpen} >
                                    Register
                                </MenuItems>
                            </Link>
                        </div>)
                    }
                </div>
            )}
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </div>
    )
}

export default UserMenu