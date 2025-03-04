async function getTime() {
  const time = new Date().toISOString();
  console.error(`TIME = ${time}`);
  return time;
}

export const revalidate = 10;
export default async function ISR() {
  const time = getTime();
  return <div>Time: {time}</div>;
}
