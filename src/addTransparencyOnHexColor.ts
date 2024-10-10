/**
 * 색상 코드와 투명도(퍼센트)를 입력받아 16진수 색상 코드로 변환하는 함수
 * @param {string} hexColor - 색상 코드 (예: '#RRGGBB')
 * @param {number} transparency - 투명도 퍼센트 (0-100)
 * @returns {string} 16진수 색상 코드 (예: '#RRGGBBAA')
 * AA -> alpha
 * 10진수의 transparency를 받아 16진수의 숫자로 변환하여 hex 색상을 반환함
 * 투명도는 0부터 255 사이의 값
 */
export default function addTransparencyOnHexColor(
  hexColor: string,
  transparency: number
): string {
  if (typeof transparency !== 'number' || isNaN(transparency)) return hexColor;
  // 1 ~ 10의 자리의 값만 유효 처리
  transparency = transparency % 100;
  // 투명도를 0에서 255 사이의 값으로 변환
  let alpha = Math.round((transparency / 100) * 255);
  // 알파 값을 16진수 문자열로 변환 (두 자리로 맞춤)
  let alphaHex = alpha.toString(16);
  switch (alphaHex.length) {
    case 1:
      alphaHex = '0' + alphaHex;
      break;
    case 0:
      alphaHex = '00';
      break;
  }
  return (hexColor + alphaHex).toUpperCase();
}
