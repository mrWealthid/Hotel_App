'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { DarkModeProvider } from './LightDarkModeContext';

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(new QueryClient());

	return (
		<DarkModeProvider>
			<QueryClientProvider client={client}>
				<ReactQueryStreamedHydration>
					{children}
				</ReactQueryStreamedHydration>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default Providers;
