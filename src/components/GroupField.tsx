"use client";

import { GroupFieldType } from "@/types/types";
import { FieldRenderer } from "./FieldRenderer";

export const GroupField: React.FC<IProps> = ({ group, formValues }) => {
  return (
    <div className="border p-3 rounded mb-4">
      <h4 className="font-semibold mb-2">{group.label}</h4>
      {group.fields.map((subField) => (
        <FieldRenderer
          key={subField.key}
          field={subField}
          formValues={formValues}
        />
      ))}
    </div>
  );
};

interface IProps {
  group: GroupFieldType;
  formValues: Record<string, unknown>;
}
