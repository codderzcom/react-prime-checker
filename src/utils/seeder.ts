import checkerService from "@/services/checker.ts";
import {initDB} from "@/utils/db.ts";
import {CheckResult} from "@/types";

export const generateDemoChecks = async () => {
  const STORE_NAME = 'checks'
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  store.clear()

  const demoChecks: CheckResult[] = [];
  const now = new Date();

  for (let i = 0; i < 70; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);

    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);
    date.setMinutes(date.getMinutes() - minutesAgo);

    const number = Math.floor(Math.random() * 100) + 1;
    const isPrime = checkerService.checkPrime(number);

    demoChecks.push({
      number,
      isPrime,
      timestamp: date.getTime()
    });
  }

  await Promise.all(demoChecks.map(check => store.add(check)));
}