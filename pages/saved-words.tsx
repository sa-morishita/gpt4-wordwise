import React from 'react';
import Sidebar from '../components/Sidebar';
import SavedWordsList from '@/components/SavedWordsList';

const SavedWords = () => {
	return (
		<div className="flex">
			<Sidebar />
			<main className="w-3/4 p-4">
				<h2 className="mb-4 text-lg font-semibold">保存された単語</h2>
				<SavedWordsList />
			</main>
		</div>
	);
};

export default SavedWords;
