declare global {
    interface Window {
        newrelic: any;
    }
}

const notifyErrorRelics = (err: any | Error, customAttributes = {}) => {
    if (err instanceof Error === false) {
        return;
    }

    if (typeof window == "undefined") {
        const newrelic = require("newrelic");
        newrelic.noticeError(err, customAttributes);
    } else {
        window.newrelic.noticeError(err, customAttributes);
    }
};

export { notifyErrorRelics };
