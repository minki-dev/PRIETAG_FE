import { closeModal, useModal } from '@/store/slice/modalSlice';

export const GlobalModal = () => {
	const { isOpen, params, dispatch } = useModal();
	const onCancel = () => {
		dispatch(closeModal());
	};

	const onAction = () => {
		if(params.buttons.behaveButton.onAction) params.buttons.behaveButton.onAction()
		dispatch(closeModal());
	};

	if (!isOpen) return null;

	return (
		<div
			tabIndex={-1}
			aria-hidden="true"
			className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-black bg-opacity-30"
			onClick={() => {
				dispatch(closeModal());
			}}
		>
			<div className="absolute left-1/2 top-1/2 h-[240px] w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-white !opacity-100 shadow-md">
				<div className="absolute left-[32px] top-[21px] h-[32px] ">
					<span className="text-xl font-medium leading-8 text-center text-black">
						{params.title}
					</span>
				</div>

				<div className="absolute left-[32px] top-[60px] h-[1px] w-[416px] bg-slate-200" />
				<div className="absolute left-[32px] top-[77px] h-[77px] w-[416px] whitespace-pre-wrap text-base leading-[25.6px] text-[#747474]">
					{params.description}
				</div>

				<div className="absolute bottom-[24px] right-[32px]">
					<button
						className={`${
							params.buttons?.cancelButton
								? 'h-[34px] w-[104px] rounded-[3px] border-[1px] border-solid border-[#747474] text-center text-[14px] font-medium leading-[22px] text-[#747474]'
								: null
						}`}
						onClick={onCancel}
						type="button"
					>
						{params.buttons?.cancelButton?.text}
					</button>
					<button
						className={`${params.buttons?.behaveButton?.color} ml-[8px] h-[34px] w-[104px] rounded-[3px] text-center text-[14px] font-medium leading-[22px] text-white`}
						onClick={onAction}
						type="button"
					>
						{params.buttons?.behaveButton?.text}
					</button>
				</div>
			</div>
		</div>
	);
};
