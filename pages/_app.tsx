import Sidebar from '@/components/Sidebar';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Toaster />
			<div className="flex">
				<Sidebar />
				<main className="w-3/4 bg-gray-100">
					<Component {...pageProps} />
				</main>
			</div>
		</>
	);
}
