/**
 * CRYPT DOCUMENTATION
 *
 * To Decrypt a string
 * decrypt(Encrypted_String, Password);
 * Output: Decrypted String
 *
 * Example :
 * document.write(decrypt('qJzXqw==', 'mySuperSecretPassword'));
 *
 * To Encrypt a string
 * encrypt(String, Password);
 * Output: Encrypted String
 *
 * Example:
 * document.write(encrypt('test','mySuperSecretPassword'));
 *
 * NOTES
 * need ask sonarqube Vulnerability line 24 / encode64()
 **/

const encode64 = (text) => {
    // eslint-disable-next-line no-control-regex
    if (/([^\u0000-\u00ff])/.test(text)) {
        throw new Error("Can't base64 encode non-ASCII characters.");
    }

    const digits =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let i = 0,
        cur,
        prev,
        byteNum;
    const result = [];

    while (i < text.length) {
        cur = text.charCodeAt(i);
        byteNum = i % 3;

        switch (byteNum) {
            case 0:
                //first byte
                result.push(digits.charAt(cur >> 2));
                break;

            case 1:
                //second byte
                result.push(digits.charAt(((prev & 3) << 4) | (cur >> 4)));
                break;

            case 2:
                //third byte
                result.push(digits.charAt(((prev & 0x0f) << 2) | (cur >> 6)));
                result.push(digits.charAt(cur & 0x3f));
                break;
        }

        prev = cur;
        i++;
    }

    if (byteNum == 0) {
        result.push(digits.charAt((prev & 3) << 4));
        result.push("==");
    } else if (byteNum == 1) {
        result.push(digits.charAt((prev & 0x0f) << 2));
        result.push("=");
    }

    return result.join("");
};

const decode64 = (text) => {
    text = text.replace(/\s/g, "");

    // eslint-disable-next-line no-useless-escape
    if (!/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text) || text.length % 4 > 0) {
        throw new Error("Not a base64-encoded string.");
    }
    const digits =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let cur,
        prev,
        digitNum,
        i = 0;

    const result = [];

    text = text.replace(/=/g, "");

    while (i < text.length) {
        cur = digits.indexOf(text.charAt(i));
        digitNum = i % 4;

        switch (digitNum) {
            //case 0: first digit - do nothing, not enough info to work with
            case 1:
                //second digit
                result.push(String.fromCharCode((prev << 2) | (cur >> 4)));
                break;

            case 2:
                //third digit
                result.push(
                    String.fromCharCode(((prev & 0x0f) << 4) | (cur >> 2)),
                );
                break;

            case 3:
                //fourth digit
                result.push(String.fromCharCode(((prev & 3) << 6) | cur));
                break;
        }

        prev = cur;
        i++;
    }

    return result.join("");
};

const ord = (string) => {
    const str = string + "",
        code = str.charCodeAt(0);
    if (0xd800 <= code && code <= 0xdbff) {
        const hi = code;
        if (str.length === 1) {
            return code;
        }
        const low = str.charCodeAt(1);
        return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
    }
    if (0xdc00 <= code && code <= 0xdfff) {
        return code;
    }
    return code;
};

export const decrypt = (sData, sKey) => {
    let sResult = "";
    sData = decode64(sData);
    for (let d = 0; d < sData.length; d++) {
        let sChar = sData.substr(d, 1);
        const sKeyChar = sKey.substr((d % sKey.length) - 1, 1);
        sChar = Math.floor(ord(sChar) - ord(sKeyChar));
        sChar = String.fromCharCode(sChar);
        sResult = sResult + sChar;
    }
    return sResult;
};

export const encrypt = (sData, sKey) => {
    let sResult = "";
    for (let e = 0; e < sData.length; e++) {
        let sChar = sData.substr(e, 1);
        const sKeyChar = sKey.substr((e % sKey.length) - 1, 1);
        sChar = Math.floor(ord(sChar) + ord(sKeyChar));
        sChar = String.fromCharCode(sChar);
        sResult = sResult + sChar;
    }
    return encode64(sResult);
};

const encodeBuffer = (buffer) => buffer.toString("base64");
const encodeString = (string) => encodeBuffer(Buffer.from(string));
const encodeData = (data) => encodeString(JSON.stringify(data));

export const encode = (data) => {
    if (Buffer.isBuffer(data)) return encodeBuffer(data);
    if (typeof data === "string") return encodeString(data);
    return encodeData(data);
};

export const decode = (string) => {
    const decoded = Buffer.from(string, "base64").toString();
    try {
        return JSON.parse(decoded);
    } catch (e) {
        return decoded;
    }
};
