import { Field } from "@/types/types";

export function getOptions(field: Field,
    formValues: Record<string, unknown>): string[] {
    if ("optionSource" in field && field.optionSource) {
        const sourceValue = formValues[field.optionSource.key] as string;
        return field.optionSource.map[sourceValue] || [];
    }
    if ("options" in field && field.options) {
        return field.options;
    }
    return [];
}