import { IconType } from "react-icons";


interface StatusProps {
    text: string;
    icon: IconType;
    bg: string;
    color: string;
}

const Status = ({ text, icon: Icon, bg, color }: StatusProps) => {
    return (
        <div className={`flex items-center ${bg} ${color} px-1 gap-1  rounded text-sm  `} >
            {text}
            <Icon size={15} />
        </div>
    )
}

export default Status