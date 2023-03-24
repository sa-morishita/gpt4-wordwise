import Link from 'next/link';
import { FC } from 'react';

const Sidebar: FC = () => {
	return (
		<div className="h-screen w-1/4 border-r border-gray-200 p-4">
			<h1 className="mb-4 text-xl font-bold">WordWise</h1>
			<nav>
				<ul>
					<li className="mb-2">
						<Link href="/" className="text-blue-600">
							単語入力
						</Link>
					</li>
					<li>
						<Link href="/saved-words" className="text-blue-600">
							データベース情報一覧
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
