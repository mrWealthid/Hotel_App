'use client';
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '@/components/shared/Hooks/useLocalStorage';

const DarkModeContext = createContext({});

function DarkModeProvider({ children }: any) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window && window?.matchMedia('(prefers-color-scheme: dark)').matches,
		'isDarkMode'
	);

	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.add('dark-mode');
				document.documentElement.classList.remove('light-mode');
			} else {
				document.documentElement.classList.add('light-mode');
				document.documentElement.classList.remove('dark-mode');
			}
		},
		[isDarkMode]
	);

	function toggleDarkMode() {
		setIsDarkMode((isDark: any) => !isDark);
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error('DarkModeContext was used outside of DarkModeProvider');
	return context;
}

export { DarkModeProvider, useDarkMode };
