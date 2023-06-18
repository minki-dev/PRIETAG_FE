import Image from 'next/image';
import React from 'react';
import { HiOutlineXCircle } from 'react-icons/hi2';
type Props = {
	className?: string
	onClick: () => void | ((id: string) => void)
};
/**
 * @description 상위 컴포넌트에서 className='group/{ 임의의 group name}' 을 선언하시고
 * className='group-hover/{ 임의의 group name }:{ option }' 을 props에 넣어야 보입니다.
 */
export default function DeleteButton({className, onClick}: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`absolute hidden -right-3 -top-3 ${className ? className : ""}`}
		>
			<Image src={'/icons/hover_delete.svg'} width={24} height={24} alt='delete button icon svg' />
		</button>
	);
}
