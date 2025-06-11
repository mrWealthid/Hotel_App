import { FC } from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useAutoComplete } from "./AutoCompleteHook";
import Label from "../form-elements/Label";

import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useDebounce } from "@uidotdev/usehooks";
import { formatCurrency } from "@/utils/helpers";
import { ImSpinner9 } from "react-icons/im";

interface AutoCompleteProps<T> {
  service: (query: string) => Promise<T[]>;
  queryKey: string;
  label: string;
  optionKey?: string;
  displayValue: keyof T;
  handler: (value: Record<string, unknown>) => void;
  custom?: keyof T;
}

export default function AutoComplete<T>({
  service,
  queryKey,
  label,
  optionKey = "id",
  displayValue,
  handler,
  custom,
}: AutoCompleteProps<T>) {
  const [selected, setSelected] = useState<T | null>(null);
  const [query, setQuery] = useState("");

  const debouncedSearchTerm = useDebounce(query, 1000);

  const {
    isRefetching,
    autoCompleteLoading,
    autoCompleteError,
    autoCompleteResult: data,
  } = useAutoComplete(debouncedSearchTerm, service, queryKey);

  function handleChangeEvent(val: T) {
    setSelected(val);
    handler({ [queryKey]: val });
  }

  return (
    <div className=" w-full">
      <Label name={""} text={label} />
      <Combobox
        value={selected}
        onChange={(selected: T) => handleChangeEvent(selected)}
      >
        <div className="relative mt-1">
          <div className="">
            <Combobox.Input
              className="w-full dark:border-none input-style  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(result: T) =>
                result ? (result[displayValue] as string) : ""
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {isRefetching ? (
                <ImSpinner9 className="h-3 w-3 animate-spin text-primary" />
              ) : (
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                data?.map((result: T, idx: number) => (
                  <Combobox.Option
                    key={(result as any)[optionKey] ?? idx}
                    className={({ active }: { active: boolean }) =>
                      `relative z-50 cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={result}
                  >
                    {({
                      selected,
                      active,
                    }: {
                      selected: boolean;
                      active: boolean;
                    }) => (
                      <>
                        <span
                          className={`flex justify-between truncate ${
                            selected ? "font-medium" : "font-normal"
                          } text-xs sm:text-sm`}
                        >
                          {result[displayValue] as string}

                          {custom && (
                            <span>
                              {custom === "regularPrice"
                                ? formatCurrency(result[custom])
                                : (result[custom] as string)}
                            </span>
                          )}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
