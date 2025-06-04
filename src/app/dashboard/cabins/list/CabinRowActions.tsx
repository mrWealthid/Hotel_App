"use client";
import React, { Fragment } from "react";

import CabinForm from "../CabinForm";
import { Menu, Transition } from "@headlessui/react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCabin, useDuplicateCabin } from "../hooks/useCabins";
import { CgMenuGridO } from "react-icons/cg";
import ConfirmationPage from "@/components/ui/ConfirmationPage";
import Modal from "@/components/shared/modal/Modal";

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
                  className={`inline-flex card w-full justify-center rounded-full border p-3 text-sm font-medium text-primary dark:text-white
                     dark:focus:border-transparent
                     ${
                       open
                         ? " ring-1 ring-primary ring-offset-1 bg-gray-50 "
                         : ""
                     }
                   `}
                >
                  <CgMenuGridO />
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
                          <button className="group gap-2 flex w-full  duration-700 transition-all hover:bg-gray-100   items-center rounded-md px-2 py-2 text-sm">
                            {active ? (
                              <HiPencil color="green" />
                            ) : (
                              <HiPencil color="green" />
                            )}
                            Edit
                          </button>
                        </Modal.Open>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Modal.Open opens="confirm-modal">
                          <button className="group gap-2 flex w-full  duration-700 transition-all hover:bg-gray-100   items-center rounded-md px-2 py-2 text-sm">
                            {active ? (
                              <HiTrash color="red" />
                            ) : (
                              <HiTrash color="red" />
                            )}
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
                          <button className="group gap-2 flex w-full  duration-700 transition-all hover:bg-gray-100   items-center rounded-md px-2 py-2 text-sm">
                            {active ? (
                              <HiSquare2Stack color="green" />
                            ) : (
                              <HiSquare2Stack color="green" />
                            )}
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

        {/* Modal windows */}

        <Modal.Window
          title="Delete Cabin"
          description="Cabin will be deleted permanently"
          name="confirm-modal"
        >
          <ConfirmationPage
            isLoading={isDeleting}
            handler={(onCloseModal: any) => {
              handleDelete(onCloseModal);
            }}
            modalText={
              <span>
                Are you sure you want to delete <b>{rowData.name}</b>
              </span>
            }
          />
        </Modal.Window>

        <Modal.Window
          title="Manage Cabin"
          description="Manage your cabin details"
          name="edit-cabin-form"
        >
          <CabinForm cabin={rowData} />
        </Modal.Window>

        <Modal.Window
          title="Duplicate Cabin"
          description="Duplicate this cabin to create a new one with the same details"
          name="confirm-duplicate"
        >
          <ConfirmationPage
            isLoading={isDuplicating}
            handler={(onCloseModal: any) => {
              handleDuplicate(onCloseModal);
            }}
            modalText={
              <span>
                Are you sure you want to duplicate <b>{rowData.name}</b>
              </span>
            }
          />
        </Modal.Window>
      </Modal>
    </td>
  );
};

export default CabinRowActions;
