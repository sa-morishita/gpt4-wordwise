import { WordInfo as WordInfoType } from '@/common/types';
import { FC } from 'react';
import WordInfo from './WordInfo';

interface Props {
	wordInfoArray: WordInfoType[];
}

const SavedWordsList: FC<Props> = ({ wordInfoArray }) => {
	return (
		<div className="mx-auto flex h-screen w-full flex-col items-center overflow-y-scroll pt-4">
			<div className="lg:max-w-3xl">
				{wordInfoArray.map((wordInfo, index) => {
					return <WordInfo wordInfo={wordInfo} key={index} />;
				})}
			</div>
		</div>
	);
};

export default SavedWordsList;
