import React, { useEffect, useState } from 'react';

const useDarkMode = () => {
	let isDarkMode = false;

	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		updateTheme();
	}, []);

	function toggleTheme(theme: string): void {
		localStorage['theme'] = theme;
		updateTheme();
	}

	function updateTheme() {
		if (
			localStorage['theme'] === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');

			// document.body.style.setProperty('--background-color', '#192734');

			setIsDark(true);
		} else {
			document.documentElement.classList.remove('dark');
			// document.body.style.setProperty('--background-color', '#eceef1');

			isDarkMode = false;
			setIsDark(false);
		}
	}

	return { isDark };
};

export default useDarkMode;
