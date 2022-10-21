import React from "react";
import styled from "styled-components";

//

const GridWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    z-index: 2;
    top: 0;
    left: 0;
    pointer-events: none;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0;

    div {
        flex: 0 0 100px;
        height: 100px;
        border-top: 1px solid white;
        border-left: 1px solid white;
    }
`;

//

const Grid = () => {
    return (
        <GridWrapper>
            {Array.from({ length: 40 }, (obj, index) => (
                <div key={`grid-item${index}`} />
            ))}
        </GridWrapper>
    );
};

export default Grid;
