import { ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface DropDownValues {
    label: string
    path: string
}

interface DropDown {
    enabled: boolean
    values: DropDownValues[]
}

interface ReusableNavLinkProps {
    url_path: string | undefined
    children: ReactNode
    className?: string
    activeClassName?: string
    dropDown?: DropDown
}

export const ReusableNavLink = ({ url_path, children, className, activeClassName, dropDown }: ReusableNavLinkProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleDropdownClick = (e: React.MouseEvent) => {
        if (dropDown?.enabled) {
            e.preventDefault()
            setIsOpen(!isOpen)
        }
    }

    const shouldShowActive = !dropDown?.enabled || url_path !== undefined

    return (
        <div className="relative group">
            <NavLink
                to={url_path || '#'}
                onClick={handleDropdownClick}
                className={({ isActive }) => `
                    ${className}
                    ${shouldShowActive && isActive ? activeClassName : 'text-gray-700'}
                    relative overflow-hidden
                    before:absolute before:inset-0 before:bg-gray-50 before:scale-x-0 before:opacity-0 
                    before:origin-left hover:before:scale-x-100 hover:before:opacity-100
                    before:transition-all before:duration-300 before:-z-10
                `.trim()}
            >
                {children}
                {dropDown?.enabled && (
                    <motion.div
                        animate={{ 
                            rotate: isOpen ? 90 : 0,
                            color: isOpen ? '#16a34a' : '#374151'
                        }}
                        transition={{ duration: 0.2 }}
                        className="transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.div>
                )}
            </NavLink>

            <AnimatePresence>
                {isOpen && dropDown?.enabled && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-0.5 mt-1 ml-9">
                            {dropDown.values.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className={({ isActive }) => `
                                        block px-4 py-2 text-sm rounded-md transition-all duration-200
                                        relative overflow-hidden
                                        before:absolute before:inset-0 before:bg-gray-50 before:scale-x-0 before:opacity-0 
                                        before:origin-left hover:before:scale-x-100 hover:before:opacity-100
                                        before:transition-all before:duration-300 before:-z-10
                                        ${isActive 
                                            ? 'bg-green-50 text-green-600 font-medium' 
                                            : 'text-gray-600 hover:text-gray-900'
                                        }
                                    `.trim()}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}