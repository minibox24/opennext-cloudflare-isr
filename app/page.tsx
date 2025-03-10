import { getCloudflareContext } from "@opennextjs/cloudflare";

async function getTime() {
  const time = new Date().toISOString();
  console.error(`TIME = ${time}`);
  return time;
}

async function getTime2() {
  const time = new Date().toLocaleTimeString();
  console.error(`TIME2 = ${time}`);
  return time;
}

async function getData() {
  const {DATABASE} = getCloudflareContext().env;

  try{
    const result = await DATABASE.prepare("SELECT id FROM votes LIMIT 1").run();

    return result;
  } catch(e) {
    console.error(e);
  }
}

export const revalidate = 10;

export default async function ISR() {
  const time = getTime();
  const data = await getData();
  const time2 = getTime2();

  return <div>
    <p>Time1: {time}</p>
    <p>Time2: {time2}</p>
    <p>{JSON.stringify(data)}</p>
  </div>;
}
