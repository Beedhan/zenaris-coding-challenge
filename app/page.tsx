import AdditionalConsiderations from "@/components/sections/AdditionalConsiderations";
import Allergies from "@/components/sections/Allergies";
import DislikedFood from "@/components/sections/DislikedFood";
import FavouriteFood from "@/components/sections/FavouriteFood";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col gap-10 px-32 py-10">
      <div>
        <h1 className="text-3xl font-bold">Meal Preferences</h1>
        <p className="text-slate-500">
          Customize meal preference for Michael Mohr
        </p>
      </div>
      <FavouriteFood />
      <Separator />
      <DislikedFood />
      <Separator />
      <Allergies />
      <Separator />
      <AdditionalConsiderations />

      <Button className="bg-[#06222F] text-white" size={"lg"}>
        Save Preferences
      </Button>
    </div>
  );
}
