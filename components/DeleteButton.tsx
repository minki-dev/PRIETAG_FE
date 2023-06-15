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
			className={`absolute hidden bg-white rounded-full -right-2 -top-2 group-hover:block ${className ? className : ""}`}
		>
			<HiOutlineXCircle className="h-[26px] w-[26px] " />
		</button>
	);
}
