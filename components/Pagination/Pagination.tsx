import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
