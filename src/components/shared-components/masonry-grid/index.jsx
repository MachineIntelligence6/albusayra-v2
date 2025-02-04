import React from "react";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import "./style.css";

const MasonryGrid = (props) => {
    const {
        breakpointCols,
        columnGap,
        rowGap,
        children
    } = props
    return (
        <Masonry
            breakpointCols={breakpointCols}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
        >
            {children}
        </Masonry>
    );
};

MasonryGrid.propTypes = {
    items: PropTypes.array.isRequired, // Array of items to render
    breakpointCols: PropTypes.object, // Object defining responsive breakpoints
    renderItem: PropTypes.func.isRequired, // Function to render each item
    columnGap: PropTypes.string, // Gap between columns
    rowGap: PropTypes.string, // Gap between rows
};

MasonryGrid.defaultProps = {
    breakpointCols: {
        default: 2,
        1100: 2,
        700: 1
    },
    columnGap: 16,
    rowGap: 30,
};

export default MasonryGrid;
