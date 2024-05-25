import PropTypes from "prop-types";

export const Body = ({
  onDoubleClick,
  onSubmit,
  data,
  addSearchField,
  edit,
}) => (
  <tbody onDoubleClick={onDoubleClick}>
    {addSearchField()}

    {data.map((row, rowIdx) => (
      <tr key={rowIdx}>
        {row.map((cell, idx) => {
          let content = cell;

          if (edit && rowIdx === edit.row && idx === edit.cell) {
            content = (
              <form onSubmit={onSubmit}>
                <input type="text" defaultValue={content} />
              </form>
            );
          }

          return (
            <td key={idx} data-row-idx={rowIdx}>
              {content}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
);

Body.propTypes = {
  onDoubleClick: PropTypes.func,
  onSubmit: PropTypes.func,
  edit: PropTypes.object,
  data: PropTypes.array,
  addSearchField: PropTypes.func,
};
