import { DataTable } from '../Components/DataTable';
import { useState } from 'react';
import Modal from '../Components/Modal';
import DynamicEditForm from '../Components/DynamicEditForm';
import { GetUsers } from '../hooks/GetUsers';
import BounceLoader from '../Components/BounceLoader';
import { columns } from '../DataTableColumns/UserColumns';


export const UsersPage = () => {
    const { isLoading, isError, data } = GetUsers()
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (users: any[]) => {
        console.log('Deleting users:', users);
    };

    const handleSave = (updatedUser: any) => {
        console.log('Saving user:', updatedUser);
        setIsModalOpen(false);
    };

    if(isLoading) return <BounceLoader />;
    if(isError) return <div className="text-red-600">Error loading users</div>;

    data && console.log(data.data)
    return (
        <div className="h-full">
            <DataTable
                data={data?.data || []}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                actions={true}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Edit ${selectedUser?.name || 'Record'}`}
            >
                {selectedUser && (
                    <DynamicEditForm
                        type="userInfoEdit"
                        data={selectedUser}
                        columns={columns}
                        onSave={handleSave}
                        onCancel={() => setIsModalOpen(false)}
                    />
                )}
            </Modal>
        </div>
    );
};