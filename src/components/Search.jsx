import PropTypes from "prop-types";

const Search = ({ toggleBtn, downloadJSON, downloadCSV }) => (
  <div>
    <button onClick={toggleBtn}>Search</button>
    <a href="data.json" onClick={downloadJSON}>
      Export JSON
    </a>
    <a href="data.csv" onClick={downloadCSV}>
      Export CSV
    </a>
  </div>
);

Search.propTypes = {
  toggleBtn: PropTypes.func,
  downloadJSON: PropTypes.func,
  downloadCSV: PropTypes.func,
};

export default Search;
