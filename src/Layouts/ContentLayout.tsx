import { Outlet } from "react-router-dom";
import Searchbar from "../Components/Searchbar";
const ContentLayout = () => {
    return (
        <div className="border-gray-100 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 border h-[calc(100vh-2rem)] h-screen">
            <Searchbar />
            <Outlet />
        </div>
    )
}

export default ContentLayout
