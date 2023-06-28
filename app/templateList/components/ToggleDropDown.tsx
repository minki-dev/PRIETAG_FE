import React from 'react';
import Image from 'next/image';

interface ToogggleDropDownProps {
	viewIsClicked: boolean;
}

const ToggleDropDown: React.FC<ToogggleDropDownProps> = ({ viewIsClicked }) => {
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
