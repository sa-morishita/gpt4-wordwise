import Sidebar from '@/components/Sidebar';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="flex">
			<Sidebar />
			<main className="w-3/4">
				<Toaster />
				<Component {...pageProps} />
			</main>
		</div>
	);
}
