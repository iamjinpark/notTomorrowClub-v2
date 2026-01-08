export function getSecUntilMidnight() {
  const now = new Date();

  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );

  const diff = Math.floor((nextMidnight.getTime() - now.getTime()) / 1000);

  // 정확히 00:00:00일 때는 24:00:00으로 보여주기
  return diff === 0 ? 86400 : diff;
}
