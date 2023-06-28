import React, { useEffect } from 'react';
import SquareBtn from '@/components/button/SquareBtn';
import { openModal, useModal } from '@/store/slice/modalSlice';
import { GlobalModal } from '@/components/modal/GlobalModal';
import { ModalTypes } from '@/components/modal/ModalState';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { deleteItem, setCurrentPage } from '@/store/slice/versionSlice';
import { ModalState } from '@/store/slice/modalSlice';

function PaginationBar() {
	const { dispatch, params } = useModal();
	const versions = useSelector((state: RootState) => state.version.versions);
	const currentPage = useSelector(
		(state: RootState) => state.version.currentPage,
	);
	const itemsPerPage = useSelector(
		(state: RootState) => state.version.itemsPerPage,
	);
	const totalItems = versions.length;
	const pageCount = Math.ceil(totalItems / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = versions.slice(indexOfFirstItem, indexOfLastItem);
	const handlePageChange = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber));
	};
	const handleDeleteItem = () => {
		const {
			params: {
				title: delModalTitle,
				description: delModalDescription,
				buttons: delModalButtons,
			},
		} = ModalTypes.TemplateDelModal;

		const deleteBehavior = {
			title: delModalTitle,
			description: delModalDescription,
			buttons: {
				cancelButton: delModalButtons.cancelButton,
				behaveButton: {
					...delModalButtons.behaveButton,
					onAction: () => {
						versions
							.filter((version) => version.isChecked)
							.forEach((version) => dispatch(deleteItem(version.id)));
					},
				},
			},
		};

		dispatch(
			openModal({
				title: deleteBehavior.title,
				description: deleteBehavior.description,
				buttons: deleteBehavior.buttons,
			}),
		);

		// if (ModalTypes.TemplateDelModal.params.buttons.behaveButton.onAction) {
		// ModalTypes.TemplateDelModal.params.buttons.behaveButton.onAction()

		// }
	};
	return (
		<div className="relative flex h-[168px] w-full justify-center">
			<div className="absolute left-0 top-[28px] ">
				{' '}
				<SquareBtn
					bg="#FF0000"
					textColor="#fff"
					textContent="선택 삭제"
					borderColor="#FF0000"
					onClick={() => {
						handleDeleteItem();
					}}
				/>{' '}
				<GlobalModal />
			</div>

			<div className="flex items-center">
				<button
					onClick={() => {
						dispatch(setCurrentPage(1));
					}}
				>
					<Image
						src="/img/page_first.svg"
						alt="처음으로"
						width={40}
						height={40}
					/>{' '}
				</button>
				<button
					onClick={() => {
						dispatch(setCurrentPage(currentPage - 1));
					}}
					disabled={currentPage === 1}
				>
					<Image
						src="/img/page_pre.svg"
						alt="이전으로"
						width={40}
						height={40}
					/>{' '}
				</button>
				<nav className="flex">
					{Array(pageCount)
						.fill(0)
						.map((_, i) => (
							<button
								key={i + 1}
								onClick={() => {
									handlePageChange(i + 1);
								}}
								className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${
									i + 1 === currentPage
										? 'bg-[#00A3FF] text-white'
										: 'bg-transparent'
								}`}
							>
								{i + 1}
							</button>
						))}
				</nav>
				<button
					onClick={() => {
						dispatch(setCurrentPage(currentPage + 1));
					}}
					disabled={currentPage === pageCount}
				>
					<Image
						src="/img/page_next.svg"
						alt="다음으로"
						width={40}
						height={40}
					/>{' '}
				</button>
				<button
					onClick={() => {
						dispatch(setCurrentPage(pageCount));
					}}
				>
					<Image
						src="/img/page_end.svg"
						alt="마지막으로"
						width={40}
						height={40}
					/>{' '}
				</button>
			</div>
		</div>
	);
}

export default PaginationBar;
