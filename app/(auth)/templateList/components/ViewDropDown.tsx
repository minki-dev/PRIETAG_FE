import React from 'react';

type Props = {
	onSortByName: () => void;
	onFinalEditDate: (currentPage: number) => void;
	setSortStandard: React.Dispatch<React.SetStateAction<string>>;
	setViewIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
	currentPage: number;
};

function ViewDropDown({
	onSortByName,
	onFinalEditDate,
	setSortStandard,
	setViewIsClicked,
	currentPage,
}: Props) {
	const handleClick = (e) => {
		e.stopPropagation();
		setViewIsClicked(false);
	};
	return (
		<nav className="absolute -left-[1px] top-[30px] z-20  w-[166px] rounded-xl bg-white text-base  font-normal leading-[26px] text-black shadow-[0_0_4px_rgba(0,0,0,0.5)] shadow-[#D9D9D9] ">
			<ul>
				<li
					className="flex h-[40px] w-full cursor-pointer items-center rounded-[12px_12px_0_0] hover:bg-[#00A3FF]  hover:text-white"
					onClick={(e) => {
						onFinalEditDate(currentPage);
						setSortStandard('최종편집일시');
						handleClick(e);
					}}
				>
					<span className="absolute left-[16px]  rounded-[12px_12px_0_0] ">
						최종편집일시
					</span>
				</li>

				<li
					className="flex h-[40px] cursor-pointer items-center rounded-b-lg hover:bg-[#00A3FF]  hover:text-white"
					onClick={(e) => {
						onSortByName();
						setSortStandard('요금제명');
						handleClick(e);
					}}
				>
					<span className="absolute left-[16px] ">요금제명</span>
				</li>
			</ul>
		</nav>
	);
}

export default ViewDropDown;
