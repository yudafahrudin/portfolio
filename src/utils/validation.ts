export function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

export function isEmail(str: string): boolean {
    const re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[(\d{1,3}\.){3}\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str.toLowerCase());
}

export const isValidIdentityCardNumber = (str: string): boolean => {
    const re = /^(1[1-9]|2[1-9]|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{10}$/;
    return re.test(str);
};

export const isValidPhone = (str: string): boolean => {
    const re = /^(?:\+62|0?8[1-9]\d{1})(?:[\s-]?\d{4,6}){2}$/;
    return re.test(str);
};

export const isPhone = (str: string): boolean => {
    const re = /^(\+62|62|0)/;
    return re.test(String(str));
};

export const isValidCountryCodePhone = (str: string): boolean => {
    const re = /^(?:\+62|62)?[\s-]?\d{2,3}[\s-]?\d{4,8}$/;
    return re.test(str);
};

export const isValidPassword = (str: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return re.test(str);
};

export const isCapitalLowercase = (str: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])/;
    return re.test(str);
};

export const isSpecialCharacter = (str: string): boolean => {
    const re = /^(?=.*[^A-Za-z0-9])/;
    return re.test(str);
};

export const isNumeric = (str: string): boolean => {
    const re = /^(?=.*\d)/;
    return re.test(str);
};

export const isStringNumeric = (num: any) =>
    (typeof num === "number" ||
        (typeof num === "string" && num.trim() !== "")) &&
    !isNaN(num as number);

export const isStringMatch = (str: string, value: string): boolean => {
    if (isEmpty(str) || isEmpty(value)) {
        return false;
    }

    return str.includes(value);
};

export const isDataMatch = (value1: any, value2: any): boolean => {
    return value1 === value2;
};

export const isAlphabet = (str: string): boolean => {
    const re = /^[a-zA-Z ]*$/;
    if (str === "" || re.test(str)) {
        return true;
    }
    return false;
};

export const isEmpty = (str: any): boolean => {
    return (
        str === "" ||
        str === null ||
        str === undefined ||
        str === "undefined" ||
        str === 0 ||
        (Array.isArray(str) && !str.length) ||
        (typeof str === "object" && Object.entries(str).length === 0)
    );
};

export const isNotSameValue = (value1: any, value2: any): boolean => {
    if (value1 !== value2) {
        return true;
    }
    return false;
};

export const checkBetweenRange = (x: number, min: number, max: number) => {
    return x >= min && x <= max;
};

export const checkLengthMin = (value: string, length: number): boolean => {
    if (value.length >= length) {
        return true;
    }
    return false;
};

export const checkLengthMax = (value: string, length: number): boolean => {
    if (value.length <= length) {
        return true;
    }
    return false;
};

export const checkLengthMinMax = (
    value: string,
    min: number,
    max: number,
): boolean => {
    if (value.length >= min && value.length <= max) {
        return true;
    }
    return false;
};

export const canUseDOM = Boolean(
    typeof window !== "undefined" &&
        window.document &&
        window.document.createElement,
);

export const verifyImageFile = (img: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            let picFile = event.target;
            let imgNew = new Image();
            imgNew.addEventListener("load", () => {
                resolve(reader.result);
            });
            imgNew.addEventListener("error", () => {
                reject("VALIDATION_MUST_IMAGE");
            });
            imgNew.src = String(picFile.result);
        });
        reader.readAsDataURL(img);
    });
};

export const validateUSPostalCode = (postalCode: string): boolean => {
    const postalCodeRegex = /^\d{5}$|^\d{6}$/;
    return postalCodeRegex.test(postalCode);
};
