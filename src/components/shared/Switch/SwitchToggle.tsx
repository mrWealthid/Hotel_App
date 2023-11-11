'use client';
import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SwitchToggle() {
	const [enabled, setEnabled] = useState(false);
	let isDarkMode = false;

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
			isDarkMode = true;
			setEnabled(true);
		} else {
			document.documentElement.classList.remove('dark');
			// document.body.style.setProperty('--background-color', '#eceef1');

			isDarkMode = false;
			setEnabled(false);
		}
	}

	function handleChange(val: any) {
		setEnabled(val);
		toggleTheme(val ? 'dark' : 'light');
	}

	return (
		<div className="p-0">
			<Switch
				checked={enabled}
				onChange={(enabled) => handleChange(enabled)}
				className={`${enabled ? 'bg-primary' : 'bg-primary-light'}
          relative inline-flex  w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</div>
	);
}
