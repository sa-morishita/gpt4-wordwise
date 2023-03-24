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
							'以下の条件で返答を作成お願いします・与えられた英語を含むTOEIC学習にふさわしい英文とその日本語翻訳文のペアを3つ作る・3つのペアをstringとして順番に並べる、英文と日本文の間には全て#の記号を挟む・完成したstringの後ろに#を追加し、その後ろに、与えられた英語についてのTOEIC学習者用の日本語解説文を改行なしで追加・完成したstringを返答（全ての改行と文頭のスペースは削除）',
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
		console.error('Error generating example sentences:', error);
		res.status(500).json({ text: 'Failed to generate example sentences.' });
	}
}
