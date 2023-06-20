'use client';

import Header from '@/components/header/Header';
import UploadModal from './editTemplate/components/UploadModal/UploadModal';

export default function Home() {
	return (
		<main>
			<Header />
			<UploadModal />
		</main>
	);
}
