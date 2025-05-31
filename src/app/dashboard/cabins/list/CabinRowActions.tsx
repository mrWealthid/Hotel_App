"use client";
import React, { Fragment } from "react";

import Modal from "@/components/shared/Modal/Modal-component";
import CabinForm from "../CabinForm";
import ConfirmationPage from "../../../../components/ui/ConfirmationPage";
import { Menu, Transition } from "@headlessui/react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCabin, useDuplicateCabin } from "../hooks/useCabins";

const CabinRowActions = ({ rowData }: any) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();

  function handleDelete(onCloseModal: any) {
    deleteCabin(rowData.id, {
      onSuccess: () => onCloseModal(),
    });
  }
  function handleDuplicate(onCloseModal: any) {
    duplicateCabin(rowData, {
      onSuccess: () => onCloseModal(),
    });
  }

  return (
    <td className="p-2 md:px-2 md:py-2 space-x-3">
      <Modal>
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  className={`inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium text-primary dark:text-white
          focus-within:border-primary dark:focus:border-transparent
          ${open ? "bg-gray-50" : ""}
        `}
                >
                  <span className="">...</span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <Modal.Open opens="edit-cabin-form">
                          <button className="group text-black flex w-full gap-1   items-center rounded-md px-2 py-2 text-sm">
                            {active ? <HiPencil /> : <HiPencil />}
                            Edit
                          </button>
                        </Modal.Open>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Modal.Open opens="confirm-modal">
                          <button className="group text-black   gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm">
                            {active ? <HiTrash /> : <HiTrash />}
                            Delete
                          </button>
                        </Modal.Open>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Modal.Open opens="confirm-duplicate">
                          <button className="group flex text-black gap-1   w-full items-center rounded-md px-2 py-2 text-sm">
                            {active ? <HiSquare2Stack /> : <HiSquare2Stack />}
                            Duplicate
                          </button>
                        </Modal.Open>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>

        <Modal.Window name="edit-cabin-form">
          <CabinForm cabin={rowData} />
        </Modal.Window>

        <Modal.Window name="confirm-modal">
          <ConfirmationPage
            isLoading={isDeleting}
            handler={(onCloseModal: any) => {
              handleDelete(onCloseModal);
            }}
            modalText={"Are you sure you want to delete cabin"}
          />
        </Modal.Window>
        <Modal.Window name="confirm-duplicate">
          <ConfirmationPage
            isLoading={isDuplicating}
            handler={(onCloseModal: any) => {
              handleDuplicate(onCloseModal);
            }}
            modalText={"Are you sure you want to duplicate cabin"}
          />
        </Modal.Window>
      </Modal>
    </td>
  );
};

export default CabinRowActions;
