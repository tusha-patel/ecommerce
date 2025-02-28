import AdminNav from "../component/Admin/AdminNav"

export const metadata = {
    title: "E-shop Admin ",
    description: "E-shop admin dashboard "
}




const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AdminNav />
            {children}
        </div>
    )
}

export default AdminLayout