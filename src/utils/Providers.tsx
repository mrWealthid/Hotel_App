'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { DarkModeProvider } from './LightDarkModeContext';

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(new QueryClient());

	return (
		<QueryClientProvider client={client}>
			<ReactQueryStreamedHydration>
				<DarkModeProvider> {children}</DarkModeProvider>
			</ReactQueryStreamedHydration>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default Providers;
