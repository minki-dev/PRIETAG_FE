'use client';

import React, { useState } from 'react';

interface ModalProps {
	open?: boolean;
	title: string;
	submitTitle?: string;
	submitTheme?: 'red' | 'blue';
	onSubmit?: () => void;
	cancelShow?: boolean;
	cancelTitle?: string;
	onCancel?: () => void;
	children: React.ReactNode;
}

function Modal({
	open,
	title,
	submitTitle,
	submitTheme,
	onSubmit,
	cancelShow,
	cancelTitle,
	onCancel,
	children,
}: ModalProps) {
	const [isOpen, setIsOpen] = useState(open);
	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit();
		}

		setIsOpen(false);
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}

		setIsOpen(false);
	};

	return isOpen ? (
		<div
			tabIndex={-1}
			aria-hidden="true"
			className="fixed top-0 left-0 right-0 z-50  w-full h-full bg-black bg-opacity-30"
			onClick={() => {
				setIsOpen(false);
			}}
		>
			<div className="bg-white w-[480px] h-[240px] absolute shadow-md rounded-2xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-auto !opacity-100">
				<div className="h-[32px] absolute top-[21px] left-[32px] ">
					<span className="font-medium text-xl leading-8 text-center text-black">
						{' '}
						{title}
					</span>
				</div>
				<div className="w-[416px] h-[1px] bg-slate-200 absolute left-[32px] top-[60px]" />
				<div className="w-[416px] h-[77px] absolute top-[77px] left-[32px] text-[#747474] leading-[25.6px] text-base">
					{children}
				</div>
				<div className="absolute bottom-[24px] right-[32px]">
					{cancelShow ? (
						<button
							className=" w-[104px] h-[34px] rounded-[3px] border-solid border-[1px] border-[#747474] text-[#747474] text-[14px] font-medium text-center leading-[22px]"
							type="button"
							onClick={handleCancel}
						>
							{cancelTitle}
						</button>
					) : null}
					<button
						className={`w-[104px] h-[34px] rounded-[3px] text-white ml-[8px] text-[14px] font-medium text-center leading-[22px] ${
							submitTheme === 'blue' ? 'bg-[#00A3FF]' : 'bg-[#FF0000]'
						}`}
						type="button"
						onClick={handleSubmit}
					>
						{submitTitle}
					</button>
				</div>
			</div>
		</div>
	) : null;
}

Modal.defaultProps = {
	open: true,
	submitTitle: '확인',
	submitTheme: 'blue',
	cancelShow: true,
	onSubmit: () => {},
	onCancel: () => {},
	cancelTitle: '취소',
};

export default Modal;
