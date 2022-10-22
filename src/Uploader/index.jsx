import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

//

const ProfileWrapper = styled.div`
    width: 700px;
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
    height: 200px;
    position: absolute;
    right: auto;
    bottom: auto;
    background: gray;
    box-sizing: border-box;
    border: 5px solid orange;
    transition: border-radius 400ms ease;
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [xpos, setXpos] = useState(0);
    const [ypos, setYpos] = useState(0);
    const [offset, setOffset] = useState({});
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(150);
    const reference = useRef(null);

    const onDragStart = (event) => {
        setOffset({ x: event.clientX, y: event.clientY });
        setXpos(parseInt(reference.current.offsetLeft));
        setYpos(parseInt(reference.current.offsetTop));

        setDragging(true);
    };

    const onDrag = (event) => {
        event.preventDefault();

        const left = parseInt(reference.current.offsetLeft);
        const top = parseInt(reference.current.offsetTop);

        /**
         *    where object is: left/top
         *  + where the mouse is: event.client
         *  - where the object started: offset
         */
        setXpos(left + event.clientX - offset.x);
        setYpos(top + event.clientY - offset.y);
    };

    const onDragEnd = (event) => {
        setDragging(false);

        /**
         * translate into percentages
         */

        // reference.current.style.left = `${xpos}px`;
        // reference.current.style.top = `${ypos}px`;
    };

    /**
     *
     *
     */
    return (
        <>
            <ImageWrapper
                style={{
                    position: "fixed",
                    display: dragging ? "block" : "none",
                    top: `${ypos}px`,
                    left: `${xpos}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
            <ImageWrapper
                ref={reference}
                style={{ opacity: dragging ? 0 : 1 }}
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
            />
        </>
    );
};
