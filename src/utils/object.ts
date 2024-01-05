const isObject = (object) => {
    return object != null && typeof object === "object";
};

export const isEqual = <OT extends object, OR extends object>(
    obj1: OT,
    obj2: OR,
) => {
    let props1 = Object?.getOwnPropertyNames(obj1);
    let props2 = Object?.getOwnPropertyNames(obj2);
    if (props1?.length != props2?.length) {
        return false;
    }
    for (let i = 0; i < props1?.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2);
        if (
            (isObjects && !isEqual(val1, val2)) ||
            (!isObjects && val1 !== val2)
        ) {
            return false;
        }
    }
    return true;
};

export const isEmpty = (obj: Object): boolean => {
    return (
        Object.keys(obj).length > 0 &&
        Object.values(obj).every((val) => {
            if (typeof val === "string") {
                return val.trim().length > 0;
            } else {
                return val !== null && val !== undefined;
            }
        }) &&
        Object.values(obj).every((val) => val !== null)
    );
};
