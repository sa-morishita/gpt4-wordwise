import { GetStaticProps, NextPage } from 'next';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { converter, firestore } from '@/common/firebase';
import { WordInfo } from '@/common/types';
import SavedWordsList from '@/components/SavedWordsList';

interface Props {
	wordInfoArray: WordInfo[];
}

export const getStaticProps: GetStaticProps = async () => {
	const ref = query(
		collection(firestore, 'wordInfos').withConverter(converter<WordInfo>()),
		orderBy('createdAt', 'desc')
	);

	const snapshot = await getDocs(ref);

	const wordInfoArray = snapshot.docs.map((snap) => {
		const data = snap.data();
		Object.keys(data).forEach((key) => {
			if (
				(key === 'createdAt' || key === 'updatedAt') &&
				typeof data[key as keyof typeof data] !== 'number'
			) {
				const tmp: any = data[key];
				data[key] = tmp?.toMillis() || 0;
			}
		});
		return data;
	});

	return {
		props: {
			wordInfoArray,
		},
		revalidate: 60,
	};
};

const SavedWordsPage: NextPage<Props> = ({ wordInfoArray }) => {
	console.log(wordInfoArray);

	return (
		<div>
			<SavedWordsList wordInfoArray={wordInfoArray} />
		</div>
	);
};

export default SavedWordsPage;
