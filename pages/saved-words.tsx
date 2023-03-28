import { GetStaticProps, NextPage } from 'next';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { converter, firestore } from '@/common/firebase';
import { WordInfo } from '@/common/types';
import SavedWordsList from '@/components/SavedWordsList';
import Head from 'next/head';

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
	};
};

const SavedWordsPage: NextPage<Props> = ({ wordInfoArray }) => {
	return (
		<div>
			<Head>
				<title>WordWise</title>
				<meta name="description" content="英語学習用Webアプリケーション" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SavedWordsList wordInfoArray={wordInfoArray} />
		</div>
	);
};

export default SavedWordsPage;
