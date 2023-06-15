import Image from 'next/image';
import React from 'react';
import { HiOutlineXCircle } from 'react-icons/hi2';
type Props = {
	className?: string
	onClick: () => void;
};

export default function DeleteButton({className, onClick}: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`absolute hidden -right-3 -top-3 group-hover:block ${className ? className : ""}`}
		>
			<Image src={'/icons/hover_delete.svg'} width={24} height={24} alt='delete button icon svg' />
		</button>
	);
}
