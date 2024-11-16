import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface DropDownProps<TValue> {
  initialValue: string | TValue | null;
  options: TValue[];
  handleOptionSelect: (option: TValue) => void;
  checkboxOptions?: {
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
  }[];
  buttonLabel?: string;
}
const DropDown = <TValue,>({
  initialValue,
  options,
  handleOptionSelect,
  checkboxOptions = [],
  buttonLabel = "Actions",
}: DropDownProps<TValue>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          {String(initialValue || "")} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white border border-gray-200 rounded-md p-1 shadow-lg  opacity-100 z-10"
      >
        {buttonLabel && (
          <div>
            <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-gray-700">
              {buttonLabel}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-gray-300" />
          </div>
        )}

        {checkboxOptions.length > 0 ? (
          <>
            <DropdownMenuSeparator className="my-1 border-gray-300" />
            {checkboxOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                className="flex items-center justify-stretch px-2 py-1 text-sm capitalize rounded-md hover:bg-gray-100 cursor-pointer focus:outline-none"
                checked={option.checked}
                onCheckedChange={(value) => option.onCheckedChange(!!value)}
              >
                <div className="w-5 h-5">
                  <span className="flex items-center">
                    {option.checked && (
                      <svg
                        className="w-4 h-4 text-black mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 16.2l-3.5-3.5L4.7 14.5 9 18.8l11-11-1.3-1.3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        ) : (
          Array.isArray(options) &&
          options.map((option) => (
            <DropdownMenuItem
              className="flex items-center  justify-stretch px-2 py-1 text-sm capitalize rounded-md hover:bg-gray-100 cursor-pointer focus:outline-none"
              key={String(option)}
              onClick={() => handleOptionSelect(option)}
            >
              {String(option)}
            </DropdownMenuItem>
          ))
        )}
        {/* {Array.isArray(options) &&
          options.map((option) => (
            <DropdownMenuItem
              className="flex items-center  justify-stretch px-2 py-1 text-sm capitalize rounded-md hover:bg-gray-100 cursor-pointer focus:outline-none"
              key={String(option)}
              onClick={() => handleOptionSelect(option)}
            >
              {String(option)}
            </DropdownMenuItem>
          ))} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
