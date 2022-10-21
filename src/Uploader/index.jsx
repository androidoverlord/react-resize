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
    height: 200px;
    right: auto;
    bottom: auto;
    background: gray;
    box-sizing: border-box;
    border: 5px solid orange;
    transition: border-radius 400ms ease; 
    
`;

const Image = () => { 
    const [dragging, setDragging] = useState(false);
    const [ xpos, setXpos] = useState(0);
    const [ ypos, setYpos] = useState(0);
    const [ width, setWidth] = useState(0);
    const [ height, setHeight] = useState(0);
    const  reference = useRef(null);

    //

    useEffect( () => { 
        const init = () => { 
            setYpos(reference.top);
            setXpos(reference.left);
            setWidth(reference.width);
            setHeight(reference.height);
        }

        reference && init();
    },[reference]);
    
    const onDragStart = (e) => { 
        setDragging( true );
    }

    const onDrag = (e) => { 
        e.preventDefault();
    }

    const onDragEnd = (e)=> { 
        setDragging(false);
    }
   
    
    /**
     * 
     * 
     */
    return <>
        <ImageWrapper
            ref={reference}
            style={{opacity: dragging ? 0.3 : 1 }}
            draggable 
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
        />

        { dragging ? (
            <ImageWrapper 
                style={{
                    position: 'fixed',
                    top: `${ypos}px`,
                    left: `${xpos}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            /> 
        ) : null }
    
    </>
}

// const Fuckthis = () => {
//     const [dragging, setDragging] = useState(false);
//     const [values, setValues] = useState({});
//     const [container, setContainer] = useState(null);

//     //

//     function onDragStart(ev) {
//         setDragging(true);

//         /**
//          * create clone
//          */
//         const reference = ev.target.getBoundingClientRect();
//         // setValues({
//         //     top: reference.top + (ev.pageY - reference.top),
//         //     left: reference.left + (ev.pageX - reference.left),
//         //     width: reference.width,
//         //     height: reference.height,
//         // });
//         setContainer(reference);
//     }

//     function onDrag(ev) {
//         ev.preventDefault();

//         console.log(
//             `
//             event pageX: ${ev.pageX},
//             event pageY: ${ev.pageY},
//            reference top: ${container.top},
//            reference left: ${container.left},  
//             `
//          ) ;

//         setValues({
//             top: ev.pageY - container.top,
//             left: ev.pageX - container.left,
//             width: container.width,
//             height: container.height,
//         });
//     }

//     function onDragEnd(ev) {
//         setDragging(false);
//     }

//     //

//     return (
//         <>
//             <ImageWrapper
//                 style={{ opacity: dragging ? 0.3 : 1 }}
//                 draggable
//                 onDragStart={onDragStart}
//                 onDrag={onDrag}
//                 onDragEnd={onDragEnd}
//             >
//                 <div className="content"></div>
//             </ImageWrapper>

//             { dragging ? <ImageWrapper
//                 style={{
//                     position: "fixed",
//                     pointerEvents: "none",
//                     top: `${values.top}px`,
//                     left: `${values.left}px`,
//                     bottom: 'auto',
//                     right: 'auto',
//                     width: `${values.width}px`,
//                     height: `${values.height}px`,
//                     borderRadius: '20px'
//                 }}
//             >
//                 <div className="content" style={{
//                     borderRadius: '10px'
//                 }}></div>
//             </ImageWrapper>: null }
            
//         </>
//     );
// };
