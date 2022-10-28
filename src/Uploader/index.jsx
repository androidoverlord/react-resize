import React, { useState, useRef } from "react";
import styled from "styled-components";

//

const ProfileWrapper = styled.div`
    position: relative;
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
                    originalW={250}
                    originalH={187.5}
                    originalX={265}
                    originalY={110}
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

const Image = ({ originalX, originalY, originalW, originalH }) => {
    const [ initial,setInitial] = useState([0,0]);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [position, setPosition] = useState(0);
    const [xpos, setXpos] = useState(parseInt(originalX));
    const [ypos, setYpos] = useState(parseInt(originalY));
    const [width, setWidth] = useState(parseInt(originalW));
    const [height, setHeight] = useState(parseInt(originalH));
    const [offset, setOffset] = useState({
        x: 0,
        y: 0,
        w: parseInt(originalW),
        h: parseInt(originalH),
    });
    const reference = useRef(null);

    /**
     * functions
     */

    const onDragStart = (event) => {
        event.stopPropagation();

        // console.log(event.target);

        /**
         * find and initial
         * set of position
         * for reference
         */
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(reference.current.style.transform);
        setInitial( matches ? matches[1].split(",") : [0, 0] );

        setOffset({
            x: event.clientX - xpos,
            y: event.clientY - ypos,
            w: width,
            h: height
        });

        /**
         * resizing
         */

        if (event.target.classList.contains("corner")) {
            const position = parseInt(event.target.dataset.position);
            setResizing(true);
            setPosition(position);
        }

        setDragging(true);
    };

    const onDrag = (event) => {
        event.preventDefault();

        /**
         *
         */

        if (resizing) {
            /**
             * this is a resizing
             * event for width
             */

            let  newWidth;
            let  newHeight; 
            const ratio = Math.sqrt( (originalW / originalH ) * (originalW * originalH) );

            switch (position) {
                case 0:
                    newWidth = offset.w - ((event.clientX - offset.x) - parseInt( initial[0]));
                    newHeight = originalH * (newWidth / ratio) ;
                  
                    setWidth(newWidth);
                    setHeight(newHeight);
                    setXpos( parseInt( initial[0]) +  ( offset.w - newWidth));
                    setYpos( parseInt( initial[1]) + ( offset.h - newHeight));

                    break;
                case 1:
                    newWidth = offset.w + ((event.clientX - offset.x) - parseInt( initial[0]));
                    newHeight = originalH * (newWidth / ratio) ;
                  
                    setWidth(newWidth);
                    setHeight(newHeight);
                    setYpos( parseInt( initial[1]) + ( offset.h - newHeight));

                    break;
                case 2:
                    newWidth = offset.w + ((event.clientX - offset.x) - parseInt( initial[0]));
                    newHeight = originalH * (newWidth / ratio) ;

                    setWidth(newWidth);
                    setHeight(newHeight);
                    
                    break;
                case 3:
                    newWidth = offset.w - ((event.clientX - offset.x) - parseInt( initial[0]));
                    newHeight = originalH * (newWidth / ratio) ;
                  
                    setWidth(newWidth);
                    setHeight(newHeight);
                    setXpos( parseInt( initial[0]) +  ( offset.w - newWidth));
                    break;
                default:
                    break;
            }
        } else {
            /**
             * this is a dragging
             * event for xpos, ypos
             */
            console.log("drag position working correctly");
            setXpos(event.clientX - offset.x);
            setYpos(event.clientY - offset.y);
        }
    };

    const onDragEnd = (event) => {
        event.preventDefault();

        if (resizing) {
            /**
             * this is resizing
             */
        } else {
            /**
             * this is a dragging
             * event for xpos, ypos
             */
            // const translate = `translate(${event.clientX - offset.x}px,${
            //     event.clientY - offset.y
            // }px)`;
            // reference.current.style.transform = translate;
        }

        setDragging(false);
        setResizing(false);

        // props.update();
    };

    /**
     *
     *
     */
    return (
        <div
            className="container"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: `2px solid red`,
            }}
            onDragOver={onDrag}
            onDrop={onDragEnd}
        >
            {dragging && (
                <ImageWrapper
                    style={{
                        position: "fixed",
                        transform: `translate(${xpos}px,${ypos}px)`,
                        transformOrigin: `bottom right`,
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                >
                    <img
                        style={{ pointerEvents: "none" }}
                        src={require(`@root/assets/images/pic.png`)}
                    />
                </ImageWrapper>
            )}

            <ImageWrapper
                ref={reference}
                style={{
                    transform: `translate(${xpos}px,${ypos}px)`,
                    opacity: dragging ? 0 : 1,
                    width: `${width}px`,
                    height: `${height}px`,

                }}
                draggable
                onDragStart={onDragStart}
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
                        pointerEvents: "none",
                    }}
                    src={require(`@root/assets/images/pic.png`)}
                />
            </ImageWrapper>
        </div>
    );
};
