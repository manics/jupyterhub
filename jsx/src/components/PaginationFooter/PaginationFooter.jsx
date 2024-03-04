import React from "react";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";

import "./pagination-footer.css";

const PaginationFooter = (props) => {
  let { offset, limit, visible, total, next, prev, handleLimit } = props;
  return (
    <div className="pagination-footer">
      <p>
        Displaying {offset}-{offset + visible}
        <br />
        {offset >= 1 ? (
          <button className="btn btn-sm btn-light spaced">
            <span
              className="active-pagination"
              data-testid="paginate-prev"
              onClick={prev}
            >
              Previous
            </span>
          </button>
        ) : (
          <button className="btn btn-sm btn-light spaced">
            <span className="inactive-pagination">Previous</span>
          </button>
        )}
        {offset + visible < total ? (
          <button className="btn btn-sm btn-light spaced">
            <span
              className="active-pagination"
              data-testid="paginate-next"
              onClick={next}
            >
              Next
            </span>
          </button>
        ) : (
          <button className="btn btn-sm btn-light spaced">
            <span className="inactive-pagination">Next</span>
          </button>
        )}
        <label>
          Items per page:
          <FormControl
            type="number"
            min="25"
            step="25"
            name="pagination-limit"
            placeholder={limit}
            aria-label="pagination-limit"
            defaultValue={limit}
            onChange={handleLimit}
          />
        </label>
      </p>
    </div>
  );
};

PaginationFooter.propTypes = {
  endpoint: PropTypes.string,
  page: PropTypes.number,
  limit: PropTypes.number,
  numOffset: PropTypes.number,
  numElements: PropTypes.number,
};

export default PaginationFooter;
