import { SentencePair } from '@/common/types';
import { FC, useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface Props {
	sentencePair: SentencePair;
	index: number;
}

const SentencePair: FC<Props> = ({ sentencePair, index }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		setIsVisible(false);
	}, [sentencePair]);

	const { japanese, english } = sentencePair;

	return (
		<li className="border-b border-gray-200 py-2 text-left">
			<p className="text-lg font-bold">
				{index + 1}.{english}
			</p>
			<div className="mt-2 flex items-center">
				<button
					type="button"
					onClick={() => setIsVisible((s) => !s)}
					role="presentation"
					className="mr-2"
				>
					{isVisible ? (
						<EyeIcon className="h-6 w-6 text-blue-600" />
					) : (
						<EyeSlashIcon className="h-6 w-6 text-blue-600" />
					)}
				</button>
				<div className={`${isVisible ? 'opacity-100' : 'opacity-0'}`}>
					{japanese}
				</div>
			</div>
		</li>
	);
};

export default SentencePair;
