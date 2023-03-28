import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	try {
		await res.revalidate('/saved-words');
		return res.status(200).json({ revalidated: true });
	} catch (err) {
		return res.status(500).send('Error revalidating');
	}
}
