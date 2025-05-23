import React from 'react';
import {Pagination as MuiPagination} from "@mui/material";
import {useSearchParams} from "react-router";

interface PaginationProps {
  total: number
  size: number
  page: number
}
const Pagination = ({total, size, page}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value.toString());

    if (value === 1) newParams.delete('page')

    setSearchParams(newParams);
  };

  return (
    <MuiPagination
      count={Math.ceil(total / size)}
      page={page}
      onChange={handlePageChange}
      siblingCount={1} boundaryCount={0}
      color="primary"
    />
  );
};

export default Pagination;