import { FC } from 'react';
// import { useRecoilValue } from 'recoil'; // データベースとRecoilの状態を取得する際に使用します

const SavedWordsList: FC = () => {
	// const savedWords = useRecoilValue(savedWordsState); // Recoilの状態を取得する際に使用します

	return (
		<ul>
			{/* 以下のコードはデータベースとRecoilの状態が実装された後に使用します */}
			{/* {savedWords.map((word) => (
        <li key={word.id}>
          {word.text} - {word.exampleSentence} - {word.translatedSentence}
        </li>
      ))} */}
			{/* 仮のデータを表示するためのコードです */}
			<li>example - This is an example sentence. - これは例文です。</li>
		</ul>
	);
};

export default SavedWordsList;
