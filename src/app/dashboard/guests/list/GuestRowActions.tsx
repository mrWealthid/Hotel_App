"use client";
import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Modal from "@/components/shared/modal/Modal";
import ConfirmationPage from "@/components/ui/ConfirmationPage";
import { useDeleteGuest } from "../hooks/useGuests";
import { HiPencil, HiTrash } from "react-icons/hi2";

import GuestForm from "../GuestForm";
import { CgMenuGridO } from "react-icons/cg";

const GuestRowActions = ({ rowData }: any) => {
  const { isDeleting, deleteGuest } = useDeleteGuest();

  const [open, setOpen] = useState(false);

  function handleDelete(onCloseModal: any) {
    deleteGuest(rowData.id, {
      onSuccess: () => onCloseModal(),
    });
  }
  // function handleCheckout(onCloseModal: any) {
  // 	checkOutBooking(
  // 		{ checkStatus: 'CHECKED_OUT' },
  // 		{
  // 			onSuccess: () => onCloseModal()
  // 		}
  // 	);
  // }

  return (
    <td className="py-2 px-4  md:px-2 md:py-4 space-x-3">
      <Menu as="div" className="relative  inline-block text-left">
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
              {/* ...existing code... */}
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
              <Menu.Items className="absolute text-black z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Modal.Open opens="edit-guest">
                        <button className="group gap-2 flex w-full  hover:bg-gray-100 transition-all  duration-700 items-center rounded-md px-2 py-2 text-sm">
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
                      <Modal.Open opens="delete-guest">
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
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      <Modal.Window
        title="Manage Guest"
        description="Manage your guest list"
        name="edit-guest"
      >
        <GuestForm guest={rowData} />
      </Modal.Window>
      <Modal.Window
        title="Delete Guest"
        description="Guest will be deleted permanently"
        name="delete-guest"
      >
        <ConfirmationPage
          handler={(onCloseModal: any) => {
            handleDelete(onCloseModal);
          }}
          isLoading={isDeleting}
          modalText={
            <span>
              Are you sure you want to delete <b>{rowData.name}</b>
            </span>
          }
        />
      </Modal.Window>
    </td>
  );
};

export default GuestRowActions;
