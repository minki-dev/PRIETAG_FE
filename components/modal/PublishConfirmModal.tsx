'use client';

import Modal from './Modal';

export default function PublishConfirmModal() {
	return (
		<Modal title="퍼블리시 확인" onSubmit={() => {}} onCancel={() => {}}>
			<div>
				<span className="text-[#00A3FF]">[저번에 만들었던 요금제] </span>
				템플릿으로 퍼블리시하시겠습니까?
			</div>
			<div>기존 사용 중인 템플릿은 자동 취소됩니다.</div>
		</Modal>
	);
}
