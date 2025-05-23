import {initDB} from "@/utils/db.ts";
import type {CheckResult} from "@/types";
import {IStorageService} from "@/types/storage-service";

const STORE_NAME = 'checks';
const INDEX_NAME = 'by_date';

class StorageService implements IStorageService {

  private async getTransaction() {
    const db = await initDB();
    return db.transaction(STORE_NAME, 'readonly');
  }

  private getFilterRange(fromDate?: Date, toDate?: Date): IDBKeyRange | undefined {
    if (fromDate && toDate) {
      return IDBKeyRange.bound(fromDate.getTime(), toDate.getTime());
    } else if (fromDate) {
      return IDBKeyRange.lowerBound(fromDate.getTime());
    } else if (toDate) {
      return IDBKeyRange.upperBound(toDate.getTime());
    }
    return undefined;
  }

  public async addCheck(number: number, isPrime: boolean): Promise<void> {
    const db = await initDB();
    await db.add(STORE_NAME, {
      number,
      isPrime,
      timestamp: new Date().getTime(),
    });
  }

  public async getChecks(
    fromDate?: Date,
    toDate?: Date,
    offset: number = 0,
    limit: number = 10
  ): Promise<{data: CheckResult[], count: number}> {
    try {
      const tx = await this.getTransaction();
      const store = tx.objectStore(STORE_NAME);
      const index = store.index(INDEX_NAME);

      const range = this.getFilterRange(fromDate, toDate);
      const request = await (range ? index.getAll(range) : index.getAll());
      const count = await (range ? index.count(range) : index.count());
      const data = request
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(offset, offset + limit);

      return {data, count};
    } catch (error) {
      console.error('Error loading checks:', error);
      return {data: [], count: 0};
    }
  }
}

export default new StorageService();