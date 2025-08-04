import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import PreferencedItems from "../common/PreferencedItems";

const FavouriteFood = () => {
  return (
    <div>
      <h1 className="text-xl font-bold my-2">Favourite Foods</h1>
      <Tabs defaultValue="breakfast">
        <TabsList>
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>
        <TabsContent value="breakfast">
          <PreferencedItems category="Breakfast" />
        </TabsContent>
        <TabsContent value="lunch">
          <PreferencedItems category="Lunch" />
        </TabsContent>
        <TabsContent value="dinner">
          <PreferencedItems category="Dinner" />
        </TabsContent>
        <TabsContent value="snacks">
          <PreferencedItems category="Snacks" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FavouriteFood;
