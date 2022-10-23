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
    transform-origin: left top;
    transition: border-radius 400ms ease;
`;

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [xpos, setXpos] = useState(0);
    const [ypos, setYpos] = useState(0);
    const [offset, setOffset] = useState({x:0,y:0});
    const reference = useRef(null);

    //

    // console.log( window.name );

    // window.addEventListener('scroll',(event) => { 
    //     console.log( 'scrolling: ', event );
    // })

    //

    const onDragStart = (event) => {

        /**
         * get translate and convert 
         * to x/y parameters
         */

        // let translate = event.target.style.transform;

        // translate.replace('translate(','').replace(')','');
        // console.log(typeof translate );

        // // console.log( event.target.style );
        // // console.log( translate );

        /**
         * get translate & if has values
         * subtract from event.clients
         */

        console.log( event, event.target.getAttribute('style') );
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(event.target.style.transform);
        const initial = matches ? matches[1].split(',') : [0,0];


        setOffset({ 
            x: event.clientX - parseInt( initial[0] ),  
            y: event.clientY - parseInt( initial[1] )
        });
        setXpos( parseInt( initial[0] ) );
        setYpos( parseInt( initial[1] ) );

        setDragging(true);        
    };

    const onDrag = (event) => {
        event.preventDefault();

        // const buffer = 5;
        // if( offset.x <= buffer && offset.y <= buffer ){
        //     /**
        //      * this is a resizeable element
        //      */
        // }else if( offset.x <= buffer && offset.y <=  )
        // }else{ 
            /**
             * this is a draggable element
             */
        // }

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

        /**
         * translate into percentages
         */
        //  reference.current.style.transform = `translate(${ offset.x - xpos }px,${ offset.y - ypos }px)`;
    };

    //

    console.log( 'xpos: ', xpos, ' ypos: ', ypos, ' offset: ', offset);

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
