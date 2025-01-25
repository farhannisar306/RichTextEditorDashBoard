import Logo from '../Logo'
import { Home, User } from 'lucide-react'
import { ReusableNavLink } from '../../widgets/ReusableNavLink'

const Sidebar = () => {
    const menuItems = [
        { icon: <Home size={24} />, label: 'Home', path: '/' },
        {
            icon: <User size={24} />, 
            label: 'Users',
            DropDown: {
                enabled: true,
                values: [
                    { label: 'All Users', path: '/users' },
                    { label: 'A Users', path: '/users:a' },
                    { label: 'B Users', path: '/users:b' },
                    { label: 'C Users', path: '/users:c' },
                ]
            }
        },
    ]

    return (
        <div className='before:inset-0 border-gray-200 bg-white before:bg-gradient-to-b before:from-gray-50 before:to-white before:opacity-50 shadow-[4px_0_15px_rgba(0,0,0,0.05)] border-r w-64 h-screen'>
            <div className='flex flex-col h-full'>
                <div className='flex justify-center items-center border-gray-200/80 bg-gradient-to-b from-white to-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b h-20'>
                    <Logo />
                </div>
                <nav className='flex-1 space-y-1 p-4 overflow-y-auto'>
                    {menuItems.map((item, index) => (
                        <ReusableNavLink
                            key={index}
                            url_path={item.path}
                            className='flex justify-between items-center gap-3 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)] px-4 py-3 rounded-xl transition-all hover:translate-y-[-1px] duration-200'
                            activeClassName='bg-gradient-to-r from-green-50 to-green-100/50 
                                text-green-700 font-medium shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]'
                            dropDown={item.DropDown}
                        >
                            <div className='flex items-center gap-3'>
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </ReusableNavLink>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
