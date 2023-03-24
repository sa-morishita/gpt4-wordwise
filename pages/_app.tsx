import Sidebar from '@/components/Sidebar';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="flex">
			<Sidebar />
			<main className="w-3/4 p-4">
				<Component {...pageProps} />
			</main>
		</div>
	);
}
