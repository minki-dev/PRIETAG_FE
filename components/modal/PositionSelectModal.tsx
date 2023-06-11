'use client';

import Modal from './Modal';

export default function PositionSelectModal() {
	return (
		<Modal
			title="위치선택"
			onSubmit={() => {}}
			onCancel={() => {}}
			cancelShow={false}
		>
			<div>해당 요소가 추가될 위치를 먼저 선택해주세요.</div>
			<div>
				<span>선택한 요소 아래에 추가</span>됩니다.
			</div>
		</Modal>
	);
}
