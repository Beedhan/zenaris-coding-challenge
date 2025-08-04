"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export type SelectorChipsProps = {
  options: string[];
  onChange?: (selected: string[]) => void;
};

const SelectorChips: React.FC<SelectorChipsProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (option: string) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-wrap gap-2 max-w-xl w-full bg-background border border-primary/10 p-4 rounded-3xl ">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <motion.button
            key={option}
            onClick={() => toggleChip(option)}
            initial={false}
            animate={{
              backgroundColor: isSelected ? "#06222F" : "#fff",
              borderColor: isSelected ? "#06222F" : "#d1d5db",
              color: isSelected ? "#fff" : "#1f2937",
              width: isSelected ? 60 : 50,
              transition: {
                backgroundColor: { duration: 0.1 },
                color: { duration: 0.1 },
                borderColor: { duration: 0.1 },
                width: { type: "spring", stiffness: 400, damping: 20 },
              },
            }}
            className="flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border transition overflow-hidden  cursor-pointer"
            style={{ minWidth: 100 }}
          >
            <div className="flex items-center w-full justify-center relative">
              <span className="mx-auto">{option}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export { SelectorChips };
