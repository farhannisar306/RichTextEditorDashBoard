import Sidebar from "../Components/Home/Sidebar";
import ContentLayout from "./ContentLayout";

const HomeLayout = () => {
  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <ContentLayout />
      </main>
    </div>
  );
};

export default HomeLayout;
