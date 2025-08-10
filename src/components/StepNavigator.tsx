"use client";

import { Button } from "@/components/ui/button";

export const StepNavigator: React.FC<IProps> = ({
  step,
  setStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-between mt-4">
      {step > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>
      )}
      <Button type="submit">
        {step === totalSteps - 1 ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

interface IProps {
  step: number;
  setStep: (step: number) => void;
  totalSteps: number;
}
