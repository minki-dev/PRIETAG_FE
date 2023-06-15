import React from 'react';
import FAQ from './components/FAQ';
import RightMenu from './components/RightMenu';

import DraggableArea from './components/DraggableArea';
import Table from './components/Table/Table';

export default function EditTemlate() {
	
	return (
		<main className="flex w-[calc(100vw-14.5rem)] flex-col justify-center">
			
				{/* <RightMenu /> */}
				<section className='editable-outer '>
					
					{/* priceCardArea */}
					<DraggableArea areaType="priceCardArea" />
				</section>
				<section className='editable-outer' >
					<DraggableArea areaType="tableArea" />
					<Table />
				</section>
				<section className='editable-outer'>
					<DraggableArea areaType="faqArea" />
					<FAQ />
				</section>

		</main>
	);
}
