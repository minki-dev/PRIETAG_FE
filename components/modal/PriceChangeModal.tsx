'use client';

import Modal from './Modal';

export default function PriceChangeModal() {
	return (
		<Modal
			title="가격 정책 변경"
			onSubmit={() => {}}
			onCancel={() => {}}
			submitTitle="지금 설정"
			cancelTitle="나중에 설정"
		>
			<div>가격 정책 및 할인 정책이 변경되었습니다.</div>
			<div>설정창으로 이동하여 재설정해주시기 바랍니다.</div>
		</Modal>
	);
}
