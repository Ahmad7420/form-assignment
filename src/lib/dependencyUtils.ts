import { Field } from "@/types/types";

export function checkDependencies(
    dependencies: Field["dependencies"] | undefined,
    formValues: Record<string, unknown>
): boolean {

    if (!dependencies) return true;
    return dependencies.every(dep => {
        const value = formValues[dep.key];
        if (dep.equals !== undefined) return value === dep.equals;
        if (dep.notEmpty) return value
        return true;
    });
}
