'use client';

import React from 'react';

import TemplateHeader from './TemplateHeader';
import { usePathname } from 'next/navigation';
import HomeHeader from './HomeHeader';

function Header() {
	const pathname = usePathname();

	return (
		<>
			{pathname.includes('editTemplate') ? <TemplateHeader /> : <HomeHeader />}
		</>
	);
}

export default Header;
