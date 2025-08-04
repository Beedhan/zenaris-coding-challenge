import React from "react";
import { Textarea } from "../ui/textarea";

const AdditionalConsiderations = () => {
  return (
    <div>
      <h1 className="text-xl font-bold my-2">Additional Considerations</h1>
      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
        <li>• Texture preferences (soft, pureed, minced)</li>
        <li>• Temperature preferences (room temperature, cold foods only)</li>
        <li>• Cultural or religious dietary restrictions</li>
        <li>• Specific preparation methods</li>
        <li>• Timing considerations for meals</li>
      </ul>
      <Textarea
        className="my-2 bg-white"
        name=""
        id=""
        maxLength={500}
      ></Textarea>
    </div>
  );
};

export default AdditionalConsiderations;
