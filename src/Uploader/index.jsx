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
    background: gray;
    border: 5px solid orange;
`;

const DotWrapper = styled.div`
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background: red;
    position: absolute; 
    z-index: 10;
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 } );
    const [dot,setDot] = useState({x: 0, y:0});

    const container = useRef(null);

    /**
     *
     */

    const onDragStart = (e) => {
        /**
         * begin drag, 
         */
        
        setDragging(true);
        setOffset({
            x: container.current.offsetLeft,
            y: container.current.offsetTop
        });
        setPosition({
            x: e.clientX, 
            y: e.clientY
        });

        setDot({ x: e.clientX, y: e.clientY });
    };

    const onDrag = (e) => {
        setPosition({
            x: e.clientX, 
            y: e.clientY
        });
        
        setDot({ x: e.clientX, y: e.clientY });

    };

    const onDragEnd = (e) => {
        setDragging(false);
        setPosition({
            x: e.clientX, 
            y: e.clientY
        });
        setDot({ x: e.clientX, y: e.clientY });
    };

    //

    console.log( 'offset: ', offset, 'position: ', position, 'result: ', position.x - (position.x - offset.x)  );

    return (
        <div className="images">
            <DotWrapper style={{ 
                top: `${dot.y}px`, 
                left: `${dot.x}px`, 
                pointerEvents: 'none' 
            }}/>
            <ImageWrapper ref={container}
                className={dragging ? "dragging" : ""}
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                style={{
                    position: 'absolute',
                    opacity: dragging ? 0 : 1, 
                    cursor: dragging ? 'transform' : 'pointer' 
                }}
            ></ImageWrapper>
            <ImageWrapper   
                key={`clone-${position}`}
                style={{
                    position: "fixed",
                    top: `${( position.y - offset.y )  +  offset.y}px`,
                    left: `${( position.x - offset.x )  +  offset.x}px`,
                    opacity: dragging ? 1 : 0,
                    pointerEvents: "none",
                    border: "4px solid red",
                }}
            ></ImageWrapper>
        </div>
    );
};
