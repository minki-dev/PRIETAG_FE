'use client';

import Modal from './Modal';

export default function ColorChangeModal() {
	return (
		<Modal
			title="컬러 테마 변경"
			onSubmit={() => {}}
			onCancel={() => {}}
			cancelShow={false}
		>
			<div>해당 메뉴에서는 컬러 선택, 테마 변경이 불가능합니다.</div>
			<div>
				컬러 테마를 변경하시려면 오른쪽 상단의 &#39;
				<span>메뉴-컬러 테마 재설정</span>&#39;에서 해 주시기 바랍니다.
			</div>
		</Modal>
	);
}
