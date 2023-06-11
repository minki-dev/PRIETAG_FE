'use client';

import Modal from './Modal';

export default function TemplateDeleteModal() {
	return (
		<Modal
			title="템플릿 삭제"
			onSubmit={() => {}}
			onCancel={() => {}}
			submitTitle="삭제"
			submitTheme="red"
		>
			<div>
				<span className="text-[#00A3FF]">[저번에 만들었던 요금제]</span>을(를)
				정말로 삭제하시겠습니까?
			</div>
			<div>삭제시 복구할 수 없습니다.</div>
		</Modal>
	);
}
