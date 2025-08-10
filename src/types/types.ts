export type FieldBase = {
    key: string;
    label?: string;
    type: "text" | "number" | "select" | "checkbox" | "radio" | "date" | "group";
    required?: boolean;
    dependencies?: Array<{
        key: string;
        equals?: string | number | boolean;
        notEmpty?: boolean;
    }>;
};

export type OptionSource = {
    key: string;
    map: Record<string, string[]>;
};

export type SimpleField = FieldBase & {
    type: Exclude<FieldBase["type"], "group">;
    options?: string[];
    optionSource?: OptionSource;
};

export type GroupFieldType = FieldBase & {
    type: "group";
    fields: Field[];
};

export type Field = SimpleField | GroupFieldType;

export type Step = {
    title: string;
    fields: Field[];
};

export type Schema = {
    steps: Step[];
};
