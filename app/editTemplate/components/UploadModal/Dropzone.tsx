'use-client';

import { setFormData, useUploadModal } from '@/store/slice/uploadModalSlice';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { FileError, useDropzone } from 'react-dropzone';

interface FileWithPreview extends File {
	preview: string;
}
type ValidatorFunction = (file: File) => null | FileError | FileError[];

export default function Dropzone({ className }: { className: string }) {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const { dispatch: uploadDispatch } = useUploadModal();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const filesWithPreview = acceptedFiles.map((file) =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			}),
		) as FileWithPreview[];

		const formData = new FormData();
		formData.append('file', filesWithPreview[0]);
		uploadDispatch(setFormData(formData));

		setFiles(filesWithPreview);
	}, []);

	const customValidator: ValidatorFunction = (file) => {
		const allowedTypes = ['image/png', 'image/jpg', 'image/gif'];
		const maxSize = 1048576;
		if (!allowedTypes.includes(file.type)) {
			return {
				code: 'file-invalid-type',
				message: 'PNG, JPG, GIF 파일만 업로드 가능합니다',
			};
		} else if (file.size > maxSize) {
			return {
				code: 'file-too-large',
				message: '1MB 이하의 파일만 업로드 가능합니다',
			};
		}

		return null;
	};

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			accept: {
				'image/*': ['.png', '.jpg', '.gif'],
			},
			validator: customValidator,
		});
	// console.log('fileRejections', fileRejections);
	// drag and drop 으로 업로드한 파일을 filReader로  FormData로 변경하는 코드

	return (
		<div>
			<div {...getRootProps({ className: className })}>
				<div className="mb-10">
					{files.length === 0 ? (
						<Image
							width={200}
							height={176}
							src={'/icons/icon_upload.svg'}
							alt="drag handle svg image"
						/>
					) : (
						files.map((file) => (
							<Image
								key={file.name}
								width={200}
								height={176}
								src={file.preview}
								onLoad={() => URL.revokeObjectURL(file.preview)}
								alt="preview image"
							/>
						))
					)}
				</div>
				<input {...getInputProps()} />
				{isDragActive ? (
					<div className="flex flex-col items-center justify-center">
						<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
							위의 아이콘을 클릭하여 업로드 해주세요
						</p>
						<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
							큰 점선 안의 영역에 드래그 하여 업로드 해주세요
						</p>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center">
						<p className="font-ptMedium text-base font-medium leading-[25.6px] text-borderGray">
							위의 아이콘을 클릭하여 업로드 해주세요
						</p>
					</div>
				)}

				{fileRejections.map(({ file, errors }) => (
					<div key={file.name}>
						<p
							className="font-ptRegular text-sm text-red-700"
							key={errors[0].code}
						>
							{errors[0].code === 'file-invalid-type'
								? errors[1].message
								: errors[0].message}
						</p>
					</div>
				))}

				{/* {uploadModal.formData.get('file') !== null && (
					<Image
						src={URL.createObjectURL(uploadModal.formData.get('file'))}
						alt="이미지파일"
						width={200}
						height={176}
					/>
				)} */}
			</div>
		</div>
	);
}
