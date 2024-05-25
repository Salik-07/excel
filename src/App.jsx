import { useState } from "react";

import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Search } from "./components/Search";

import data from "./data/books";

const headers = ["Book", "Author", "Language", "Published", "Sales"];

function App() {
  const [state, setState] = useState({
    search: false,
    descending: false,
    sortBy: null,
    edit: null,
    headers,
    data,
  });

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
      data: dataToBeSorted,
      sortBy: column,
      descending: descending,
    });
  };

  const edit = (e) => {
    setState({
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
      data: data,
      edit: null,
    });
  };

  // _preSearchData = null;
  const toggleSearch = () => {
    // if (state.search) {
    //   setState({
    //     data: _preSearchData,
    //     search: false,
    //   });
    //   _preSearchData = null;
    // } else {
    //   _preSearchData = state.data;
    //   setState({
    //     search: true,
    //   });
    // }
  };

  const addSearchField = () => {
    if (!state.search) {
      return null;
    }
    return (
      <tr>
        {state.headers.map((_ignore, idx) => (
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
    // const idx = parseInt(e.target.dataset.idx, 10);
    // const searchTerm = e.target.value.toLowerCase();
    // if (searchTerm === "") {
    //   setState({
    //     data: _preSearchData,
    //   });
    //   return;
    // }
    // const searchData = _preSearchData.filter((row) =>
    //   row[idx].toLowerCase().includes(searchTerm)
    // );
    // setState({
    //   data: searchData,
    // });
  };

  const download = () => {
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

  return (
    <div>
      <Search
        toggleBtn={toggleSearch}
        downloadJSON={(e) => download("json", e)}
        downloadCSV={(e) => download("csv", e)}
      />
      <table>
        <Header
          headers={headers}
          sortBy={state.sortBy}
          descending={state.descending}
          onClick={sort}
        />
        <Body
          onDoubleClick={edit}
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
