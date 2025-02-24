import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"


interface AvatarProps {
    src?: string | null | undefined
}


const Avatar = ({ src }: AvatarProps) => {
    if (src) {
        return (
            <Image src={src} height="30" width={30} alt="Avatar image" className="rounded-full" sizes="100"  />
        )
    }
    return <FaUserCircle size={24} />
}

export default Avatar