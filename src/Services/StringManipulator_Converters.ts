import * as StringManipulationPropsInterfaces from "../Interfaces/StringManipulationPropsInterfaces";


export const toSnakeCase = ({ providedString }: StringManipulationPropsInterfaces.ToSnakeCaseProps) => {
    return providedString
        .split(/(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
};

export const toKababCase = ({ providedString }: StringManipulationPropsInterfaces.ToKababCaseProps) => {
    return providedString
        .split(/(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('-');
};

export const toPascalCase = ({ providedString }: StringManipulationPropsInterfaces.ToPascalCaseProps) => {
    return providedString
        .split(/[\s_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};

export const toSentenceCase = ({ providedString }: StringManipulationPropsInterfaces.ToSentenceCaseProps) => {
    return providedString
        .split(/(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join(' ')
        .replace(/^\w/, char => char.toUpperCase());
};


//ulda palda space thakle properly fix korar jonno
export const normalizeSpaces = ({ providedString }: StringManipulationPropsInterfaces.NormalizeSpacesProps) => {
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
