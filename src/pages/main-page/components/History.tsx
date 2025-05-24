import {useCallback, useEffect, useState} from 'react';
import {Box, Divider, List, ListItem, ListItemText, Paper, Typography} from '@mui/material';
import dayjs from "dayjs";
import {useSearchParams} from 'react-router';
import storageService from "@/services/storage";
import Filter from "./Filter";
import type {CheckResult} from "@/types";
import Pagination from "@/components/Pagination.tsx";
import {useChecks} from "@/contexts/ChecksContext.tsx";

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE || 10;

const History = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {checks, setChecks} = useChecks();

  const loadData = useCallback(async () => {
    const pageParam = searchParams.get('page');
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    const currentPage = pageParam ? parseInt(pageParam) : 1;
    setPage(currentPage);

    try {
      setLoading(true);
      setError(null);

      const fromDate = fromParam ? dayjs(fromParam).toDate() : undefined;
      const toDate = toParam ? dayjs(toParam).toDate() : undefined;
      const pageSize = Number(PAGE_SIZE);

      const {count, data: checks} = await storageService.getChecks(
        fromDate,
        toDate,
        (currentPage - 1) * pageSize,
        pageSize
      );

      setTotalCount(count as number);
      setChecks(checks as CheckResult[]);
    } catch (err) {
      console.error('Failed to load checks:', err);
      setError('Failed to load checks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchParams, setChecks]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Paper elevation={3} sx={{p: {md: 3, xs: 2}}}>
      <Typography variant="h5" gutterBottom>Check History</Typography>

      <Filter onApply={loadData}/>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <List data-testid='result-table'>
            {checks.map((check) => (
              <div key={check.timestamp}>
                <ListItem>
                  <ListItemText
                    primary={`${check.number} is ${check.isPrime ? 'prime' : 'not prime'}`}
                    secondary={dayjs(check.timestamp).format('DD.MM.YYYY HH:mm:ss')}
                  />
                </ListItem>
                <Divider/>
              </div>
            ))}
          </List>

          {checks.length === 0 && (
            <Typography sx={{mt: 2}}>No checks found for selected period</Typography>
          )}

          {totalCount > 0 && (
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
              <Pagination total={totalCount} size={PAGE_SIZE} page={page}/>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default History;