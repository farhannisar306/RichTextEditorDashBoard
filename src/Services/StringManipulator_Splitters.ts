import * as StringManipulationPropsInterfaces from "../Interfaces/StringManipulationPropsInterfaces";
import { punctuateProperly } from "./StringManipulator_Normalizers";
import { normalizeConcatenatedWords } from "./StringManipulator_Normalizers";


export const splitCamelCase = ({ joined, providedString }: StringManipulationPropsInterfaces.SplitCamelCaseProps) => {
    let retval: string[] | string;
    if (joined) {
        retval = providedString
            .split(/(?=[A-Z])/)
            .map(word => punctuateProperly({ providedString: word }))
            .join(' ');
    } else {
        retval = providedString
            .split(/(?=[A-Z])/)
            .map(word => punctuateProperly({ providedString: word }));
    }
    return retval;
};

export const splitPascalCase = ({ providedString }: StringManipulationPropsInterfaces.SplitCaseProps) => {
    return providedString.split(/(?=[A-Z])/).map(word => word.toLowerCase());
};

export const splitSnakeCase = ({ providedString, joined, make_string }: StringManipulationPropsInterfaces.SplitCaseProps) => {
    if (joined) {
        return providedString.split('_').map(word => word.toLowerCase()).join(' ');
    } else if (make_string) {
        return providedString.split('_').map(word => word.toLowerCase()).toString();
    } else {
        return providedString.split('_').map(word => word.toLowerCase());
    }
};

export const splitKababCase = ({ providedString, joined }: StringManipulationPropsInterfaces.SplitCaseProps) => {
    if (joined) {
        return providedString.split('-').map(word => word.toLowerCase()).join(' ');
    } else {
        return providedString.split('-').map(word => word.toLowerCase());
    }
};

//ulda palda space thakle properly fix korar jonno
export const normalizeSpaces = ({ providedString }: StringManipulationPropsInterfaces.DefaultCaseProps) => {
    return providedString.trim().replace(/\s+/g, ' ');
};



// Auto detect koira split korar jonno, eda safe hobe kina janina, na howar chance tai beshi, karon bidhormi achoron🙂
export const splitStringByCaseAutomatically = ({ providedString, joined }: StringManipulationPropsInterfaces.SplitCaseProps) => {
    if (providedString.includes('_')) {
        return splitSnakeCase({ providedString, joined });
    } else if (providedString.includes('-')) {
        return splitKababCase({ providedString, joined });
    } else if (/^[a-z]/.test(providedString) && /[A-Z]/.test(providedString)) {
        return splitCamelCase({ providedString, joined });
    } else if (/^[A-Z]/.test(providedString) && /[a-z]/.test(providedString)) {
        return splitPascalCase({ providedString, joined });
    } else {
        const normalizedString = normalizeConcatenatedWords(providedString);
        return punctuateProperly({ providedString: normalizedString }); // simple string gular jonno just normalize then split
    }
};