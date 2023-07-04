'use-client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { RgbColorPicker } from 'react-colorful';
import './styles.css';
import { Slider } from '../Slider';
import {
	Colors,
	setColor,
	toggleColorModal,
	toggleOnBoardingModal,
	useConfig,
} from '@/store/slice/configSlice';
import {
	calculateBrightness,
	generateSubColors,
	hexToRgb,
	hslToRgb,
	rgbToHex,
	rgbToHsl,
} from '@/util/color';
import { config } from 'process';

export default function ColorModalForm() {
	const [mainColor, setMainColor] = useState({ r: 255, g: 255, b: 255 });
	const [hexCode, setHexCode] = useState('');
	const [nextModalOpen, setNextModalOpen] = useState(false);
	const [moveToPriceModal, setMoveToPriceModal] = useState(false);
	const [selectedColors, setSelectedColors] = useState<number[]>([]);
	/** 서브 컬러 선택 버튼 클릭 메소드*/
	const handleButtonClick = (index: number) => {
		if (selectedColors.includes(index)) {
			setSelectedColors(selectedColors.filter((color) => color !== index));
		} else {
			if (selectedColors.length < 2) {
				setSelectedColors([...selectedColors, index]);
			}
		}
	};
	const isDisabled = (index: number) => {
		return selectedColors.length === 2 && !selectedColors.includes(index);
	};
	/** configSlice */
	const { configState, dispatch: configDispatch } = useConfig();
	/** color 값 변경 */
	const handleColorChange = (color: { r: number; g: number; b: number }) => {
		setMainColor(color);
		setHexCode(rgbToHex(color));
	};
	/** 선택한 메인컬러로 결정되는 밝기, 배경색, 폰트 색 */
	const brightness = calculateBrightness(mainColor);
	const backgroundColor = rgbToHex(mainColor);
	const fontColor = brightness > 128 ? '#000000' : '#ffffff';

	/** slider 변경에 따른 color 업데이트 */
	const handleSliderChange = (channel: string, value: number) => {
		setMainColor((prevColor) => ({
			...prevColor,
			[channel]: value,
		}));
		setHexCode(rgbToHex(mainColor));
	};

	/** hexCode를 입력시 color를 변경하는 메소드 */
	const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const hexoCode = e.target.value;

		setHexCode(hexoCode);

		const validHexRegex = /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/;

		if (validHexRegex.test(hexoCode)) {
			const rgbColor = hexToRgb(hexoCode);
			setMainColor(rgbColor);
		}
	};

	/** input 에 숫자를 입력시 handleHexCodeChange를 호출하는 메소드 */
	const handleInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = parseInt(e.target.value, 10);

		// 입력된 값이 숫자인지 확인
		if (inputValue > 255) {
			return;
		} else if (isNaN(inputValue) || inputValue <= 0) {
			inputValue = 0;
			e.target.value = '0';
		} else if (e.target.value.length >= 2 && inputValue < 10) {
			// e.target.value가 가진 0을 전부 제거한다
			inputValue = parseInt(e.target.value.replace(/0/g, ''));
			e.target.value = e.target.value.replace(/0/g, '');
		}

		handleSliderChange(e.target.name, inputValue);
	};

	/** 생성된 서브 컬러 목록 */
	const subColors = generateSubColors(mainColor);

	const submitColor = {
		color: {
			mainColor: `#${rgbToHex(mainColor)}`,
			subColor01: subColors.sub[selectedColors[0]]?.hex || '#60C8FF',
			subColor02: subColors.sub[selectedColors[1]]?.hex || '#EAF8FF',
			fontColor: fontColor,
		},
	};

	const submitColorHandler = (
		submitColor: Pick<{ color: Colors; font: String }, 'color'>,
	) => {
		configDispatch(setColor(submitColor));
		if (configState.isOnboardingModalOpen) {
			setMoveToPriceModal(true);
		} else {
			configDispatch(toggleColorModal());
		}
	};

	return (
		<form
			// onSubmit={() => submitColorHandler(submitColor)}
			className={`z-[39] h-priceModal w-priceModal ${
				configState.isOnboardingModalOpen && '-translate-y-[596px]'
			}  rounded-2xl border border-gray-200 bg-white transition-transform duration-500 ${
				moveToPriceModal ? '-translate-x-full' : 'translate-x-0'
			}`}
		>
			<dialog
				open={configState.isOnboardingModalOpen || configState.isColorModalOpen}
				className="p-8 h-priceModal w-priceModal rounded-2xl"
			>
				<section className="flex flex-row overflow-hidden">
					<section
						className={`flex flex-col transition-transform duration-500 ${
							nextModalOpen ? '-translate-x-full' : 'translate-x-0'
						} `}
					>
						<div className="text-xl font-medium font-ptMedium">
							페이지에서 활용할 메인 테마 컬러를 선택해주세요
						</div>
						<div
							className={`flex transform flex-row gap-8 transition-transform 
							duration-500`}
						>
							<section className="customPicker">
								<RgbColorPicker
									color={mainColor}
									onChange={handleColorChange}
								/>
							</section>

							<section className="flex flex-col items-end gap-6 ">
								<section className="drop-shadow-[0_0_6px_rgba(0,0,0,0.15) mt-6 flex h-40 w-87 flex-col rounded-2xl border p-4">
									<div
										style={{ backgroundColor: `#${backgroundColor}` }}
										className="flex h-40 w-74 items-center justify-center gap-2 rounded-[4px]"
									>
										<span
											className={`font-ptBold text-[32px] font-bold leading-[51.2px] text-[${fontColor}]`}
										>
											AaBb
										</span>{' '}
										<span
											className={`font-ptRegular text-[32px] font-normal leading-[51.2px] text-[${fontColor}]`}
										>
											가나다
										</span>
									</div>
								</section>
								<section className="drop-shadow-[0_0_6px_rgba(0,0,0,0.15) h-[222px] w-87 rounded-2xl border p-4">
									<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
										RGB
									</p>
									<div className="flex flex-col gap-2">
										<div className="flex flex-row gap-3">
											<Slider
												color={'red'}
												value={[mainColor.r]}
												defaultValue={[mainColor.r]}
												onValueChange={(value) =>
													handleSliderChange('r', value[0])
												}
												max={255}
												step={1}
											/>

											<input
												type="number"
												value={mainColor.r}
												defaultValue="000"
												name="r"
												className={
													'h-[30px] w-12 rounded-[4px] border text-center font-ptRegular text-base font-normal leading-[25.6px] text-[#505050] focus:outline-none'
												}
												onChange={handleInputNumberChange}
											/>
										</div>

										<div className="flex flex-row gap-3">
											<Slider
												color={'green'}
												value={[mainColor.g]}
												defaultValue={[mainColor.g]}
												onValueChange={(value) =>
													handleSliderChange('g', value[0])
												}
												max={255}
												step={1}
											/>

											<input
												type="number"
												value={mainColor.g}
												defaultValue="000"
												className={
													'h-[30px] w-12 rounded-[4px] border text-center font-ptRegular text-base font-normal leading-[25.6px] text-[#505050] focus:outline-none'
												}
												name="g"
												onChange={handleInputNumberChange}
											/>
										</div>
										<div className="flex flex-row gap-3">
											<Slider
												color={'blue'}
												value={[mainColor.b]}
												defaultValue={[mainColor.b]}
												onValueChange={(value) =>
													handleSliderChange('b', value[0])
												}
												max={255}
												step={1}
											/>

											<input
												type="number"
												value={mainColor.b}
												defaultValue="000"
												name="b"
												className={
													'h-[30px] w-12 rounded-[4px] border text-center font-ptRegular text-base font-normal leading-[25.6px] text-[#505050] focus:outline-none'
												}
												onChange={handleInputNumberChange}
											/>
										</div>
									</div>
									<div className="flex flex-row justify-between mt-6">
										<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
											HEX
										</p>
										<div>
											<span className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
												{' '}
												#{' '}
											</span>
											<input
												maxLength={6}
												type="text"
												onChange={handleHexCodeChange}
												value={hexCode}
												className="h-[30px] w-[92px] rounded-[4px] border text-center font-ptRegular text-base font-normal uppercase leading-[25.6px] text-[#505050] focus:outline-none"
											/>
										</div>
									</div>
								</section>
								<section className="flex flex-row gap-2">
									<button
										type="button"
										className="mt-4 h-[34px] w-[120px] gap-2 rounded border border-[#00A3FF] bg-white font-ptMedium text-base font-medium text-[#00A3FF] "
										onClick={() =>
											configState.isOnboardingModalOpen
												? configDispatch(toggleOnBoardingModal())
												: configDispatch(toggleColorModal())
										}
									>
										취소
									</button>
									<button
										type="button"
										className="[3px]  mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
										onClick={() => setNextModalOpen(true)}
									>
										다음
									</button>
								</section>
							</section>
						</div>
					</section>
					<section
						className={`flex flex-col transition-transform duration-500 ${
							nextModalOpen ? '-translate-x-[720px]' : 'translate-x-0'
						} `}
					>
						<div className="text-xl font-medium font-ptMedium">
							선택한 메인 테마 컬러와 어울리는 서브컬러와 글꼴 컬러를
							선택해주세요
						</div>
						<div
							className={`mr-6 mt-6 flex  transform flex-col items-center   `}
						>
							<section className="flex flex-col items-end justify-center gap-6 ">
								<section className="flex flex-row">
									{subColors.sub.map((color, index) => (
										<div
											key={index}
											className="flex h-[380px] w-[168px] flex-col rounded-lg p-2 drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]"
										>
											<div className="flex flex-col">
												<div
													style={{ backgroundColor: `#${backgroundColor}` }}
													className={`h-[79px] rounded-t-lg`}
												/>
												<div
													style={{ backgroundColor: `${color.hex}` }}
													className={`flex h-[152px] w-[152px] flex-col items-center justify-center rounded-b-lg`}
												>
													<p
														className={`text-[${fontColor}] font-ptBold text-[32px] font-bold`}
													>
														Aa가나
													</p>
													<p
														className={`text-[${fontColor}] font-ptMedium text-2xl font-medium`}
													>
														Aa가나
													</p>
													<p
														className={`text-[${fontColor}] font-ptRegular text-base font-normal`}
													>
														Aa가나
													</p>
												</div>
											</div>

											<div className="flex flex-col items-center justify-center mt-5 g-1">
												<p className="font-ptRegular text-sm font-normal leading-[22.4px] text-borderGray">
													{color.rgb.r} {color.rgb.g} {color.rgb.b}
												</p>
												<p className="font-ptRegular text-sm font-normal leading-[22.4px] text-borderGray">
													{color.hex}
												</p>

												<button
													type="button"
													className={`[3px]  mt-4 h-[34px] w-[120px] rounded border font-ptMedium text-base font-medium ${
														selectedColors.includes(index)
															? 'border-[#00A3FF] bg-white text-[#00A3FF]'
															: 'bg-[#00A3FF]  text-white '
													} `}
													onClick={() => handleButtonClick(index)}
													disabled={isDisabled(index)}
												>
													선택
												</button>
											</div>
										</div>
									))}
								</section>
								<section className="flex flex-row justify-between w-full gap-3 mt-6 ">
									<div>
										{selectedColors.length === 2 && (
											<span className="text-lg text-red-700 font-ptRegular">
												2개만 선택 가능합니다
											</span>
										)}
									</div>
									<div className="flex gap-2">
										<button
											type="button"
											className="[3px]  mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium text-white"
											onClick={() => setNextModalOpen(false)}
										>
											이전
										</button>
										<button
											type="button"
											className="[3px]  disabled: mt-4 h-[34px] w-[120px] rounded bg-[#00A3FF] font-ptMedium text-base font-medium  text-white disabled:cursor-not-allowed  disabled:opacity-50"
											disabled={selectedColors.length !== 2}
											onClick={() => submitColorHandler(submitColor)}
										>
											선택 완료
										</button>
									</div>
								</section>
							</section>
						</div>
					</section>
				</section>

				{/*    */}
			</dialog>
		</form>
	);
}
