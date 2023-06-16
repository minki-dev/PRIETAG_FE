'use client';

import { useState } from 'react';

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	return (
		<main>
			{/* <button type="button" onClick={toggleModal}>
				모달 나와라 얍!
			</button>
			{isModalOpen && <PriceModal toggleModal={toggleModal} />}
			<Counter /> */}
		</main>
	);
}
