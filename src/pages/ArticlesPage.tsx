import { DataTable } from '../Components/DataTable';
import { useState } from 'react';
import Modal from '../Components/Modal';
import DynamicEditForm from '../Components/DynamicEditForm';
import { GetArticles } from '../hooks/GetArticles';
import BounceLoader from '../Components/BounceLoader';
import { columns } from '../static/ArticleColumns';

const ArticlesPage = () => {
    const { isLoading, isError, data } = GetArticles();
    const [selectedArticle, setSelectedArticle] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (article: any) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleDelete = (articles: any[]) => {
        console.log('Deleting articles:', articles);
    };

    const handleSave = (updatedArticle: any) => {
        console.log('Saving article:', updatedArticle);
        setIsModalOpen(false);
    };

    if(isLoading) return <BounceLoader />;
    if(isError) return <div className="text-red-600">Error loading articles</div>;

    // data && console.log(data.data)

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

            {/* <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Edit ${selectedArticle?.title || 'Article'}`}
            >
                {selectedArticle && (
                    <DynamicEditForm
                        type="articlesInfoEdit"
                        data={selectedArticle}
                        columns={columns}
                        onSave={handleSave}
                        onCancel={() => setIsModalOpen(false)}
                    />
                )}
            </Modal> */}
        </div>
    );
};

export default ArticlesPage;
