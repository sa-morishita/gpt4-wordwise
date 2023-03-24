import { FC, useState } from 'react';

const InputWord: FC = () => {
	const [word, setWord] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// OpenAI APIへのリクエストやRecoilの状態更新処理をここに実装
	};

	return (
		<div>
			<h2 className="mb-4 text-lg font-semibold">単語を入力してください</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={word}
					onChange={(e) => setWord(e.target.value)}
					className="mr-2 border border-gray-300 p-2"
				/>
				<button type="submit" className="bg-blue-600 p-2 text-white">
					送信
				</button>
			</form>
		</div>
	);
};

export default InputWord;
