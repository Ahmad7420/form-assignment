"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkDependencies } from "@/lib/dependencyUtils";
import { getOptions } from "@/lib/optionUtils";
import { GroupField } from "./GroupField";
import { Field } from "@/types/types";

export const FieldRenderer: React.FC<IProps> = ({ field, formValues }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  if (!checkDependencies(field.dependencies, formValues)) {
    return null;
  }

  const error = errors[field.key];

  switch (field.type) {
    case "text":
    case "number":
    case "date":
      return (
        <div className="mb-4">
          <label className="block mb-1">{field.label}</label>
          <Input
            type={field.type}
            {...register(field.key, { required: field.required })}
          />
          {error && (
            <p className="text-sm text-red-600 mt-1">This field is required</p>
          )}
        </div>
      );

    case "select":
      const options = getOptions(field, formValues);
      return (
        <div className="mb-4">
          <label className="block mb-1">{field.label}</label>
          <Select
            value={formValues[field.key] as string}
            onValueChange={(val) => setValue(field.key, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt: string) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <p className="text-sm text-red-600 mt-1">This field is required</p>
          )}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center mb-4 space-x-2">
          <Checkbox
            onCheckedChange={(val) => setValue(field.key, val)}
            checked={formValues[field.key] === true}
          />
          <label>{field.label}</label>
          {error && (
            <p className="text-sm text-red-600 mt-1">This field is required</p>
          )}
        </div>
      );

    case "group":
      return <GroupField group={field} formValues={formValues} />;

    default:
      return null;
  }
};

interface IProps {
  field: Field;
  formValues: Record<string, unknown>;
}
