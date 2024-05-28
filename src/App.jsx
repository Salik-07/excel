import { useRef, useState } from "react";

import Header from "./components/Header";
import Body from "./components/Body";
import Search from "./components/Search";

import books from "./data/books";
import tableHeaders from "./data/tableHeaders";

function App() {
  const [state, setState] = useState({
    search: false,
    descending: false,
    sortBy: null,
    edit: null,
    data: books,
  });

  const _preSearchData = useRef(null);

  const sort = (e) => {
    const column = e.target.cellIndex;
    const dataToBeSorted = state.data;
    const descending = state.sortBy === column && state.descending !== true;

    dataToBeSorted.sort((a, b) => {
      return descending
        ? a[column] < b[column]
          ? 1
          : -1
        : a[column] > b[column]
        ? 1
        : -1;
    });

    setState({
      ...state,
      data: dataToBeSorted,
      sortBy: column,
      descending: descending,
    });
  };

  const editCell = (e) => {
    setState({
      ...state,
      edit: {
        row: parseInt(e.target.dataset.rowIdx, 10),
        cell: e.target.cellIndex,
      },
    });
  };

  const saveContent = (e) => {
    e.preventDefault();

    const input = e.target.firstChild;
    const data = state.data;

    data[state.edit.row][state.edit.cell] = input.value;

    setState({
      ...state,
      data: data,
      edit: null,
    });
  };

  const toggleSearch = () => {
    if (state.search) {
      setState({
        ...state,
        data: _preSearchData.current,
        search: false,
      });

      _preSearchData.current = null;
    } else {
      _preSearchData.current = state.data;

      setState({ ...state, search: true });
    }
  };

  const addSearchField = () => {
    if (!state.search) return null;

    return (
      <tr>
        {tableHeaders.map((_ignore, idx) => (
          <td key={idx}>
            <input
              type="text"
              data-idx={idx}
              onChange={search}
              placeholder="Search item"
            />
          </td>
        ))}
      </tr>
    );
  };

  const search = (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      setState({
        ...state,
        data: _preSearchData.current,
      });

      return;
    }

    const searchData = _preSearchData.current.filter((row) =>
      row[idx].toLowerCase().includes(searchTerm)
    );

    setState({
      ...state,
      data: searchData,
    });
  };

  const download = (format, e) => {
    const content =
      format === "json"
        ? JSON.stringify(state.data)
        : state.data.reduce(
            (result, row) =>
              result +
              row.reduce(
                (rowResult, cell, idx) =>
                  `${rowResult} "${cell}" ${idx < row.length - 1 ? "," : ""}`,
                ""
              ) +
              "\n",
            ""
          );

    const URL = window.URL || window.webkitURL;
    const blob = new Blob([content], { type: "text" + format });

    e.target.href = URL.createObjectURL(blob);
    e.target.download = "data." + format;
  };

  const { data, sortBy, descending, edit } = state;

  return (
    <div>
      <Search
        toggleBtn={toggleSearch}
        downloadJSON={(e) => download("json", e)}
        downloadCSV={(e) => download("csv", e)}
      />
      <table>
        <Header
          headers={tableHeaders}
          sortBy={sortBy}
          descending={descending}
          onClick={sort}
        />
        <Body
          onDoubleClick={editCell}
          onSubmit={saveContent}
          data={data}
          edit={edit}
          addSearchField={addSearchField}
        />
      </table>
    </div>
  );
}

export default App;
