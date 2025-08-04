"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppContext } from "@/lib/AppContext";
import { checkExists } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SeverityKey = "mild" | "absolutely";

const formSchema = z.object({
  itemName: z
    .string()
    .min(2, {
      message: "At least 2 character required",
    })
    .max(100),
  severity: z.string(),
});

const DislikedItems = () => {
  const context = useAppContext();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number>(-1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      severity: "mild",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const itemName = values.itemName.trim();
    const severityLevel = values.severity as SeverityKey;

    if (checkExists(Object.values(context.items).flat(), itemName)) {
      form.setError("itemName", {
        message: "Item already exists in liked section",
      });
      return;
    }
    if (editing >= 0) {
      if (
        checkExists(
          context.dislikedItems.map((e) => e.name),
          itemName,
          context.dislikedItems[editing].name
        )
      ) {
        form.setError("itemName", {
          message: "Item already exists",
        });
        return;
      }
      const tempItems = context.dislikedItems;
      tempItems[editing] = { name: itemName, severity: severityLevel };
      context.setDislikedItems(tempItems);
    } else {
      if (
        checkExists(
          context.dislikedItems.map((e) => e.name),
          itemName,
          ""
        )
      ) {
        form.setError("itemName", {
          message: "Item already exists",
        });
        return;
      }
      let tempItems = context.dislikedItems;
      tempItems = [...tempItems, { name: itemName, severity: severityLevel }];
      context.setDislikedItems(tempItems);
    }
    form.setValue("itemName", "");
    setOpen(false);
    setEditing(-1);
  }

  const handleEditItem = (itemIndex: number) => {
    const currentItems = context.dislikedItems;
    form.setValue("itemName", currentItems[itemIndex].name);
    setOpen(true);
    setEditing(itemIndex);
  };

  const handleRemoveItem = (itemIndex: number) => {
    const tempItems = context.dislikedItems;
    tempItems.splice(itemIndex, 1);
    context.setDislikedItems([...tempItems]);
  };

  return (
    <div>
      <div className="pl-5 mb-4 flex flex-col gap-2">
        {context.dislikedItems.map((food, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <div className="flex gap-2">
              <p>{food.name}</p>
              <Badge
                variant={
                  food.severity === "absolutely" ? "destructive" : "secondary"
                }
              >
                {food.severity.toUpperCase()}
              </Badge>
            </div>
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
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="default" className="bg-[#06222F] text-white">
            <Plus /> Add Item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add an item to disliked item list</DialogTitle>
            <DialogDescription>
              Here you can add a new item to your disliked item list. Fill in
              the details below and click {`${"Add"}`} to save it.
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
                  <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Severity Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="mild" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Mild dislike
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="absolutely" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Absolutely {`${"won't"}`} eat
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
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

export default DislikedItems;
