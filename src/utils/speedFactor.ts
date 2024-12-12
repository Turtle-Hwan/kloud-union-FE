// 성별을 나타내는 타입
type Gender = "Male" | "Female";

// 나이에 따른 속도 조절
function adjustSpeedByAge(age: number, baseSpeed: number = 30): number {
  if (age < 20) {
    return baseSpeed * 0.8;
  } else if (age >= 20 && age <= 30) {
    return baseSpeed * 1.2;
  } else if (age > 30 && age <= 40) {
    return baseSpeed;
  } else {
    return baseSpeed * 0.9;
  }
}

// 성별에 따른 속도 조절
function adjustSpeedByGender(speed: number, gender: Gender): number {
  return gender === "Female" ? speed * 0.95 : speed;
}

// 키에 따른 속도 조절
function adjustSpeedByHeight(speed: number, height: number): number {
  const baseHeight = 170;
  const heightFactor = 0.005;
  const heightAdjustment = (height - baseHeight) * heightFactor;
  return speed * (1 + heightAdjustment);
}

// 최종 속도 계산 함수
export function calculateFinalSpeed(
  age: number,
  gender: Gender,
  height: number
): number {
  const baseSpeed = 30;
  let speed = adjustSpeedByAge(age, baseSpeed);
  speed = adjustSpeedByGender(speed, gender);
  speed = adjustSpeedByHeight(speed, height);

  // 속도 범위 제한 (15~45)
  return Math.max(15, Math.min(45, speed));
}

// 테스트
// console.log(calculateFinalSpeed(25, "Male", 175)); // 결과: 36.9
// console.log(calculateFinalSpeed(25, "Female", 175)); // 결과: 35.055
// console.log(calculateFinalSpeed(45, "Male", 165)); // 결과: 26.325
