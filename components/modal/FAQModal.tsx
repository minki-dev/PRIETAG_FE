'use client';

import Modal from './Modal';

export default function FAQModal() {
	return (
		<Modal
			title="내용 초기화"
			onSubmit={() => {}}
			onCancel={() => {}}
			submitTitle="초기화"
			submitTheme="red"
		>
			<div>
				초기화되어 모든 내용이 삭제됩니다. 삭제된 내용은 복구할 수 없습니다.
				그래도 진행하시겠습니까?
			</div>
		</Modal>
	);
}
