"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

const commonAllergies = [
  "Peanuts",
  "Milk/Dairy",
  "Eggs",
  "Soy",
  "Wheat/Gluten",
  "Fish",
  "Shellfish",
  "Sesame",
  "Corn",
  "Tomatoes",
];

const severityConfig = {
  mild: {
    name: "Mild",
    color: "bg-yellow-100",
  },
  moderate: {
    name: "Moderate",
    color: "bg-orange-100",
  },
  severe: {
    name: "Severe",
    color: "bg-red-300",
  },
};
interface Allergy {
  name: string;
  severity: "mild" | "moderate" | "severe";
}
const Allergies = () => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<
    "mild" | "moderate" | "severe"
  >("mild");

  const addAllergy = (
    name: string,
    severity: "mild" | "moderate" | "severe"
  ) => {
    if (!allergies.find((a) => a.name.toLowerCase() === name.toLowerCase())) {
      setAllergies([...allergies, { name, severity }]);
    }
  };

  const removeAllergy = (name: string) => {
    setAllergies(allergies.filter((a) => a.name !== name));
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim()) {
      addAllergy(customAllergy.trim(), selectedSeverity);
      setCustomAllergy("");
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold my-2">Intolerances / Allergies</h1>

      {allergies.length > 0 && (
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Your Current Allergies & Intolerances
          </Label>
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy) => (
              <div
                key={allergy.name}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  severityConfig[allergy.severity].color
                }`}
              >
                <span>{allergy.name}</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-current rounded-full opacity-50"></div>
                  <span className="text-xs opacity-75 capitalize">
                    {allergy.severity}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAllergy(allergy.name)}
                  className="h-5 w-5 p-0 ml-1 hover:bg-white/50 rounded-full"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {allergy.name}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="space-y-2 my-4">
          <Label className="text-base font-medium">Select Severity Level</Label>
          <RadioGroup
            value={selectedSeverity}
            onValueChange={(value) =>
              setSelectedSeverity(value as "mild" | "moderate" | "severe")
            }
            className="space-y-1"
          >
            {Object.entries(severityConfig).map(([key, config]) => (
              <div key={key} className="flex items-start space-x-3">
                <RadioGroupItem value={key} id={key} className="mt-1" />
                <div className="flex-1">
                  <Label
                    htmlFor={key}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{config.name} tolerance</div>
                    </div>
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Separator className="my-4" />
        <h2>Common Allergies</h2>
        <div className="space-y-4 my-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {commonAllergies.map((allergy) => {
              const isSelected = allergies.find((a) => a.name === allergy);
              return (
                <Button
                  key={allergy}
                  variant={isSelected ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => addAllergy(allergy, selectedSeverity)}
                  disabled={!!isSelected}
                  className="justify-start h-auto py-2 px-3"
                >
                  {allergy}
                </Button>
              );
            })}
          </div>
        </div>
        <Separator className="my-4" />

        <div className="space-y-4 my-4">
          <Label className="text-base font-medium">Add Custom Allergy</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter specific food or ingredient..."
              value={customAllergy}
              onChange={(e) => setCustomAllergy(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCustomAllergy()}
              className="flex-1 bg-white"
            />
            <Button
              onClick={addCustomAllergy}
              disabled={!customAllergy.trim()}
              className="bg-[#06222F] text-white shrink-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allergies;
