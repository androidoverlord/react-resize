import React, { useState, useEffect, useRef } from "react";

//

const Uploader = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const reference = useRef(null);

    //

    const dragStart = (ev) => {
        console.log("drag start: ", ev);

        setOffset({
            x: ev.clientX,
            y: ev.clientY,
        });
    };

    const dragOver = (ev) => {
        ev.preventDefault();

        console.log("drag over: ", ev);

        return false;
    };

    const dragStop = (ev) => {
        if (!offset.x || !offset.y) {
            return false;
        }

        console.log("drag stop: ", ev);

        var diffx = ev.clientX - offset.x;
        var diffy = ev.clientY - offset.y;

        var rect = ev.target.getBoundingClientRect();

        var position = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
        };

        var newleft = position.left + diffx;
        var newtop = position.top + diffy;

        reference.current.style.position = `absolute`;
        reference.current.style.left = `${newleft}px`;
        reference.current.style.top = `${newtop}px`;

        setOffset({ x: 0, y: 0 });
    };

    //

    return (
        <div
            onDragOver={dragOver}
            onDrop={dragStop}
            style={{
                width: `${500}px`,
                height: `${500}px`,
                border: `3px solid red`,
            }}
        >
            <img
                ref={reference}
                draggable
                onDragStart={dragStart}
                style={{ width: `${250}px` }}
                src={require(`@root/assets/images/pic.png`)}
            />
        </div>
    );
};

export default Uploader;
