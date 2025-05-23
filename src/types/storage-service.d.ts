import {CheckResult} from "@/types/index.ts";

export interface IStorageService {
  addCheck(number: number, isPrime: boolean): Promise<void>;

  getChecks(
    fromDate?: Date,
    toDate?: Date,
    offset?: number,
    limit?: number
  ): Promise<{data: CheckResult[], count: number}>;
}