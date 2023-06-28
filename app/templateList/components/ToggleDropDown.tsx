import React from 'react';
import Image from 'next/image';

function ToggleDropDown({ viewIsClicked }) {
	return (
		<>
			{viewIsClicked ? (
				<Image
					src="/img/dropup_s.svg"
					width={10}
					height={8}
					className=" object-cover "
					alt="연"
				/>
			) : (
				<Image
					src="/img/dropdown_s.svg"
					width={10}
					height={8}
					className=" object-cover "
					alt="연"
				/>
			)}
		</>
	);
}

export default ToggleDropDown;
