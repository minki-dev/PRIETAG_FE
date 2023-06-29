import React from 'react';
import Image from 'next/image';

export interface TooggleDropDownProps {
	viewIsClicked: boolean;
}

const ToggleDropDown: React.FC<TooggleDropDownProps> = ({ viewIsClicked }) => {
	return (
		<>
			{viewIsClicked ? (
				<Image
					src="/img/dropup_s.svg"
					width={10}
					height={8}
					className=" object-cover "
					alt="드롭업"
				/>
			) : (
				<Image
					src="/img/dropdown_s.svg"
					width={10}
					height={8}
					className=" object-cover "
					alt="드롭다운"
				/>
			)}
		</>
	);
};

export default ToggleDropDown;
