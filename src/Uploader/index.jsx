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

const Uploader = (props) => {
    return (
        <ProfileWrapper>
            <UploaderWrapper>
                <Image update={(values) => { 
                    console.log( values );
                }} />
            </UploaderWrapper>
        </ProfileWrapper>
    );
};

export default Uploader;

/**
 *
 */

const CornerWrapper = styled.div`
    width: 40px;
    height: 40px;
    background: red; 
    // opacity :0;
    background: red;
    border-radius: 50%;
    pointer-events: none;
    position: absolute;
    z-index: 20;
    transition: opacity 200ms ease; 

    &:nth-child(1){ 
        top: 0;
        left: 0;
        right: auto;
        bottom: auto;
    }

    &:nth-child(2){ 
        top: 0;
        left: auto;
        right: 0;
        bottom: auto;
    }

    &:nth-child(3){ 
        top: auto;
        left: auto;
        right: 0;
        bottom: 0;
    }

    &:nth-child(4){ 
        top: auto;
        left: 0;
        right: auto;
        bottom: 0;
    }

    &.active { 
        opacity: 1;
    }
`;

const ImageWrapper = styled.img`
    width: 300px;
    height: auto;
    box-sizing: border-box;
    border: 5px solid orange;
    transform-origin: left top;
    transition: border-radius 400ms ease;
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [xpos, setXpos] = useState(0);
    const [ypos, setYpos] = useState(0);
    const [offset, setOffset] = useState({x:0,y:0});
    const reference = useRef(null);

    /**
     * functions 
     */

    const onDragStart = (event) => {
        /**
         * find and initial
         * set of position 
         * for reference
         */
         const regExp = /\(([^)]+)\)/;
         const matches = regExp.exec(event.target.style.transform);
         const initial = matches ? matches[1].split(',') : [0,0];

        setOffset({ 
            x: event.clientX - parseInt( initial[0] ),  
            y: event.clientY - parseInt( initial[1] )
        });

        /**
         * set position
         */
        setXpos( parseInt( initial[0] ) );
        setYpos( parseInt( initial[1] ) );

        setDragging(true);        
    };

    const onDrag = (event) => {
        event.preventDefault();

        /**
         * where is drag starting at? 
         */


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

        const translate = `translate(${event.clientX - offset.x}px,${event.clientY - offset.y}px)`;
        reference.current.style.transform = translate;

        props.update();
    };

    /**
     *
     *
     */
    return (
        <>
            { Array.from({length: 4},() => { 
                return <CornerWrapper/>
            })}
            <ImageWrapper
                style={{
                    position: "fixed",
                    display: dragging ? "block" : "none",
                    borderColor: 'green',
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
