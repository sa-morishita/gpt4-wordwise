import { converter, firestore } from '@/common/firebase';
import { ApiResponse, WordInfo as WordInfoType } from '@/common/types';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FC, FormEvent, KeyboardEvent, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import WordInfo from './WordInfo';

const InputWord: FC = () => {
	const [input, setInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const [wordInfo, setWordInfo] = useState<Omit<
		WordInfoType,
		'createdAt' | 'updatedAt'
	> | null>(null);

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput(e.target.value);
		},
		[]
	);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (input.trim() === '') {
			return toast.error('英語を入力してください');
		}
		setIsLoading(true);
		try {
			const response = await axios.post<ApiResponse>('/api/getWordInfo', {
				prompt: input,
			});

			console.log('response.data', response.data);
			const array = await response.data.text
				.replace(/\d+\./g, '')
				.replace('##', '#')
				.split('#');

			const sentencePairArray = array
				.filter((_, index) => index % 2 !== 0)
				.map((japanese, index) => {
					const english = array[index * 2];
					return { japanese, english };
				});

			const data = {
				word: input,
				sentencePairArray,
				explanation: array[6],
			};
			setWordInfo(data);

			setIsSaved(false);

			toast.success('GPT-4による例文が届きました！');
			setIsLoading(false);
			setInput('');
		} catch (error) {
			console.error('Error fetching example sentences:', error);
			toast.error('エラーが発生しました。');
			setIsLoading(false);
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleSave = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!wordInfo) return;

			const ref = collection(firestore, 'wordInfos').withConverter(
				converter<WordInfoType>()
			);

			const updateData = {
				...wordInfo,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			};
			console.log('updateData', updateData);

			addDoc(ref, updateData);
			toast.success('データベースに保存しました！');
			setIsSaved(true);
		} catch (error) {
			console.log(error);
			toast.error('エラーが発生しました。');
		}
	};

	return (
		<div className="mx-auto flex min-h-screen w-full items-center justify-center overflow-y-scroll">
			<div className="py-4 lg:max-w-3xl">
				<h2 className="mb-10 text-center text-2xl font-bold">
					英単語・熟語を送信するとGPT-4から例文が届きます
				</h2>

				<form onSubmit={handleSubmit} className="text-center">
					<input
						type="text"
						value={input}
						onChange={onInputChange}
						onKeyDown={onKeyDown}
						className="rounded border border-gray-300 bg-white px-4 py-2"
					/>
					<button
						type="submit"
						disabled={isLoading}
						className={`ml-3 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-800 ${
							isLoading && 'opacity-50'
						}`}
					>
						送信
					</button>
				</form>
				{isLoading && (
					<div className="mt-6 animate-pulse text-center text-xl font-bold text-green-500">
						... 処理中 ...
					</div>
				)}
				{wordInfo && (
					<div className="mt-6">
						<WordInfo wordInfo={wordInfo} />
						<div className="text-center">
							<button
								type="button"
								onClick={handleSave}
								className={`mx-auto mt-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 ${
									isSaved && 'opacity-50'
								}`}
								disabled={isSaved}
							>
								{isSaved ? '保存済み' : 'データベースに保存する'}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default InputWord;
