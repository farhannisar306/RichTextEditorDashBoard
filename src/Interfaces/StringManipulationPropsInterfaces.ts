export interface SplitCamelCaseProps {
    joined: boolean;
    providedString: string;
}

export interface PunctuateProperlyProps {
    providedString: string | string[];
}

export interface DefaultCaseProps {
    providedString: string;
}

export interface SplitCaseProps {
    providedString: string;
    joined: boolean;
    make_string?: boolean;
}
