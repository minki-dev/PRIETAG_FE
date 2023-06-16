'use client';

import React from 'react';
import FAQ from './components/FAQ';
import RightMenu from './components/RightMenu';
import Header from '@/components/header/Header';

export default function TemplateEdit() {
	return (
		<div>
			<Header />
			<RightMenu />
			<FAQ />
		</div>
	);
}
