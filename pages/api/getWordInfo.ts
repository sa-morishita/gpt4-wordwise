import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type ResponseData = {
	text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
	body: {
		prompt: string;
	};
}

export default async function handler(
	req: GenerateNextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const { prompt } = req.body;

	if (!prompt || prompt.length === 0)
		return res.status(400).json({ text: 'テキストがありません' });

	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content:
							'以下の順に返答を作成お願いします・与えられた英語を含むTOEIC学習にふさわしい英文とその日本語翻訳文のペアを3つ作る・3つのペアをstringとして順番に並べる（それぞれの文の先頭に数字は付けない）・全ての英文と日本文の間に#の記号を挟む・完成したstringの一番後ろに#がない場合は#を1つ追加・その後ろに与えられた英語についてのTOEIC学習者用の日本語解説文を追加・全ての改行と文頭のスペースを削除・完成したstringを返答',
					},
					{ role: 'user', content: prompt },
				],
				temperature: 0.8,
				max_tokens: 1000,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
			}
		);

		const resultArray = response.data.choices[0].message.content;
		resultArray.split('\n').filter((text: string) => text.trim().length > 0);

		res.status(200).json({ text: resultArray.trim() });
	} catch (error) {
		console.error('例文の生成に失敗しました:', error);
		res.status(500).json({ text: '例文の生成に失敗しました' });
	}
}
