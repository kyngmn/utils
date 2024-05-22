/**
 * 루트 요소의 폰트 크기를 픽셀 단위로 반환하는 함수
 * @returns {number} 루트 폰트 크기 (픽셀 단위)
 * @throws {Error} 유효한 폰트 크기를 가져올 수 없는 경우 에러 발생
 */
export default function getRootFontSize() {
    try {
        var rootElement = document.documentElement;
        if (!rootElement) {
            throw new Error('Root element not found');
        }
        var computedStyle = getComputedStyle(rootElement);
        if (!computedStyle) {
            throw new Error('Unable to get computed style');
        }
        var rootFontSize = computedStyle.fontSize;
        if (!rootFontSize) {
            throw new Error('Font size not found in computed style');
        }
        var fontSizeInPixels = parseFloat(rootFontSize);
        if (isNaN(fontSizeInPixels)) {
            throw new Error('Font size is not a valid number');
        }
        return fontSizeInPixels;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error('An unknown error occurred');
        }
        return 16; // 기본값으로 16px 반환
    }
}
