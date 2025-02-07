import { DataTable } from '../Components/DataTable';
import { useState } from 'react';
import { GetArticles } from '../hooks/GetArticles';
import BounceLoader from '../Components/BounceLoader';
import { columns } from '../DataTableColumns/ArticleColumns';

const ArticlesPage = () => {
    const { isLoading, isError, data } = GetArticles();
    const [selectedArticle, setSelectedArticle] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (article: any) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
        console.log(typeof selectedArticle)
        console.log(isModalOpen)
    };
    const handleDelete = (articles: any[]) => {
        console.log('Deleting articles:', articles);
    };

    if(isLoading) return <BounceLoader />;
    if(isError) return <div className="text-red-600">Error loading articles</div>;

    return (
        <div className="h-full">
            <DataTable
                data={data?.data || []}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                pageSize={10}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                actions={false}
            />
        </div>
    );
};

export default ArticlesPage;
