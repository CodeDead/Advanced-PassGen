import React from 'react';
import TableCell from '@mui/material/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
};

const MuiVirtualizedTable = (props) => {
  const getRowClassName = ({ index }) => {
    const { onRowClick } = props;

    let className = `${classes.tableRow} ${classes.flexContainer}`;
    if (index !== -1 && onRowClick != null) {
      className += ` ${classes.tableRowHover}`;
    }

    return className;
  };

  const cellRenderer = ({ cellData }) => {
    const { rowHeight, onRowClick } = props;
    let className = `${classes.tableCell} ${classes.flexContainer}`;
    if (onRowClick == null) {
      className += ` ${classes.noClick}`;
    }

    return (
      <TableCell
        component="div"
        className={className}
        variant="body"
        style={{ height: rowHeight || 48 }}
        align="left"
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns } = props;

    return (
      <TableCell
        component="div"
        className={`${classes.tableCell} ${classes.flexContainer} ${classes.noClick}`}
        variant="head"
        style={{ height: headerHeight || 48 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  const {
    columns, rowHeight, headerHeight, ...tableProps
  } = props;
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight || 48}
          gridStyle={{
            direction: 'inherit',
          }}
          headerHeight={headerHeight || 48}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...tableProps}
          rowClassName={getRowClassName}
        >
          {columns.map(({ dataKey, ...other }, index) => (
            <Column
              flexGrow={index === 0 ? 1 : null}
              key={dataKey}
              headerRenderer={(headerProps) => headerRenderer({
                ...headerProps,
                columnIndex: index,
              })}
              className={classes.flexContainer}
              cellRenderer={cellRenderer}
              dataKey={dataKey}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...other}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

export default MuiVirtualizedTable;
