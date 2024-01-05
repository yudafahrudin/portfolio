import { STORE_APP } from "@constants/config";

export function getPlatformOS() {
    const userAgent = window.navigator.userAgent;

    const isIOS =
        (/iPad|iPhone|iPod/.test(userAgent) ||
            (/Mac|Mac OS|MacIntel/gi.test(userAgent) &&
                (navigator.maxTouchPoints > 1 || "ontouchend" in document))) &&
        !window.MSStream;

    switch (true) {
        case /Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(userAgent):
            return "Mac OS";

        case isIOS:
            return "iOS";

        case /'Win32|Win64|Windows|Windows NT|WinCE/gi.test(userAgent):
            return "Windows";

        case /Android/gi.test(userAgent):
            return "Android";

        case /Linux/gi.test(userAgent):
            return "Linux";

        default:
            return null;
    }
}

export function generateStoreAppURL() {
    const userAgent = getPlatformOS();

    if (userAgent === "Mac OS" || userAgent === "iOS") return STORE_APP.IOS;

    return STORE_APP.ANDROID;
}
