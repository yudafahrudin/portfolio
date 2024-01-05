import * as validation from "../validation";

describe("validation checking string empty or not ", () => {
    test("variable is empty", () => {
        expect(validation.isEmptyOrSpaces("")).toBe(true);
    });
    test("variable is not empty", () => {
        expect(validation.isEmptyOrSpaces("Not Empty")).toBe(false);
    });
});

describe("validation for email ", () => {
    test("email is valid", () => {
        expect(validation.isEmail("testing@test.com")).toBe(true);
    });
    test("email is not valid", () => {
        expect(validation.isEmail("testing@.com")).toBe(false);
    });
});

describe("validation for card number ", () => {
    test("card number is valid", () => {
        expect(validation.isValidIdentityCardNumber("3511001502224222")).toBe(
            true,
        );
    });
    test("card number is not valid", () => {
        expect(validation.isValidIdentityCardNumber("351100221131111111")).toBe(
            false,
        );
    });
    test("card number is not valid", () => {
        expect(validation.isValidIdentityCardNumber("111111111")).toBe(false);
    });
});

describe("validation for phone number ", () => {
    test("phone number is valid", () => {
        expect(validation.isValidPhone("081293241902")).toBe(true);
    });
    test("phone number is not valid", () => {
        expect(validation.isValidPhone("0808132429032")).toBe(false);
    });
});

describe("validation for country phone number ", () => {
    test("country phone number is valid", () => {
        expect(validation.isValidCountryCodePhone("+6281293241902")).toBe(true);
    });
    test("country phone number is not valid", () => {
        expect(validation.isValidCountryCodePhone("+9998132429032")).toBe(
            false,
        );
    });
});

describe("validation for valid password ", () => {
    test("password is valid", () => {
        expect(validation.isValidPassword("Rey12345!")).toBe(true);
    });
    test("password is not valid", () => {
        expect(validation.isValidPassword("rey12345!")).toBe(false);
    });
    test("password is not valid cause empty string", () => {
        expect(validation.isValidPassword("")).toBe(false);
    });
});

describe("validation for string capital lowercase ", () => {
    test("capital lowercase is valid", () => {
        expect(validation.isCapitalLowercase("Rey.id")).toBe(true);
    });
    test("capital lowercase is not valid", () => {
        expect(validation.isCapitalLowercase("rey.id")).toBe(false);
    });
});

describe("validation for string special character ", () => {
    test("special character is valid", () => {
        expect(validation.isSpecialCharacter("Rey+12345!")).toBe(true);
    });
    test("character is not valid", () => {
        expect(validation.isSpecialCharacter("reyid")).toBe(false);
    });
});

describe("validation for string is numeric only ", () => {
    test("string numeric is valid", () => {
        expect(validation.isNumeric("88218412")).toBe(true);
    });
    test("string numeric is not valid", () => {
        expect(validation.isNumeric("reyid")).toBe(false);
    });
});

describe("validation for string is match ", () => {
    test("string match is valid", () => {
        expect(validation.isStringMatch("reyid", "reyid")).toBe(true);
    });
    test("string match is not valid", () => {
        expect(validation.isStringMatch("reyid", "rey-id")).toBe(false);
    });
    test("string match is not valid cause empty value", () => {
        expect(validation.isStringMatch("", "reyid")).toBe(false);
    });
});

describe("validation for string is alphabet ", () => {
    test("string alphabet is valid", () => {
        expect(validation.isAlphabet("reyid")).toBe(true);
    });
    test("string alphabet is not valid", () => {
        expect(validation.isAlphabet("reyb41k")).toBe(false);
    });
});

describe("validation for string is empty ", () => {
    test("validation empty string is valid", () => {
        expect(validation.isEmpty("")).toBe(true);
    });
    test("validation null is valid", () => {
        expect(validation.isEmpty(null)).toBe(true);
    });
    test("validation undefined is valid", () => {
        expect(validation.isEmpty(undefined)).toBe(true);
    });
    test("validation array empty is valid", () => {
        expect(validation.isEmpty([])).toBe(true);
    });
    test("validation object empty is valid", () => {
        expect(validation.isEmpty({})).toBe(true);
    });
    test("validation empty is not valid", () => {
        expect(validation.isEmpty("reyid")).toBe(false);
    });
});

describe("validation for string is not same value", () => {
    test("string not same value is valid", () => {
        expect(validation.isNotSameValue("reyid", "rey-did")).toBe(true);
    });
    test("string not same value is not valid", () => {
        expect(validation.isNotSameValue("reyid", "reyid")).toBe(false);
    });
});

describe("validation for number between range", () => {
    test("number in range valid", () => {
        expect(validation.checkBetweenRange(14, 4, 15)).toBe(true);
    });
    test("number in range not valid", () => {
        expect(validation.checkBetweenRange(15, 5, 12)).toBe(false);
    });
});

describe("validation for number length min", () => {
    test("number in range valid", () => {
        expect(validation.checkLengthMin("Test", 4)).toBe(true);
    });
    test("number in range not valid", () => {
        expect(validation.checkLengthMin("Test", 5)).toBe(false);
    });
});

describe("validation for check length max", () => {
    test("length max is valid", () => {
        expect(validation.checkLengthMax("17012", 5)).toBe(true);
    });
    test("length max is not valid", () => {
        expect(validation.checkLengthMax("152093", 5)).toBe(false);
    });
});

describe("validation for check length min max", () => {
    test("length min max is valid", () => {
        expect(validation.checkLengthMinMax("17012", 5, 7)).toBe(true);
    });
    test("length min max is not valid min < 5", () => {
        expect(validation.checkLengthMinMax("1520", 5, 7)).toBe(false);
    });
    test("length min max is not valid cause length > 7", () => {
        expect(validation.checkLengthMinMax("1520141252", 5, 7)).toBe(false);
    });
});
