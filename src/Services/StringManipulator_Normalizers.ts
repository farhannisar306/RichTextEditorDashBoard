import * as StringManipulationPropsInterfaces from "../Interfaces/StringManipulationPropsInterfaces";

//eita proper punctuation er jonno, eita uporei thak🙂
export const punctuateProperly = ({ providedString }: StringManipulationPropsInterfaces.PunctuateProperlyProps) => {
    if (Array.isArray(providedString)) {
        return providedString.map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ');
    }
    return providedString.charAt(0).toUpperCase() + providedString.slice(1).toLowerCase();
};


export const normalizeConcatenatedWords = (str: string | string[]) => {
    const inputString = Array.isArray(str) ? str.join(' ') : str;
    return inputString
        .trim()
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z])([0-9])/g, '$1 $2')
        .replace(/([0-9])([a-z])/gi, '$1 $2')
        .replace(/\s+/g, ' ');
};

export const countWords = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return providedString.split(/(?=[A-Z])|[\s]+/).length;
};

export const reverseWords = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return providedString
        .split(/(?=[A-Z])|[\s]+/)
        .reverse()
        .join(' ');
};

//ulda palda space thakle properly fix korar jonno
export const normalizeSpaces = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return providedString.trim().replace(/\s+/g, ' ');
};

// // Example usage
// console.log(splitCamelCase({ joined: true, providedString: "isActive" })); // Output: "Is Active"
// console.log(toSnakeCase({ providedString: "isActive" })); // Output: "is_active"
// console.log(toKababCase({ providedString: "isActive" })); // Output: "is-active"
// console.log(countWords({ providedString: "isActive andReady" })); // Output: 3
// console.log(reverseWords({ providedString: "isActive andReady" })); // Output: "andReady isActive"
// console.log(toPascalCase({ providedString: "is_active" })); // Output: "IsActive"
// console.log(isCamelCase({ providedString: "isActive" })); // Output: true
// console.log(toSentenceCase({ providedString: "isActive" })); // Output: "Is active"
// console.log(normalizeSpaces({ providedString: "  Hello   world! " })); // Output: "Hello world!"
