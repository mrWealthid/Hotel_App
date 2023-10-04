import React, { useContext, createContext, useState } from 'react';
import { useOutsideClick } from '../shared/hooks/useOutSideClick';
import { createPortal } from 'react-dom';

const MenusContext = createContext({});

function Menu({ children }) {
	const [openId, setOpenId] = useState('');
	const [position, setPosition] = useState(null);

	const close = () => setOpenId('');
	const open = setOpenId;

	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition }}>
			{children}
		</MenusContext.Provider>
	);
}

function Toggle({ id }) {
	const { openId, close, open, setPosition } = useContext(MenusContext);

	function handleClick(e) {
		e.stopPropagation();

		const rect = e.target.closest('button').getBoundingClientRect();
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8
		});

		openId === '' || openId !== id ? open(id) : close();
	}

	return <button>....</button>;
}

function List({ id, children }) {
	const { openId, position, close } = useContext(MenusContext);
	const ref = useOutsideClick(close, false);

	if (openId !== id) return null;

	return createPortal(
		<ul position={position} ref={ref}>
			{children}
		</ul>,
		document.body
	);
}

function Button({ children, onClick }) {
	const { close } = useContext(MenusContext);

	function handleClick() {
		onClick?.();
		close();
	}

	return (
		<li>
			<button onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</button>
		</li>
	);
}

Menu.Menu = Menu;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
