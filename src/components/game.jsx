import React from "react";
import PageHeader from "./common/pageHeader";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 170 },
  { id: "add_cashing", label: "Add Cashing", minWidth: 170 },
  {
    id: "ammount_cashed",
    label: "Ammount Cashed",
    minWidth: 170,
    //   align: 'right',
  },
  {
    id: "cash_in_hand",
    label: "Cash In Hand",
    minWidth: 170,
    // align: "right",
  },
  {
    id: "profit",
    label: "Profit/Loss",
    minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "cancel_cashing",
    label: "Cancel Cashing",
    minWidth: 170,
    //   align: 'right',
  },
];

function createData(
  name,
  add_cashing,
  ammount_cashed,
  cash_in_hand,
  cancel_cashing,
  image
) {
  const profit = -ammount_cashed + cash_in_hand;
  return {
    name,
    image,
    add_cashing,
    ammount_cashed,
    cash_in_hand,
    profit,
    cancel_cashing,
  };
}

const rows = [
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),

  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
  createData("Bibs", "", 50, 63, ""),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Game(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container">
      <PageHeader titleText="Start a new game" />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
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
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
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
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

// const Game = (props) => {
//   return (
//     <div className="container">
//       <PageHeader titleText="Start a new game" />
//       <p>{props.location.selected.selected[0]}</p>
//       <p>{console.log(props.location.selected.selected)}</p>
//     </div>
//   );
// };

// export default Game;
