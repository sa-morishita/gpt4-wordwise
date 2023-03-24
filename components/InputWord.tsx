import { converter, firestore } from '@/common/firebase';
import { ApiResponse, Example, Examples } from '@/common/types';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FC, FormEvent, KeyboardEvent, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import ExampleSentence from './ExampleSentence';

const InputWord: FC = () => {
	const [input, setInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [exampleSentences, setExampleSentences] = useState<Example[]>([]);
	const [explanation, setExplanation] = useState<string>('');

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
			const response = await axios.post<ApiResponse>('/api/exampleSentences', {
				prompt: input,
			});

			console.log('response.data', response.data);
			const array = await response.data.text.split('#');

			const examples = array
				.filter((_, index) => index % 2 !== 0)
				.map((japanese, index) => {
					const english = array[index * 2];
					return { japanese, english };
				});

			setExampleSentences(examples);
			setExplanation(array[6]);

			toast.success('GPT-4による例文が届きました！');
			setIsLoading(false);
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

	const handleSave = async () => {
		try {
			const ref = collection(firestore, 'examples').withConverter(
				converter<Examples>()
			);

			const updateData = {
				exampleSentences,
				explanation,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			};
			console.log('updateData', updateData);

			addDoc(ref, updateData);
			toast.success('データベースに保存しました！');
		} catch (error) {
			console.log(error);
			toast.error('エラーが発生しました。');
		}
	};

	return (
		<div className="mx-auto mt-4 flex flex-col items-center lg:max-w-3xl">
			<h2 className="mb-10 text-4xl font-bold">英語を入力してください</h2>
			<form onSubmit={handleSubmit} className="text-center">
				<input
					type="text"
					value={input}
					onChange={onInputChange}
					onKeyDown={onKeyDown}
					className="mb-6 rounded border border-gray-300 bg-gray-200 px-4 py-2"
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
				{isLoading && (
					<div className="animate-pulse text-center text-xl font-bold text-blue-600">
						... 処理中 ...
					</div>
				)}
				{exampleSentences.length > 0 && (
					<>
						<ul className="mt-6 space-y-2">
							{exampleSentences.map((example, index) => (
								<ExampleSentence key={index} example={example} index={index} />
							))}
						</ul>
						<div className="mx-4 my-8 rounded-lg border border-blue-600 p-8 text-left">
							<p>{explanation}</p>
						</div>
						<button
							onClick={handleSave}
							className="mt-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
						>
							データベースに保存する
						</button>
					</>
				)}
			</form>
		</div>
	);
};

export default InputWord;
