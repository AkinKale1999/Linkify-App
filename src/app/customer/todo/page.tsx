'use client';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { CustomersTodoStatusTypeEnum, CustomerTodoType } from '../../../types/ToDoCustomerType'

import {
  Grid,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  Typography,

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// @ts-ignore
import { useTable, usePagination, Column } from 'react-table';
import { useRouter } from 'next/navigation';
import { FaRegEye } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { GiCheckMark } from 'react-icons/gi';
import { GrDocumentTime } from 'react-icons/gr';
import { styled, Theme } from '@mui/material/styles';
import ModalAdd from './components/ModalAddToDo';
import ModuleUpdate from './components/ModalUpdateToDo';
import ColumnTooltip from './components/AddColumnTooltip';
// import useVisibleStore from '../../store/TaskStore';
import { useTranslations } from 'next-intl';
import { JSX } from 'react/jsx-runtime';
import { MUIStyledCommonProps } from '@mui/system';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<CustomerTodoType[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTodo, setEditTodo] = useState<{ id: number | null; task: string }>({
    id: null,
    task: '',
  });
  const [updateTodo, setUpdateTodo] = useState<boolean>(false);
  const [visibleOpen, setVisibleOpen] = useState<boolean>(false);
  const [visibleAddOpen, setAddVisibleOpen] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'col1',
    'colNumber',
    'colCheck',
    'col2',
    'col3',
    'col4',
    'col5',
    'col11',
  ]);
  // @ts-ignore
  // const { idTask }: { idTask: number } = useVisibleStore();
  const router = useRouter(); 


  const token = localStorage.getItem('user')
  useLayoutEffect(() => {
  if (!token) {
    router.push('/login'); // Перенаправлення на dashboard після успішного логіну
  }

}, [])


  const menuRef = useRef<HTMLDivElement | null>(null);
  const colorId = useRef<string | null>(null);



  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setVisibleOpen(false); // Закриваємо блок при кліку поза ним
    }
  };

  useEffect(() => {
    // Додаємо обробник події при монтуванні компонента
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Вилучаємо обробник події при демонтажі компонента
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const StyledTableRow = styled('tr')({
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  });

  const wBox = {
    width: '87%',
    marginRight: '20px',
    marginLeft: '13%'
  };
  useEffect(() => {
    const loadTodos = async () => {
      const newTodo = [
        {
          "id": "69",
          "customer_id": null,
          "number": "CAS-63",
          "task": "testoviy2-viktor",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-11-19 14:55:02",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-11-19 14:55:02",
          "lastchange_by": "zxc",
          "created": "2024-11-19 14:55:02",
          "created_by": "System",
          "client_id": "229"
        },
        {
          "id": "67",
          "customer_id": null,
          "number": "CAS-61",
          "task": "testoviy2",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-11-19 14:55:02",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-11-19 14:55:02",
          "lastchange_by": "zxc",
          "created": "2024-11-19 14:55:02",
          "created_by": "System",
          "client_id": "229"
        },
        {
          "id": "61",
          "customer_id": null,
          "number": "CAS-55",
          "task": "new1",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-10-29 17:44:59",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-10-29 17:44:59",
          "lastchange_by": "zxc",
          "created": "2024-10-29 17:44:59",
          "created_by": "System",
          "client_id": "229"
        },
        {
          "id": "58",
          "customer_id": null,
          "number": "CAS-52",
          "task": "4117687686",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-10-29 15:28:44",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-10-29 15:28:44",
          "lastchange_by": "zxc",
          "created": "2024-10-29 15:28:44",
          "created_by": "System",
          "client_id": "229"
        },
        {
          "id": "57",
          "customer_id": null,
          "number": "CAS-51",
          "task": "515251",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-10-29 15:26:39",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-10-29 15:26:39",
          "lastchange_by": "zxc",
          "created": "2024-10-29 15:26:39",
          "created_by": "System",
          "client_id": "229"
        },
        {
          "id": "56",
          "customer_id": null,
          "number": "CAS-50",
          "task": "zhenja1",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-10-25 12:19:39",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-11-19 12:44:06",
          "lastchange_by": "zxc",
          "created": "2024-10-25 12:19:39",
          "created_by": "System",
          "client_id": "229"
        },
        {
          "id": "55",
          "customer_id": null,
          "number": "CAS-49",
          "task": "lllllllллл",
          "solution": null,
          "message_history": null,
          "tags": null,
          "status": "Pending",
          "start_date": "2024-10-25 12:19:20",
          "end_date": null,
          "diff_time": null,
          "lastchange": "2024-10-25 12:19:20",
          "lastchange_by": "zxc",
          "created": "2024-10-25 12:19:20",
          "created_by": "System",
          "client_id": "229"
        }
      ]
      // @ts-ignore
      const tasks: Todo[] = newTodo; // Переконайтесь, що тут правильний тип
      console.log(tasks);

      setTodos(tasks);
    };
    loadTodos();
  }, [updateTodo]);

  const addTodo = async () => {

    const addedTodo: CustomerTodoType = await createToDoList({
      task: newTodo,
      id: '0',
      number: '0',
      diff_time: null,
      status: CustomersTodoStatusTypeEnum.Pending,
      start_date: Number(''),
      end_date: '',
      lastchange: null,
      lastchange_by: null,
      created: null,
      created_by: null,
      customer_id: '0',
      solution: '',
      message_history: null
    });
    setTodos([...todos, addedTodo]);
    setNewTodo('');
  };

  const handleEditClick = (todo: CustomerTodoType) => {
    setEditTodo({
      id: Number(todo.id),
      task: todo.task,
    });
    setUpdateTodo(true);
  };

  const handleUpdate = async () => {
    if (editTodo.id === null) return;
    try {
      // @ts-ignore
      const updatedTodo: CustomerTodoType = await updateToDoList(editTodo.id, { task: editTodo.task });
      setTodos(
        todos.map((todo) =>
          todo.id === String(editTodo.id) ? updatedTodo : todo
        )
      );
      setEditTodo({ id: null, task: '' });
      setUpdateTodo(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };
  const DiffTimeTask = (time: number | null): string => {
    if (!time) return 'N/A';
    const totalSeconds = Math.floor(time / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days} day ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const data = React.useMemo(
    () =>
      todos.map((todo) => ({
        id: todo.id,
        col1: todo.task,
        colNumber: todo.number,
        colCheck: todo.diff_time ? <GiCheckMark /> : <GrDocumentTime />,
        col2: todo.status,
        col3: todo.start_date,
        col4: todo.end_date,
        col5: DiffTimeTask(Number(todo.diff_time)),
        col6: todo.lastchange,
        col7: todo.lastchange_by,
        col8: todo.created,
        col9: todo.created_by,
        col11: (
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => {
              handleEditClick(todo);
              setUpdateTodo(true);
            }}
          >
            <EditIcon />
          </IconButton>
        ),
      })),
    [todos]
  );

  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: 'task',
        accessor: 'col1',
        Cell: ({ value }: any) => value
      },
      { Header: 'number', accessor: 'colNumber' },
      { Header: 'check', accessor: 'colCheck' },
      { Header: 'status', accessor: 'col2' },
      { Header: 'start_date', accessor: 'col3' },
      { Header: 'end_date', accessor: 'col4' },
      { Header: 'diff_time', accessor: 'col5' },
      { Header: 'last_change', accessor: 'col6' },
      { Header: 'last_change_by', accessor: 'col7' },
      { Header: 'created', accessor: 'col8' },
      { Header: 'created_by', accessor: 'col9' },
      {
        Header: 'actions',
        accessor: 'col11',
        headerStyle:
        {
          backgroundColor: '#fff',
          color: '#000',
          textAlign: 'center',
          fontWeight: 'bold',
          position: 'sticky',
          right: 0, zIndex: 10
        },
        cellStyle:
        {
          position: 'sticky',
          right: 0,
          backgroundColor: '#fff',
          zIndex: 5
        },
      },
    ],
    []
  );

  const filteredColumns = React.useMemo(() => {
    return columns.filter((column) =>
      visibleColumns.includes(column.accessor as string)
    );
  }, [visibleColumns, columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns: filteredColumns, data, initialState: { pageSize: 5 } },
    usePagination
  );

  const handleCellClick = (todoId: number) => {
    router.push(`/details/${todoId}`);
  };

  const handleToggleColumn = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((col) => col !== columnId)
        : [...prev, columnId]
    );
  };

  return (
    <>
      <ModuleUpdate
        updateTodo={updateTodo}
        editTodo={editTodo}
        setUpdateTodo={setUpdateTodo}
        setEditTodo={setEditTodo}
        handleUpdate={handleUpdate}
      />
      <Grid container spacing={2} sx={{ marginTop: '0px' }}>
        <Grid item xs={12}>
          <Box sx={{ ...wBox }}>
            <Button style={{ float: 'right' }} onClick={() => setVisibleOpen(!visibleOpen)}>
              <FaRegEye size={30} />
            </Button>
            <ColumnTooltip
              visibleOpen={visibleOpen}
              menuRef={menuRef}
              columns={columns}
              visibleColumns={visibleColumns}
              handleToggleColumn={handleToggleColumn}
            />
            <Button style={{ float: 'right', }}
              onClick={() => setAddVisibleOpen(!visibleOpen)}>
              <FaPlus size={30} />
            </Button>
            <ModalAdd
              visibleAddOpen={visibleAddOpen}
              setNewTodo={setNewTodo}
              setAddVisibleOpen={setAddVisibleOpen}
              menuRef={menuRef}
              newTodo={newTodo}
              addTodo={addTodo}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <div style={{ maxHeight: '278px', overflowY: 'auto', overflowX: 'auto' }}>
            <table {...getTableProps()} style={{ marginTop: '20px' }}>
              <thead>
                {headerGroups.map((headerGroup: { getHeaderGroupProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; id: React.Key | null | undefined; headers: any[]; }) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column: { getHeaderProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>; id: React.Key | null | undefined; headerStyle: React.CSSProperties | undefined; render: (arg0: string) => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id} // Ensure each column header has a unique key
                        style={{
                          background: '#fff',
                          color: 'black',
                          fontWeight: 'bold',
                          ...column.headerStyle,
                        }}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row: { original: { id: React.Key | null | undefined; }; getRowProps: () => React.JSX.IntrinsicAttributes & MUIStyledCommonProps<Theme> & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }) => {
                  const colorIdArray = colorId.current ? JSON.parse(colorId.current) : [];
                  const isSelected = colorIdArray.some((id: any) => row.original.id === id);
                  prepareRow(row);
                  return (
                    <StyledTableRow {...row.getRowProps()} key={row.original.id}>
                      {row.cells.map((cell: { getCellProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; column: { id: React.Key | null | undefined; cellStyle: React.CSSProperties | undefined; }; render: (arg0: string) => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id} // Ensure each cell has a unique key
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            background: '#fff',
                            minWidth: '200px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#f0f0f0' : 'inherit',
                            ...cell.column.cellStyle,
                          }}
                          onClick={() => {
                            const excludedAccessors = ['col11'];
                              // @ts-ignore
                            if (!excludedAccessors.includes(cell.column.id)) {
                                // @ts-ignore
                              handleCellClick(row.original.id);
                            }
                          }}
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </StyledTableRow>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Box display="flex" alignItems="center" sx={{ float: "right", marginRight: '20px' }} mt={2}>
            <Button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              variant="contained"
              size="small"
            >
              {'<<'}
            </Button>
            <Button
              onClick={previousPage}
              disabled={!canPreviousPage}
              variant="contained"
              size="small"
              sx={{ mx: 1 }}
            >
              {'<'}
            </Button>
            <Button
              onClick={nextPage}
              disabled={!canNextPage}
              variant="contained"
              size="small"
            >
              {'>'}
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              variant="contained"
              size="small"
              sx={{ mx: 1 }}
            >
              {'>>'}
            </Button>
            <Typography variant="body1" sx={{ mx: 2 }}>
              Сторінка{' '}
              <strong>
                {pageIndex + 1} з {pageOptions.length}
              </strong>
            </Typography>
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              size="small"
              variant="outlined"
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <MenuItem key={size} value={size}>
                  Показувати {size}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TodoApp;
function createToDoList(arg0: { task: string; id: string; number: string; diff_time: null; status: CustomersTodoStatusTypeEnum; start_date: number; end_date: string; lastchange: null; lastchange_by: null; created: null; created_by: null; customer_id: string; solution: string; message_history: null; }): any {
  throw new Error('Function not implemented.');
}

