'use-client';

import UploadModalForm from '../UploadModal/UploadModalForm';
import React from 'react';
import ColorModalForm from '../ColorModal/ColorModalForm';
import PriceModalForm from '../PriceModal/PriceModalForm';
import { useConfig } from '@/store/slice/configSlice';

export default function OnBoardingModal() {
	const { configState } = useConfig();

	return (
		<>
			{configState.isOnboardingModalOpen && (
				<div className="fixed top-0 left-0 z-30 flex flex-row items-center justify-center w-full h-full bg-black bg-opacity-50">
					<div className="flex flex-col overflow-hidden">
						<PriceModalForm />
						<UploadModalForm />
						<ColorModalForm />
					</div>
				</div>
			)}
		</>
	);
}
