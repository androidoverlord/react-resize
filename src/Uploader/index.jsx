import React, { useState, useRef } from "react";
import styled from "styled-components";

//

const ProfileWrapper = styled.div`
    width: 500px;
    height: 400px;
    background: blue;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UploaderWrapper = styled.div`
    border: 1px solid gray;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 10px solid green;
    box-sizing: border-box;
    background: white;
    position: relative;
`;

//

const Uploader = () => {
    return (
        <ProfileWrapper>
            <UploaderWrapper>
                <Image />
            </UploaderWrapper>
        </ProfileWrapper>
    );
};

export default Uploader;

/**
 *
 */

const ImageWrapper = styled.div`
    width: 300px;

    .content {
        width: 100%;
        height: 200px;
        background: gray;
        top: 0;
        left: 0;
        border: 5px solid orange;
    }
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [values, setValues] = useState({});
    const [container, setContainer] = useState(null);

    //

    function onDragStart(ev) {
        setDragging(true);

        /**
         * create clone
         */
        const reference = ev.target.getBoundingClientRect();
        setValues({
            top: ev.pageY - reference.top,
            left: ev.pageX - reference.left,
            width: reference.width,
            height: reference.height,
        });
        setContainer(reference);
    }

    function onDrag(ev) {
        ev.preventDefault();

        setValues({
            top: ev.pageY - container.top,
            left: ev.pageX - container.left,
            width: container.width,
            height: container.height,
        });
    }

    function onDragEnd(ev) {
        setDragging(false);
    }

    //

    return (
        <>
            <ImageWrapper
                style={{ opacity: dragging ? 0 : 1 }}
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
            >
                <div className="content"></div>
            </ImageWrapper>

            <ImageWrapper
                style={{
                    position: "fixed",
                    borderColor: "green !important",
                    display: dragging ? "block" : "none",
                    pointerEvents: "none",
                    top: `${values.top}px`,
                    left: `${values.left}px`,
                    width: `${values.width}px`,
                    height: `${values.height}px`,
                }}
            >
                <div className="content"></div>
            </ImageWrapper>
        </>
    );
};
