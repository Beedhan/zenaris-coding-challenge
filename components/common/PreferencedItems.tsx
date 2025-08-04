"use client";
import React, { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppContext } from "@/lib/AppContext";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { checkExists } from "@/lib/utils";

type CategoryKey = "breakfast" | "lunch" | "dinner" | "snacks";

const formSchema = z.object({
  itemName: z
    .string()
    .min(2, {
      message: "At least 2 character required",
    })
    .max(100),
});

const PreferencedItems = ({ category }: { category: string }) => {
  const context = useAppContext();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number>(-1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const key = category.toLowerCase() as CategoryKey;
    const itemName = values.itemName.trim();

    if (
      checkExists(
        context.dislikedItems.map((e) => e.name),
        itemName
      )
    ) {
      form.setError("itemName", {
        message: "Item already exists in disliked section",
      });
      return;
    }

    if (editing >= 0) {
      if (
        checkExists(context.items[key], itemName, context.items[key][editing])
      ) {
        form.setError("itemName", {
          message: "Item already exists in this category",
        });
        return;
      }

      const tempItems = context.items;
      tempItems[key][editing] = itemName;
      context.setItems(tempItems);
    } else {
      if (checkExists(context.items[key], itemName, "")) {
        form.setError("itemName", {
          message: "Item already exists in this category",
        });
        return;
      }
      const tempItems = context.items;
      tempItems[key] = [...tempItems[key], itemName];
      context.setItems(tempItems);
    }
    form.setValue("itemName", "");
    setOpen(false);
    setEditing(-1);
  }

  const handleEditItem = (itemIndex: number) => {
    const key = category.toLowerCase() as CategoryKey;
    const currentItems = context.items[key];
    form.setValue("itemName", currentItems[itemIndex]);
    setOpen(true);
    setEditing(itemIndex);
  };

  const handleRemoveItem = (itemIndex: number) => {
    const key = category.toLowerCase() as CategoryKey;
    const tempItems = context.items;
    tempItems[key].splice(itemIndex, 1);
    context.setItems({ ...tempItems });
  };

  return (
    <div>
      <div className="pl-5 mb-4 flex flex-col gap-2">
        {context.items[category.toLowerCase() as CategoryKey].map(
          (food, index) => (
            <div key={index} className="mb-2 flex items-center justify-between">
              <p>{food}</p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8"
                  onClick={() => handleEditItem(index)}
                >
                  <span className="sr-only">Edit</span>
                  <Pencil />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="size-8"
                  onClick={() => handleRemoveItem(index)}
                >
                  <span className="sr-only">Remove</span>
                  <Trash2 />
                </Button>
              </div>
            </div>
          )
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="default" className="bg-[#06222F] text-white">
            <Plus /> Add Item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add an item to {category}</DialogTitle>
            <DialogDescription>
              Here you can add a new item to your {category} preferences. Fill
              in the details below and click {`${"Add"}`} to save it.
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="itemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Input item name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-[#06222F] text-white">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreferencedItems;
