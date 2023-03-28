import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await res.revalidate('/saved-words');
		return res.status(200).json({ revalidated: true });
	} catch (err) {
		return res.status(500).send('Error revalidating');
	}
}
