import PropTypes from "prop-types";

const Header = ({ onClick, headers, sortBy, descending }) => (
  <thead onClick={onClick}>
    <tr>
      {headers.map((title, idx) => {
        if (sortBy === idx) {
          title += descending ? "\u2193" : "\u2191";
        }

        return <th key={idx}>{title}</th>;
      })}
    </tr>
  </thead>
);

Header.propTypes = {
  sortBy: PropTypes.number,
  onClick: PropTypes.func,
  descending: PropTypes.bool,
  headers: PropTypes.array,
};

export default Header;
