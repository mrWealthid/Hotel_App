import './globals.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Providers from '@/utils/Providers';
import { DarkModeProvider } from '@/utils/LightDarkModeContext';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${raleway.className} min-h-screen`}>
				<Providers>
					<DarkModeProvider>{children}</DarkModeProvider>
				</Providers>

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
