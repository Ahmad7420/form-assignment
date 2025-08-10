"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";
import { StepNavigator } from "./StepNavigator";
import { schema } from "@/lib/schema";
import { Summary } from "./FormSummary";

export const MultiStepForm: React.FC = () => {
  const methods = useForm<Record<string, unknown>>({ defaultValues: {} });
  const { watch, handleSubmit } = methods;
  const formValues = watch();

  const [step, setStep] = useState(0);

  const onSubmit = (data: Record<string, unknown>) => {
    if (step < schema.steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Form Data:", JSON.stringify(data, null, 2));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">{schema.steps[step].title}</h2>

        {step === schema.steps.length - 1 ? (
          <Summary data={formValues} />
        ) : (
          schema.steps[step].fields.map((field) => (
            <FieldRenderer
              key={field.key}
              field={field}
              formValues={formValues}
            />
          ))
        )}

        <StepNavigator
          step={step}
          setStep={setStep}
          totalSteps={schema.steps.length}
        />
      </form>
    </FormProvider>
  );
};
