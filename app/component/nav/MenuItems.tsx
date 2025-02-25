import React from 'react'

interface MenuItemsPops {
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItems = ({ children, onClick }: MenuItemsPops) => {
    return (
        <div onClick={onClick} className='px-4 py-3 hover:bg-neutral-100 ' >
            {children}
        </div>
    )
}

export default MenuItems