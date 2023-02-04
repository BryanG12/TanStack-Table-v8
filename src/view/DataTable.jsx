import { useCallback, useMemo, useState } from "react";
import fetchUsers from "../utils/dataFetch";
import { Table } from "./Table";


export const DataTable = () => {


  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback(async function (page) {
    setIsLoading(true);
    const json = await fetchUsers(page + 1);
    setUsers(json.data);
    setPageCount(json.total_pages);
    setIsLoading(false);
  }, []);

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: () => <span>ID</span>,
    },
    {
      accessorKey: "email",
      header: () => <span>Correo</span>,
    },
    {
      accessorKey: "first_name",
      header: () => <span>Nombre</span>,
    },
  ]);

  return (
    <div className="px-6 py-4">
      <Table
        columns={columns}
        data={users}
        fetchData={fetchData}
        pageCount={pageCount}
      />
      <div>{isLoading && <div>Cargando...</div>}</div>
    </div>
  );
};
