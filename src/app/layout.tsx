import './globals.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Providers from '@/utils/Providers';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'BookingStays',
	description: 'Stays that really counts'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${raleway.className} dark:bg-[#192734] bg-[#eceef1] min-h-screen`}>
				<Providers>{children}</Providers>

				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: { duration: 3000 },
						error: { duration: 3000 },
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px'
						}
					}}
				/>
			</body>
		</html>
	);
}
