'use client';

import React, { useEffect } from 'react';
import { usePriceModal } from '@/store/slice/priceModalSlice';

import FAQ from './components/FAQ';
import PriceModal from './components/PriceModal/PriceModal';
import RightMenu from './components/RightMenu';
import DraggableArea from './components/DraggableArea';
import { toggleOnBoardingModal, useConfig } from '@/store/slice/configSlice';
import TableContainer from './components/Table/TableContainer';
import Header from '@/components/header/Header';
import ResizablePaddingWithHandle from '@/components/ResizablePaddingWithHandle';
import { updateHeight, useDNDBox } from '@/store/slice/DNDBoxSlice';
import { GlobalModal } from '@/components/modal/GlobalModal';
import ColorModal from './components/ColorModal/ColorModal';
import OnBoardingModal from './components/OnBoardingModal/OnBoardingModal';
import NoResponsiveFooter from '@/components/footer/NoResponsiveFooter';
import UploadModal from './components/UploadModal/UploadModal';
import DiscountOptionBox from '@/app/priceCard/components/DiscountOptionBox/DiscountOptionBox';
import PriceCardBox from '@/app/priceCard/components/PriceCardBox/PriceCardBox';

export default function EditTemplate() {
	const { priceModal, dispatch } = usePriceModal();
	const {
		configState: { font },
	} = useConfig();

	console.log(font)

	useEffect(() => {
		if (priceModal.isCardSet === false) {
			configDispatch(toggleOnBoardingModal());
		}
	}, []);

	const { configState, dispatch: configDispatch } = useConfig();
	const { isPreview } = configState;

	const { boxState, dispatch: dndDispatch } = useDNDBox();

	const handleHeightUpdate = (index: number, height: number) => {
		dndDispatch(
			updateHeight({
				areaType: 'outerPaddings',
				index,
				content: height.toString(),
			}),
		);
	};

	return (
		<div style={{ fontFamily: font}}>
			{' '}
			{configState.isOnboardingModalOpen && <OnBoardingModal />}
			<GlobalModal />
			<Header />
			<main
				className={`responsiveLayout mx-auto mt-36 box-content flex  flex-col justify-center
					${
						configState.previewMode === 'tablet'
							? 'w-[1104px] border-x-[88px] border-[#E0E0E0]'
							: configState.previewMode === 'mobile'
							? 'border-x-[20]x w-[335px]'
							: 'w-[calc(100vw-14.5rem)]'
					}
					`}
			>
				<RightMenu />
				{configState.isPriceModalOpen && <PriceModal />}
				{configState.isColorModalOpen && <ColorModal />}
				{configState.isUploadModalOpen && <UploadModal />}
				<section
					className={`${
						isPreview ? 'editable-outer-preview' : 'editable-outer '
					} w-full   `}
				>
					<DraggableArea areaType="priceCardArea" />
					<DiscountOptionBox />
					<PriceCardBox />
				</section>
				<ResizablePaddingWithHandle
					type="outer"
					onAction={(height) => {
						handleHeightUpdate(0, height);
					}}
				/>
				<TableContainer />
				<ResizablePaddingWithHandle
					type="outer"
					onAction={(height) => {
						handleHeightUpdate(1, height);
					}}
				/>
				<section
					className={`${
						isPreview ? 'editable-outer-preview' : 'editable-outer '
					} w-full`}
				>
					<DraggableArea areaType="faqArea" />
					<FAQ />
				</section>
			</main>
			<NoResponsiveFooter />
		</div>
	);
}

