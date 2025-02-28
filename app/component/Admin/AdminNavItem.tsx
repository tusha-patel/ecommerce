interface AdminNavItemProps {
    selected?: boolean;
    icon: any;
    label: string;
}

const AdminNavItem = ({ selected, icon: Icon, label }: AdminNavItemProps) => {
    return (
        <div className={`flex items-center justify-center text-center gap-1
            border-b-2 hover:text-slate-600 transition cursor-pointer pb-2 ${selected ? "border-b-slate-800 text-slate-800" : "border-transparent text-slate-500 "}  `} >
            <Icon size={20} />
            <div className="font-medium text-sm text-center break-normal ">
                {label}
            </div>
        </div>
    )
}

export default AdminNavItem