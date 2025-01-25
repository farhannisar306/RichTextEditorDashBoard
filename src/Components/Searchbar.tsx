import { Search } from 'lucide-react'

const Searchbar = () => {
    return (
        <div className="relative w-full sm:w-[300px]">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Search size={20} className="text-gray-400" />
            </div>
            <input 
                type="text" 
                placeholder="Search" 
                className="border-gray-300 focus:border-green-500 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] py-2 pr-4 pl-10 border rounded-xl focus:ring-2 focus:ring-green-200 w-full placeholder:text-gray-400 transition-all duration-200 focus:outline-none"
            />
        </div>
    )
}

export default Searchbar
