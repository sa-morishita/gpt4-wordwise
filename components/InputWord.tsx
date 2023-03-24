import { converter, firestore } from '@/common/firebase';
import { Examples } from '@/common/types';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

const InputWord: FC = () => {
	const [input, setInput] = useState<string>('');
	const [resultArray, setResultArray] = useState<string[]>([]);

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput(e.target.value);
		},
		[]
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim() === '') {
			return toast.error('英語を入力してください');
		}

		try {
			// APIルートを呼び出す
			const response = await axios.post('/api/exampleSentences', {
				prompt: input,
			});

			console.log(response);
			const array = await response.data.text.split('#');
			setResultArray(array);
		} catch (error) {
			console.error('Error fetching example sentences:', error);
			toast.error('エラーが発生しました。');
		}
	};

	const handleSave = async () => {
		try {
			const ref = collection(firestore, 'examples').withConverter(
				converter<Examples>()
			);

			const exampleSentences = resultArray
				.filter((_, index) => index % 2 !== 0)
				.map((japanese, index) => {
					const english = resultArray[index * 2];
					return { japanese, english };
				});

			const updateData = {
				exampleSentences,
				explanation: resultArray[6],
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			};
			console.log(updateData);

			addDoc(ref, updateData);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2 className="mb-4 text-lg font-semibold">英語を入力してください</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={input}
					onChange={onInputChange}
					className="mr-2 border border-gray-300 p-2"
				/>
				<button type="submit" className="bg-blue-600 p-2 text-white">
					送信
				</button>
				{resultArray.length > 0 && (
					<ul className="mt-6 space-y-2">
						{resultArray.map((sentence, index) => (
							<li key={index} className="border-b border-gray-200 py-2">
								{sentence}
							</li>
						))}
					</ul>
				)}
				<button
					onClick={handleSave}
					className="mt-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
				>
					データベースに保存する
				</button>
			</form>
		</div>
	);
};

export default InputWord;
