import type { HTMLAttributes } from "react";

const Table = ({ className = "", ...props }: HTMLAttributes<HTMLTableElement>) => {
  return (
    <table
      className={`w-full border-separate border-spacing-y-2 ${className}`}
      {...props}
    />
  );
};

const TableHead = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead
      className={`text-left text-xs uppercase tracking-[0.18em] text-white/50 ${className}`}
      {...props}
    />
  );
};

const TableRow = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr
      className={`bg-white/5 transition ${className}`}
      {...props}
    />
  );
};

const TableCell = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className={`px-4 py-3 text-sm text-white/80 ${className}`}
      {...props}
    />
  );
};

export { Table, TableHead, TableRow, TableCell };
