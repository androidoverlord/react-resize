/**
 *
 * @returns
 */

 export function permissions() {
    return {
        credentials: "include",
        headers: {
            "content-type": "application/json",
            "X-WP-Nonce": acesistance.nonce,
        },
    };
}

/**
 *
 *
 */

export const containsObject = (obj, list) => {
    const compare = JSON.stringify(obj);

    for (let i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) == compare) {
            return true;
        }
    }

    return false;
};

/**
 *
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 *
 * @param {*} str
 * @returns
 */

export const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
};

/**
 * convert unicode to html entities
 * @param {*} str
 */

export function decode(str) {
    return str.replace("&amp;", function () {
        return "&";
    });
}

/**
 * move array elements
 */
const arrayMoveMutate = (array, from, to) => {
    const startIndex = from < 0 ? array.length + from : from;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;

        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
    }
};

export const arrayMove = (array, from, to) => {
    array = [...array];
    arrayMoveMutate(array, from, to);
    return array;
};

/**
 * scroll animation
 */

const easingFunctions = {
    // no easing, no acceleration
    linear: (t) => t,
    // accelerating from zero velocity
    easeInQuad: (t) => t * t,
    // decelerating to zero velocity
    easeOutQuad: (t) => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    // accelerating from zero velocity
    easeInCubic: (t) => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: (t) => --t * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity
    easeInQuart: (t) => t * t * t * t,
    // decelerating to zero velocity
    easeOutQuart: (t) => 1 - --t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: (t) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    // accelerating from zero velocity
    easeInQuint: (t) => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

export function scrollTo(to, duration) {
    const start = window.scrollY || window.pageYOffset;
    const time = Date.now();

    (function step() {
        var dx = Math.min(1, (Date.now() - time) / duration);
        var pos = start + (to - start) * easingFunctions.easeOutQuart(dx);

        window.scrollTo(0, pos);

        if (dx < 1) {
            requestAnimationFrame(step);
        }
    })();
}

/**
 * returns the absolute position of an element regardless of position/float issues
 */
export function getPosition(el) {
    var x = 0,
        y = 0;

    while (el != null && (el.tagName || "").toLowerCase() != "html") {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;

        console.log( el );
    }

    return { x: parseInt(x, 10), y: parseInt(y, 10) };
}
