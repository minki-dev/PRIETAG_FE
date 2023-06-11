import React from 'react';
import { Checkbox } from './checkbox';

export default function PriceModal({
	toggleModal,
}: {
	toggleModal: () => void;
}) {
	return (
		<div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
			<dialog
				open
				className="pt-8 pl-6 bg-white border border-gray-200 w-priceModal h-priceModal rounded-2xl"
			>
				{/* 타이틀 */}
				<div className="mb-6 text-xl font-medium ml-7 font-ptBold">
					요금제 생성과 할인 정책을 설정합니다
				</div>
				{/* 옵션 생성 */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-row gap-6">
						{/* 작은 옵션 창  */}
						<div className="w-[380px] h-[116px] rounded-lg border">
							<div className="h-12  py-2.5 pl-4 bg-blue-500 rounded-t-lg">
								<span className="text-base text-white font-ptBold ">
									요금제(가격카드 개수 설정)
								</span>
							</div>
							<div className="pt-4 pb-6 pl-6 rounded-b-lg">
								{' '}
								<input
									type="text"
									className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
								/>
								<span className="text-base text-borderGray font-ptRegular">
									개 (최대 4개 설정 가능)
								</span>
							</div>
						</div>
						<div className="w-[380px] h-[116px] rounded-lg border">
							<div className="flex flex-row">
								<div className="h-12 py-3 pl-4 bg-blue-500 rounded-tl-lg w-14">
									<Checkbox />
								</div>
								<span className="w-full  h-12 py-2.5 text-base leading-6 text-white bg-blue-500 rounded-tr-lg font-ptBold">
									연간 구독 추가 및 할인율 설정
								</span>
							</div>
							<div className="pt-4 pb-6 pl-6 rounded-b-lg">
								{' '}
								<input
									type="text"
									className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
								/>
								<span className="text-base text-borderGray font-ptRegular">
									% 할인율 적용
								</span>
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-6">
						{/* 큰 옵션 창  */}
						<div className="w-[380px] h-[254px] rounded-lg border">
							<div className="flex flex-row">
								<div className="h-12 py-3 pl-4 bg-blue-500 rounded-tl-lg w-14">
									<Checkbox />
								</div>
								<span className="w-full  h-12 py-2.5 text-base leading-6 text-white bg-blue-500 rounded-tr-lg font-ptBold">
									인원 규모 당 할인율 설정
								</span>
							</div>
							<div className="flex flex-col gap-4 pt-4 pb-6 pl-6 rounded-b-lg">
								<div>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular ">
										인 미만 사용자
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
								<div>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular ">
										인 미만 사용자
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
								<div>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular ">
										인 미만 사용자
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
								<div>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular ">
										인 미만 사용자
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
							</div>
						</div>
						<div className="w-[380px] h-[254px] rounded-lg border">
							<div className="flex flex-row">
								<div className="h-12 py-3 pl-4 bg-blue-500 rounded-tl-lg w-14">
									<Checkbox />
								</div>
								<span className="w-full  h-12 py-2.5 text-base leading-6 text-white bg-blue-500 rounded-tr-lg font-ptBold">
									인원 규모 당 할인율 설정
								</span>
							</div>
							<div className="flex flex-col gap-4 pt-4 pb-6 pl-6 rounded-b-lg">
								<div>
									<span className="mr-[10px] text-base text-borderGray font-ptRegular">
										1번 카드 원가
									</span>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular">
										원
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
								<div>
									<span className="mr-2 text-base text-borderGray font-ptRegular">
										2번 카드 원가
									</span>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular">
										원
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
								<div>
									<span className="mr-2 text-base text-borderGray font-ptRegular">
										3번 카드 원가
									</span>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular">
										원
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
								<div>
									<span className="mr-2 text-base text-borderGray font-ptRegular">
										4번 카드 원가
									</span>
									<input
										type="text"
										className="w-[100px] h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="mr-4 text-base text-borderGray font-ptRegular">
										원
									</span>
									<input
										type="text"
										className="w-12 h-[30px] mr-2 border rounded-[4px] focus:outline-none"
									/>
									<span className="text-base text-borderGray font-ptRegular">
										% 할인
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* 안내 사항 */}
				<div className="mt-4 text-sm font-ptRegular text-borderGray">
					*가격 할인은 각 항목의 할인율 %의 합연산으로 계산됩니다.
				</div>
				<div className="flex justify-end">
					<button
						type="button"
						className="mt-4 h-[34px] w-[120px] text-base font-medium text-white bg-[#00A3FF] font-ptMedium mr-6 rounded [3px]"
						onClick={toggleModal}
					>
						적용
					</button>
				</div>
			</dialog>
		</div>
	);
}
