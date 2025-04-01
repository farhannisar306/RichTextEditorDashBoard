import { Outlet } from "react-router-dom";

const ContentLayout = () => {
    return (
        //টেস্ট কমেন্ট
        //এই ডিভ অরিজিনাল কন্টেন্টের প্যারেন্টকে দেখাবে
        <div className="relative bg-gradient-to-br from-white to-gray-50/30 shadow-[0_4px_24px_rgba(0,0,0,0.03)] backdrop-blur-sm border border-gray-100 h-screen overflow-hidden">
            <div className="relative flex flex-col h-full">
                <div className="flex-1 overflow-auto">
                    <div className="relative bg-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-sm p-6 border border-gray-100 rounded-xl h-full transition-all duration-200">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentLayout
