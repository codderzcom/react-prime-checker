import '@testing-library/jest-dom/vitest';
import {beforeEach, describe, test} from 'vitest';
import {render} from '@testing-library/react';
import App from '@/App';
import {MemoryRouter} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";
import {tester} from "@/utils/tester.ts";
import dayjs from "dayjs";
import {initDB} from "@/utils/db.ts";

describe('App', () => {

  beforeEach(async () => {
    useAuth().logout();
    await initDB();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
  })

  test('It works', async () => {
    await tester.seed();
    await tester.login('admin', 'admin');

    await tester.checkNumber(10);
    await tester.verifyCheckResult('The number 10 is not prime');
    await tester.checkNumber(7);
    await tester.verifyCheckResult('The number 7 is prime');

    const now = dayjs(new Date);
    const from = now.subtract(1, 'second').format('DD.MM.YYYY HH:mm:ss');
    const to = now.add(1, 'second').format('DD.MM.YYYY HH:mm:ss');
    await tester.filterTable(from, to);
    await tester.verifyTableCount(2);
  });
});
