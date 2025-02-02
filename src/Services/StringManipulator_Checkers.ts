import * as StringManipulationPropsInterfaces from "../Interfaces/StringManipulationPropsInterfaces";

export const countWords = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return providedString.split(/(?=[A-Z])|[\s]+/).length;
};

export const isCamelCase = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return /^[a-z]+(?:[A-Z][a-z]*)*$/.test(providedString);
};

export const isPascalCase = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return /^[A-Z][a-z]+(?:[A-Z][a-z]*)*$/.test(providedString);
};
