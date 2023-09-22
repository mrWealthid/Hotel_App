import Image from 'next/image';
import React from 'react';
import Reveal from './Reveal';

const ButtonComponent = ({
	btnText,
	style,
	afterIcon = '',
	beforeIcon = '',
	type,
	handleClick,
	loading = false,
	disabled = false
}: IButton) => {
	return (
		<Reveal
			variant={{
				hidden: { opacity: 0, x: 75, scale: 0.1 },
				visible: { opacity: 1, x: 0, scale: 1 }
			}}>
			<button
				onClick={handleClick}
				className={` btn-primary ${style}`}
				type={type}
				disabled={disabled}>
				{beforeIcon && (
					<Image
						className=" object-contain"
						height={20}
						src={beforeIcon}
						alt="ministers"
						width={20}
					/>
				)}

				{btnText}

				{afterIcon && (
					<Image
						className=" object-contain"
						height={20}
						src={afterIcon}
						alt="ministers"
						width={20}
					/>
				)}
			</button>
		</Reveal>
	);
};

enum ButtonTypes {
	'button',
	'submit',
	'reset',
	undefined
}

interface IButton {
	btnText: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	style?: string;
	afterIcon?: string;
	beforeIcon?: string;
	loading?: boolean;
	handleClick?: () => void;
	disabled?: boolean;
}

// interface IIcons {
// 	source: string;
// }

export default ButtonComponent;
