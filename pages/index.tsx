import type { NextPage } from 'next';
import Head from 'next/head';
import InputWord from '../components/InputWord';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>WordWise</title>
				<meta name="description" content="英語学習用Webアプリケーション" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<InputWord />
		</div>
	);
};

export default Home;
