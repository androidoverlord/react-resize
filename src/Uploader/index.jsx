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

const ImageWrapper = styled.img`
    width: 300px;
    height: auto;
    box-sizing: border-box;
    border: 5px solid orange;
    transition: border-radius 400ms ease;
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [xdrag, setXdrag] = useState(0);
    const [ydrag, setYdrag] = useState(0);
    const [xpos, setXpos] = useState(0);
    const [ypos, setYpos] = useState(0);
    const [offset, setOffset] = useState({});
    const reference = useRef(null);

    const onDragStart = (event) => {
        setOffset({ x: event.clientX, y: event.clientY });
        setDragging(true);
    };

    const onDrag = (event) => {
        event.preventDefault();

        /**
         *    where object is: left/top
         *  + where the mouse is: event.client
         *  - where the object started: offset
         */
        setXpos(event.clientX - offset.x);
        setYpos(event.clientY - offset.y);
    };

    const onDragEnd = (event) => {
        setDragging(false);

        /**
         * translate into percentages
         */
         reference.current.style.transform = `translate(${ offset.x - xpos }px,${ offset.y - ypos }px)`;
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
                    transform: `translate(${xpos}px,${ypos}px)`,
                }}
                src={require(`@root/assets/images/pic.png`)}
            />
            <ImageWrapper
                ref={reference}
                style={{ opacity: dragging ? 0.3 : 1 }}
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                src={require(`@root/assets/images/pic.png`)}
            />
        </>
    );
};
