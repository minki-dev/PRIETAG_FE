'use client';

import React from 'react';
import HomeHeader from './HomeHeader';
import TemplateHeader from './TemplateHeader';
import { usePathname } from 'next/navigation';

function Header() {
	const pathname = usePathname();

	return (
		<>
			{pathname.includes('editTemplate') ? <TemplateHeader /> : <HomeHeader />}
		</>
	);
}

export default Header;
