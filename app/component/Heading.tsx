

interface HeadingProps {
    title: string;
    center?: boolean;
}


const Heading = ({ title, center }: HeadingProps) => {
    return (
        <div className={`${center ? "text-center" : "text-start"}`} >
            <h1 className="font-bold " >{title}</h1>
        </div>
    )
}

export default Heading