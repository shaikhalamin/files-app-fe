import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { HandlePaginationProps } from "./pagination-types";

interface PaginationProps {
  onChange: (paginationProps: HandlePaginationProps) => void;
  total?: number;
  active?: number;
}
const BasicPagination: React.FC<PaginationProps> = ({
  total = 1,
  onChange,
  active = 1,
}) => {
  const handleChange = (page: number): void => {
    onChange({
      page: page,
    });
  };

  return (
    <>
      <Pagination>
        {active > 1 && (
          <>
            <Pagination.First
              disabled={active === 1}
              onClick={() =>
                active > 2 ? handleChange(active - 2) : handleChange(1)
              }
            />
          </>
        )}
        <Pagination.Prev
          disabled={active === 1}
          onClick={() =>
            active > 1 ? handleChange(active - 1) : handleChange(1)
          }
        />

        <Pagination.Next
          onClick={() =>
            active > total - 1 ? handleChange(1) : handleChange(active + 1)
          }
        />
        <Pagination.Last
          onClick={() =>
            active > total - 2 ? handleChange(1) : handleChange(active + 2)
          }
        />
      </Pagination>
    </>
  );
};

export default BasicPagination;
