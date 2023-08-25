import { Navbar, Footer } from '@/components';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Car Shop',
	description: 'Discover the best car for you.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={'relative'}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
