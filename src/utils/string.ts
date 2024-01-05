/* eslint-disable no-case-declarations */
/* eslint-disable no-useless-escape */

import { STORE_APP } from "@constants/config";
import { canUseDOM, isEmpty } from "@utils/validation";

declare global {
    interface Window {
        opera: any;
        MSStream: any;
    }
}

export const getMobileOperatingSystem = () => {
    if (canUseDOM) {
        const userAgent = window.navigator.userAgent || (window || {}).opera;

        if (/android/i.test(userAgent)) {
            return STORE_APP.ANDROID;
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !(window || {}).MSStream) {
            return STORE_APP.IOS;
        }
    }

    return STORE_APP.ANDROID;
};

export const separateFullName = (name: string) => {
    let fullName = name || "";
    let result = {
        firstName: "",
        lastName: "",
        secondLastName: "",
    };

    if (fullName.length > 0) {
        const nameTokens =
            fullName.match(
                /[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g,
            ) || [];

        if (nameTokens.length > 3) {
            result.firstName = nameTokens.slice(0, 2).join(" ");
        } else {
            result.firstName = nameTokens.slice(0, 1).join(" ");
        }

        if (nameTokens.length > 2) {
            result.lastName = nameTokens.slice(-2, -1).join(" ");
            result.secondLastName = nameTokens.slice(-1).join(" ");
        } else {
            result.lastName = nameTokens.slice(-1).join(" ");
            result.secondLastName = "";
        }
    }

    return result;
};

export const slugify = (str: string): string => {
    if (!isEmpty(str)) {
        const a =
            "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
        const b =
            "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
        const p = new RegExp(a.split("").join("|"), "g");

        return str
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, "-and-") // Replace & with 'and'
            .replace(/[^\w\-]+/g, "") // Remove all non-word characters
            .replace(/\-\-+/g, "-") // Replace multiple - with single -
            .replace(/^-+/, "") // Trim - from start of text
            .replace(/-+$/, ""); // Trim - from end of text
    }
    return "";
};

export const readableSlugString = (str: string, uppercase: boolean = false) => {
    if (!isEmpty(str)) {
        const stringReplaced = str.replace("_", " ");

        if (uppercase) {
            return upperCase(stringReplaced);
        }
        return eachWordCapitalize(stringReplaced);
    }

    return "";
};

export const slugCustomString = (str: string, replace: string) => {
    if (!isEmpty(str)) {
        return str.replace("_", replace);
    }

    return "";
};

export const removeTagHTML = (str: string): string => {
    if (!isEmpty(str)) {
        return str.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, "");
    }
    return "";
};

export const truncateString = (str: string, num: number): string => {
    if (!isEmpty(num)) {
        if (num <= 3) {
            return str.slice(0, num) + "...";
        }
        if (num >= str.length) {
            return str;
        }
        return str.slice(0, num - 3) + "...";
    }
    return "";
};

export const capitalize = (str: string): string => {
    if (!isEmpty(str)) {
        const words = str.toLowerCase();
        return words.charAt(0).toUpperCase() + words.slice(1);
    }
    return null;
};

export const isSnakeCaseString = (str: string) => str.includes("_");
export const isCamelCaseString = (str: string) => /^[a-z][A-Za-z]*$/.test(str);
export const isPascalCaseString = (str: string) => /^[A-Z][A-Za-z]*$/.test(str);

export const splitWord = (str: string, symbol: string) => str.split(symbol);

export const eachWordCapitalize = (str: string): string => {
    if (!isEmpty(str)) {
        let tempString = "";
        if (isCamelCaseString(str) || isPascalCaseString(str)) {
            tempString = str.replaceAll(/([A-Z])/g, " $1").trim();
        } else if (isSnakeCaseString(str)) {
            tempString = str.replaceAll("_", " ").trim();
        } else {
            tempString = str;
        }

        const splitStr = tempString.toLowerCase().split(" ");
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
    }
    return "";
};

export const splitString = (str: string, symbol: string, location = 0) => {
    if (!isEmpty(str)) {
        return str.split(symbol)[location] || null;
    }
    return null;
};

export const upperCase = (str: string): string => {
    if (!isEmpty(str)) {
        return str.toUpperCase();
    }
    return "";
};

export const lowerCase = (str: string): string => {
    if (!isEmpty(str)) {
        return str.toLowerCase();
    }
    return "";
};

