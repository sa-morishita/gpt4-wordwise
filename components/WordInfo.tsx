import { WordInfo as WordInfoType } from '@/common/types';
import { FC } from 'react';
import SentencePair from './SentencePair';

interface Props {
	wordInfo: Omit<WordInfoType, 'createdAt' | 'updatedAt'>;
}

const WordInfo: FC<Props> = ({ wordInfo }) => {
	const { word, sentencePairArray, explanation } = wordInfo;

	return (
		<div>
			<div className="text-center">
				<h3 className="mt-3 inline-block border-b-2 border-blue-600 text-2xl font-bold">
					{word}
				</h3>
			</div>
			<ul className="mt-6 space-y-2">
				{sentencePairArray.map((sentencePair, index) => (
					<SentencePair key={index} sentencePair={sentencePair} index={index} />
				))}
			</ul>
			<div className="mx-4 my-8 rounded-lg border border-blue-600 bg-white p-8 text-left">
				<p>{explanation}</p>
			</div>
		</div>
	);
};

export default WordInfo;
