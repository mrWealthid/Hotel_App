'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface Props {
	children: JSX.Element;
	width?: 'fit-content' | '100%';
	variant?: IVariant;
	transition?: ITransistion;
}

interface VariantVal {
	[property: string]: any;
}
interface ITransistion {
	[property: string]: any;
}

interface IVariant extends Variants {
	hidden: VariantVal;
	visible: VariantVal;
}

const variants: IVariant = {
	hidden: { opacity: 0, y: 75 },
	visible: { opacity: 1, y: 0 }
};

const transitions: ITransistion = { duration: 2, delay: 0.5 };

const Reveal = ({
	children,
	width = 'fit-content',
	variant = variants,
	transition = transitions
}: Props) => {
	const ref = useRef(null);
	const IsInView = useInView(ref, { once: true });
	const mainControls = useAnimation();
	useEffect(() => {
		if (IsInView) mainControls.start('visible');
	}, [IsInView]);

	return (
		<div ref={ref} style={{ width }}>
			<motion.div
				variants={variant}
				initial="hidden"
				animate={mainControls}
				transition={transition}>
				{children}
			</motion.div>
		</div>
	);
};

export default Reveal;
