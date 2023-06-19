export function rgbToHex(rgb: { r: number; g: number; b: number }) {
	const { r, g, b } = rgb;
	const hexR = r.toString(16).padStart(2, '0');
	const hexG = g.toString(16).padStart(2, '0');
	const hexB = b.toString(16).padStart(2, '0');
	return `${hexR}${hexG}${hexB}`;
}

export function hexToRgb(hex: string) {
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((char) => char + char)
			.join('');
	}
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return { r, g, b };
}

// 밝기 계산 함수
export const calculateBrightness = ({
	r,
	g,
	b,
}: {
	r: number;
	g: number;
	b: number;
}) => {
	return Math.floor((r * 299 + g * 587 + b * 114) / 1000);
};

/** rgb를 hsl로변경 */
export const rgbToHsl = (color: { r: number; g: number; b: number }) => {
	const { r, g, b } = color;
	const rNormal = r / 255;
	const gNormal = g / 255;
	const bNormal = b / 255;

	const max = Math.max(rNormal, gNormal, bNormal);
	const min = Math.min(rNormal, gNormal, bNormal);

	let h, s, l;

	if (max === min) {
		h = 0;
	} else if (max === rNormal) {
		h = ((gNormal - bNormal) / (max - min)) % 6;
	} else if (max === gNormal) {
		h = (2 + (bNormal - rNormal) / (max - min)) % 6;
	} else if (max === bNormal) {
		h = (4 + (rNormal - gNormal) / (max - min)) % 6;
	}

	if (h !== undefined) {
		h = Math.round(h * 60);
	}

	l = (max + min) / 2;

	//Saturation

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = (max - min) / (max + min);
	} else {
		s = (max - min) / (2 - max - min);
	}

	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return { h, s, l };
};

/** hsl을 rgb로 변경 */
export const hslToRgb = (color: { h: number; s: number; l: number }) => {
	const { h, s, l } = color;
	const hNormalized = h / 360;
	const sNormalized = s / 100;
	const lNormalized = l / 100;

	let r, g, b;

	if (s === 0) {
		r = g = b = lNormalized; // 흑백 컬러
	} else {
		const hueToRgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q =
			lNormalized < 0.5
				? lNormalized * (1 + sNormalized)
				: lNormalized + sNormalized - lNormalized * sNormalized;
		const p = 2 * lNormalized - q;

		r = hueToRgb(p, q, hNormalized + 1 / 3);
		g = hueToRgb(p, q, hNormalized);
		b = hueToRgb(p, q, hNormalized - 1 / 3);
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	};
};

/** 서브컬러를 구하는 메소드  */
export const generateSubColors = (color: {
	r: number;
	g: number;
	b: number;
}) => {
	const hslColor = rgbToHsl(color);
	const { h = 0, s } = hslColor;
	const isDarkColor = calculateBrightness(color) > 127;
	const step = isDarkColor ? -3 : 3;

	const subColors = [];
	let currentL = hslColor.l;

	for (let i = 0; i < 4; i++) {
		const updatedL = currentL + step * (i + 1);
		const updatedColor = hslToRgb({ h, s, l: updatedL });
		const updatedHex = `#${rgbToHex(updatedColor)}`;
		subColors.push({ rgb: updatedColor, hex: updatedHex });
		currentL = updatedL;
	}

	return {
		main: {
			rgb: color,
			hex: `#${rgbToHex(color)}`,
		},
		sub: subColors,
	};
};
