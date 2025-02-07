import { Users, BookOpen, MessageSquare, TrendingUp, Eye, ThumbsUp, Star, GripVertical } from 'lucide-react';
import { GetUsers } from '../hooks/GetUsers';
import { GetArticles } from '../hooks/GetArticles';
import BounceLoader from '../Components/BounceLoader';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const { data: userData, isLoading: usersLoading } = GetUsers();
    const { data: articlesData, isLoading: articlesLoading } = GetArticles();
    const [width, setWidth] = useState(window.innerWidth - 280);

    const [layout] = useState([
        { i: 'metrics', x: 0, y: 0, w: 12, h: 2 },
        { i: 'recent-articles', x: 0, y: 2, w: 6, h: 3 },
        { i: 'recent-users', x: 6, y: 2, w: 6, h: 3 },
    ]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth - 280);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (usersLoading || articlesLoading) return <BounceLoader />;

    const metrics = [
        { title: 'Total Users', value: userData?.data?.length || 0, color: 'bg-blue-500', icon: <Users size={24} /> },
        { title: 'Total Articles', value: articlesData?.data?.length || 0, color: 'bg-green-500', icon: <BookOpen size={24} /> },
        { title: 'Total Comments', value: articlesData?.data?.reduce((acc: number, curr: any) => acc + (curr.comments?.length || 0), 0), color: 'bg-yellow-500', icon: <MessageSquare size={24} /> },
        { title: 'Total Views', value: articlesData?.data?.reduce((acc: number, curr: any) => acc + (curr.views || 0), 0), color: 'bg-purple-500', icon: <TrendingUp size={24} /> },
    ];

    const recentArticles = articlesData?.data?.slice(0, 5) || [];
    const recentUsers = userData?.data?.slice(0, 5) || [];

    return (
        <div className="p-6">
            <GridLayout
                className="layout"
                layout={layout}
                cols={12.5}
                rowHeight={100}
                width={width}
                isDraggable={true}
                isResizable={true}
                margin={[10, 10]}
                containerPadding={[0, 0]}

                draggableHandle=".drag-handle"
            >
                <div key="metrics" className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="flex items-center border-gray-100 p-2 border-b">
                        <div className="p-2 text-gray-400 hover:text-gray-600 cursor-move drag-handle">
                            <GripVertical size={16} />
                        </div>
                        <h2 className="font-semibold text-gray-900">Metrics</h2>
                    </div>
                    <div className="gap-4 grid grid-cols-4 p-4">
                        {metrics.map((metric, index) => (
                            <div key={index} className="flex items-center bg-white rounded-lg">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-600 text-sm truncate">{metric.title}</p>
                                        <p className="font-semibold text-gray-900 text-xl truncate">
                                            {metric.value.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className={`${metric.color} p-2 rounded-full text-white`}>
                                        {metric.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div key="recent-articles" className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="flex items-center border-gray-100 p-2 border-b">
                        <div className="p-2 text-gray-400 hover:text-gray-600 cursor-move drag-handle">
                            <GripVertical size={16} />
                        </div>
                        <h2 className="font-semibold text-gray-900">Recent Articles</h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[calc(100%-48px)] overflow-y-auto">
                        {recentArticles.map((article: any) => (
                            <div key={article.id} className="hover:bg-gray-50 p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-1 items-center space-x-2 min-w-0">
                                        <img
                                            src={article.thumbnail || 'https://via.placeholder.com/32?text=404'}
                                            alt={article.title}
                                            className="flex-shrink-0 rounded-full w-8 h-8 object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 text-sm truncate">{article.title}</p>
                                            <p className="text-gray-500 text-xs truncate">by {article.User?.name || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink-0 items-center space-x-2 text-gray-500 text-xs">
                                        <Eye size={12} />
                                        <span>{article.views || 0}</span>
                                        <ThumbsUp size={12} className="ml-2" />
                                        <span>{article.likes?.length || 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div key="recent-users" className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="flex items-center border-gray-100 p-2 border-b">
                        <div className="p-2 text-gray-400 hover:text-gray-600 cursor-move drag-handle">
                            <GripVertical size={16} />
                        </div>
                        <h2 className="font-semibold text-gray-900">Recent Users</h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[calc(100%-48px)] overflow-y-auto">
                        {recentUsers.map((user: any) => (
                            <div key={user.id} className="hover:bg-gray-50 p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-1 items-center space-x-3 min-w-0">
                                        <img
                                            src={user.avatar || 'https://via.placeholder.com/40?text=404'}
                                            alt={user.name}
                                            className="flex-shrink-0 rounded-full w-10 h-10 object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-gray-500 text-sm truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    {user.isPremium && (
                                        <span className="inline-flex flex-shrink-0 items-center bg-yellow-100 px-2.5 py-0.5 rounded-full font-medium text-xs text-yellow-800">
                                            <Star size={12} className="mr-1" />
                                            Premium
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </GridLayout>
        </div>
    );
};

export default Dashboard;