export const minifiedPrice = (value: number): string => {
    if (!isEmpty(value)) {
        let price = "";
        const packagePrice = value.toString();
        switch (packagePrice.length) {
            case 5:
                const price5 = packagePrice.substring(0, 2);
                price = `${price5.slice(0, 2)} rb`;
                break;
            case 6:
                const price6 = packagePrice.substring(0, 3);
                price = `${price6.slice(0, 3)} rb`;
                break;
            case 7:
                const price7 = packagePrice.substring(0, 2);
                if (parseInt(price7[1]) > 0) {
                    price = `${price7.slice(0, 1)}.${price7[1]} jt`;
                } else {
                    price = `${price7.slice(0, 1)} jt`;
                }
                break;
            case 8:
                const price8 = packagePrice.substring(0, 3);
                if (parseInt(price8[2]) > 0) {
                    price = `${price8.slice(0, 2)}.${price8[2]} jt`;
                } else {
                    price = `${price8.slice(0, 2)} jt`;
                }
                break;
            case 9:
                const price9 = packagePrice.substring(0, 3);
                price = `${price9.slice(0, 3)} jt`;
                break;
        }
        return `Rp ${price}`;
    }
    return "Rp 0";
};

export const currencyFormat = (num: number): string => {
    if (!isEmpty(num)) {
        return "Rp " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return "Rp 0";
};

export const numberFormat = (num: number): string => {
    if (!isEmpty(num)) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return "0";
};

export const phoneNumberFormat = (phone: string, prefix = "+62"): string => {
    if (!isEmpty(phone)) {
        if (phone.substring(0, 2) === "08")
            return `${prefix}${phone.substring(1, phone.length)}`;
        if (phone.substring(0, 2) === "62")
            return `${prefix}${phone.substring(1, phone.length)}`;
        if (phone.substring(0, 3) === "+62")
            return `${prefix}${phone.substring(4, phone.length)}`;
        if (phone.substring(0, 1) === "8")
            return `${prefix}${phone.substring(0, phone.length)}`;
        return phone;
    }
    return null;
};

export const generateLinkWhatsApp = (
    message = "",
    phone = "628111499739",
): string => {
    return `https://wa.me/${phone}?&text=${message}`;
};

interface GenerateLinkMailToParam {
    email: string;
    subject?: string;
    body?: string;
}

export const generateLinkMailTo = (param: GenerateLinkMailToParam): URL => {
    const { email, subject, body } = param;
    let mailto = new URL(`mailto:${email}`);
    if (subject?.length) {
        mailto.searchParams.append("subject", encodeURIComponent(subject));
    }
    if (body?.length) {
        mailto.searchParams.append("body", encodeURIComponent(body));
    }
    return mailto;
};

export const containsText = (text: string, searchText: string) => {
    if (isEmpty(text) && isEmpty(searchText)) {
        return;
    }

    return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
};

export const getBrowserAgent = (): string => {
    if (canUseDOM) {
        const test = function (regexp) {
            return regexp.test(window.navigator.userAgent);
        };
        switch (true) {
            case test(/edg/i):
                return "web-microsoft-edge";
            case test(/trident/i):
                return "web-internet-explorer";
            case test(/firefox|fxios/i):
                return "web-mozilla";
            case test(/opr\//i):
                return "web-opera";
            case test(/ucbrowser/i):
                return "web-uc-browser";
            case test(/samsungbrowser/i):
                return "web-samsung-browser";
            case test(/chrome|chromium|crios/i):
                return "web-chrome";
            case test(/safari/i):
                return "web-safari";
            default:
                return "web-other";
        }
    }

    return null;
};

export const convertColor = (color: string) => {
    switch (color) {
        case "primary":
            return "blue";
        case "secondary":
            return "orange";
        case "tertiary":
            return "neutral";
        case "error":
            return "red";
        case "warning":
            return "yellow";
        case "success":
            return "green";
        case "info":
            return "purple";
        default:
            return "blue";
    }
};

export const stringContains = (
    text: string,
    patterns: string[],
    all: boolean = true,
) =>
    patterns[all ? "every" : "some"]((pattern) =>
        text.match(new RegExp(pattern, "i")),
    );

export const getRandomHexColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor.padStart(6, "0");
};

export const getDefaultValue = (value: any) => {
    if (isEmpty(value)) {
        return "-";
    }

    return value;
};

export const convertFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
        return sizeInBytes + " B";
    } else if (sizeInBytes < 1024 * 1024) {
        const sizeInKB = sizeInBytes / 1024;
        return sizeInKB + " KB";
    } else {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return sizeInMB + " MB";
    }
};

export const strToCamelCase = (str: string): string => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase(),
        )
        .replace(/\s+/g, "");
};
