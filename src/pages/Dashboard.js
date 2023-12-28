import React, { useState } from 'react'
import Base from '../components/Base'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const columns = [
  { id: "studentName", label: "Student Name", minWidth: 100 },
  { id: "courseName", label: "Course", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "startTime", label: "Start Time", minWidth: 100, align: "right" },
  { id: "endTime", label: "End Time", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 170 }
];

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const formattedDate = (dateString) => {
    if (!dateString) {
      return "-";
    }

    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formattedTime = (timeString) => {
    if (!timeString) {
      return "-";
    }

    const date = new Date(timeString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createData = (
    studentName,
    courseName,
    date,
    startTime,
    endTime,
    description
  ) => {
    return {
      studentName,
      courseName,
      date: formattedDate(date),
      startTime: formattedTime(startTime),
      endTime: formattedTime(endTime),
      description,
    };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Base title={'Admin Dashboard'}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, ind) => (
                    <TableRow
                      key={ind}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Base>
  );
}

export default Dashboard;