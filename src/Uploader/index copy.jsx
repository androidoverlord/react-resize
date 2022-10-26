import React, { useState, useRef, useEffect, useMemo } from "react";
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

const Uploader = (props) => {
    return (
        <ProfileWrapper>
            <UploaderWrapper>
                <Image
                    update={(values) => {
                        console.log(values);
                    }}
                />
            </UploaderWrapper>
        </ProfileWrapper>
    );
};

export default Uploader;

/**
 *
 */

const diff = 20;
const CornerWrapper = styled.div`
    width: 20px;
    height: 20px;
    border: red;
    opacity: 0.3;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid red;
    position: absolute;
    border-radius: 50%;
    z-index: 20;
    transition: opacity 200ms ease;

    &:nth-child(1) {
        top: -${diff / 2}px;
        left: -${diff / 2}px;
        right: auto;
        bottom: auto;
    }

    &:nth-child(2) {
        top: -${diff / 2}px;
        left: auto;
        right: -${diff / 2}px;
        bottom: auto;
    }

    &:nth-child(3) {
        top: auto;
        left: auto;
        right: -${diff / 2}px;
        bottom: -${diff / 2}px;
    }

    &:nth-child(4) {
        top: auto;
        left: -${diff / 2}px;
        right: auto;
        bottom: -${diff / 2}px;
    }

    &:hover,
    &.active {
        opacity: 1;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    z-index: 1;
    width: 300px;
    height: auto;
    box-sizing: border-box;
    transform-origin: left top;
    transition: border-radius 400ms ease;

    img {
        width: 100%;
        height: auto;
    }
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [xpos, setXpos] = useState(0);
    const [ypos, setYpos] = useState(0);
    const [width, setWidth] = useState(200);
    const [offset, setOffset] = useState({ x: 0, y: 0, w: 0 });
    const reference = useRef(null);

    /**
     * functions
     */

    const onDragStart = (event) => {
        // event.preventDefault();
        /**
         * find and initial
         * set of position
         * for reference
         */
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(reference.current.style.transform);
        const initial = matches ? matches[1].split(",") : [0, 0];

        // console.log("started: ", reference.current.offsetWidth);

        setOffset({
            x: event.clientX - parseInt(initial[0]),
            y: event.clientY - parseInt(initial[1]),
            w: parseInt(reference.current.offsetWidth),
        });

        /**
         * set position
         */
        setXpos(parseInt(initial[0]));
        setYpos(parseInt(initial[1]));
        setWidth(parseInt(reference.current.offsetWidth));

        /**
         * resizing
         */

        setDragging(true);
    };

    const onDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const relativeX = event.clientX - offset.x;
        const relativeY = event.clientY - offset.y;

        console.log("dragging: ", event.clientX);

        if (event.target.classList.contains("corner")) {
            /**
             * this is a resizing
             * event for width
             */
            const scale = parseInt(offset.w) + relativeX - xpos;
            const position = parseInt(event.target.dataset.position);

            switch (position) {
                case 0:
                    // top left
                    // setWidth(scale);
                    // setXpos(relativeX * scale);
                    // setYpos(relativeY * scale);
                    break;
                case 1:
                    // setWidth(scale);
                    // setYpos(scale - offset.y);
                    break;
                case 2:
                    setWidth(scale);
                    break;
                case 3:
                    break;
                default:
                    break;
            }
        } else {
            /**
             * this is a dragging
             * event for xpos, ypos
             */
            setXpos(relativeX);
            setYpos(relativeY);
        }
    };

    const onDragEnd = (event) => {
        event.preventDefault();
        setDragging(false);

        if (!event.target.classList.contains("corner")) {
            /**
             * this is a dragging
             * event for xpos, ypos
             */
            const translate = `translate(${event.clientX - offset.x}px,${
                event.clientY - offset.y
            }px)`;
            reference.current.style.transform = translate;
        }
        // props.update();
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
                    borderColor: "green",
                    transform: `translate(${xpos}px,${ypos}px)`,
                    width: `${width}px`,
                }}
            >
                <img src={require(`@root/assets/images/pic.png`)} />
            </ImageWrapper>

            <ImageWrapper
                ref={reference}
                style={{
                    opacity: dragging ? 0 : 1,
                    width: `${width}px`,
                }}
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
            >
                {Array.from({ length: 4 }, (object, index) => {
                    return (
                        <CornerWrapper
                            draggable
                            className={`corner`}
                            data-position={index}
                            key={`corner-item-${index}`}
                        />
                    );
                })}
                <img
                    style={{
                        opacity: dragging ? 0 : 1,
                        position: "relative",
                        zIndex: -100,
                    }}
                    src={require(`@root/assets/images/pic.png`)}
                />
            </ImageWrapper>
        </>
    );
};
