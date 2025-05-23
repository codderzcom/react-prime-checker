import {Box, Button} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import {DateTimePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router';

interface FilterProps {
  onApply?: () => void;
}

const Filter = ({onApply}: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    setFromDate(from ? dayjs(from) : null);
    setToDate(to ? dayjs(to) : null);
  }, [searchParams]);

  const handleApply = () => {
    const newParams = new URLSearchParams();

    if (fromDate) {
      newParams.set('from', fromDate.toISOString());
    } else {
      newParams.delete('from');
    }

    if (toDate) {
      newParams.set('to', toDate.toISOString());
    } else {
      newParams.delete('to');
    }

    newParams.delete('page');
    setSearchParams(newParams);

    onApply?.()
  };

  const handleClear = () => {
    setSearchParams(new URLSearchParams());
    setFromDate(null);
    setToDate(null);
  };

  const hasFilters = searchParams.get('from') || searchParams.get('to');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center'}}>
        <DateTimePicker
          label="From Date"
          format="DD.MM.YYYY HH:mm:ss"
          value={fromDate}
          onChange={setFromDate}
          maxDate={toDate || undefined}
          slotProps={{
            textField: {size: 'small'},
            actionBar: {
              actions: ['clear', 'accept', 'cancel'],
            },
          }}
        />

        <DateTimePicker
          label="To Date"
          format="DD.MM.YYYY HH:mm:ss"
          value={toDate}
          onChange={setToDate}
          minDate={fromDate || undefined}
          maxDate={dayjs()}
          slotProps={{
            textField: {size: 'small'},
            actionBar: {
              actions: ['clear', 'accept', 'cancel'],
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleApply}
          disabled={!fromDate && !toDate}
          sx={{height: '40px'}}
        >
          Apply
        </Button>

        <Button
          variant="outlined"
          onClick={handleClear}
          disabled={!hasFilters}
          sx={{height: '40px'}}
        >
          Clear
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Filter;