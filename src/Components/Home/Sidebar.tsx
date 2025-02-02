import Logo from '../Logo'
import { Home, User, FileText, Settings } from 'lucide-react'
import { ReusableNavLink } from '../../widgets/ReusableNavLink'

const Sidebar = () => {
    const baseNavLinks = [
        { icon: <Home size={24} />, label: 'Home', path: '/' },
        { icon: <FileText size={24} />, label: 'Articles', path: '/articles' },
        {
            icon: <User size={24} />,
            label: 'Users',
            DropDown: {
                enabled: true,
                values: [
                    { label: 'All Users', path: '/users' },
                    { label: 'Users of category A', path: '/users:a' },
                    { label: 'Users of category B', path: '/users:b' },
                    { label: 'Users of category C', path: '/users:c' },
                ]
            }
        }
    ]

    const accountNavLinks = [
        { icon: <User size={24} />, label: 'Sign Out', path: '/login' },
    ]
    return (
        <div className='relative border-gray-300 bg-gradient-to-b from-white to-gray-50/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] backdrop-blur-sm border-r w-64 h-screen'>
            <div className='flex flex-col h-full'>
                <div className='flex justify-center items-center border-gray-100/80 bg-gradient-to-b from-white via-white to-transparent px-4 border-b h-20'>
                    <Logo size={{ dev_text: 2, talks_text: 2 }} unit="rem" />
                </div>
                <nav className='flex flex-col flex-1 justify-between p-4'>
                    <div className='space-y-2 py-2'>
                        {
                            baseNavLinks.map((item, index) => (
                                <ReusableNavLink
                                    key={index}
                                    url_path={item.path}
                                    className='flex justify-between items-center gap-3 border-gray-100/50 hover:border-gray-200/50 bg-white/50 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-sm px-4 py-3 border rounded-xl transition-all hover:translate-y-[-1px] duration-200'
                                    activeClassName='bg-gradient-to-r from-green-50 to-green-100/50 
                                        text-green-700 font-medium shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]
                                        border-green-100/50'
                                    dropDown={item.DropDown}
                                >
                                    <div className='flex items-center gap-3'>
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                </ReusableNavLink>
                            ))
                        }
                    </div>
                    <div className='space-y-2 border-gray-300 mt-4 pt-4 border-t'>
                        {
                            accountNavLinks.map((item, index) => (
                                <ReusableNavLink
                                    key={index}
                                    url_path={item.path}
                                    className='flex justify-between items-center gap-3 border-gray-100/50 hover:border-gray-200/50 bg-white/50 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-sm px-4 py-3 border rounded-xl transition-all hover:translate-y-[-1px] duration-200'
                                    activeClassName='bg-gradient-to-r from-green-50 to-green-100/50 
                                        text-green-700 font-medium shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]
                                        border-green-100/50'
                                >
                                    <div className='flex items-center gap-3'>
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                </ReusableNavLink>
                            ))
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
