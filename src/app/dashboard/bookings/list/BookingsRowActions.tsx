"use client";
import React, { Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import Modal from "@/components/shared/Modal/Modal-component";

import ConfirmationPage from "../../../../components/ui/ConfirmationPage";

import { useDeleteBooking, useCheckOutBooking } from "../hooks/useBookings";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { MdOutlineLocalPrintshop, MdOutlinePrint } from "react-icons/md";

import ReceiptPopup from "@/components/shared/Modal/ReceiptPopup";

const BookingsRowActions = ({ rowData }: any) => {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { isCheckingOut, checkOutBooking } = useCheckOutBooking(rowData.id);

  const [open, setOpen] = useState(false);

  function handleDelete(onCloseModal: any) {
    deleteBooking(rowData.id, {
      onSuccess: () => onCloseModal(),
    });
  }
  function handleCheckout(onCloseModal: any) {
    checkOutBooking(
      { checkStatus: "CHECKED_OUT" },
      {
        onSuccess: () => onCloseModal(),
      }
    );
  }

  return (
    <td className="py-2 px-4  md:px-2 md:py-4 space-x-3">
      <Modal title="Manage Booking" description="Manage your booking details">
        <Menu as="div" className="relative  inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  className={`inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium text-primary dark:text-white
          dark:focus:border-transparent
          ${open ? "  bg-gray-50 " : ""}
        `}
                >
                  {" "}
                  <span>...</span>
                  {/* <ChevronDownIcon
								className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
								aria-hidden="true"
							/> */}
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
                <Menu.Items className="absolute text-black z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {rowData.checkStatus === "CHECKED_IN" && (
                      <Menu.Item>
                        {({ active }) => (
                          <Modal.Open opens="check-out">
                            <button className="group gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm">
                              {active ? (
                                <HiArrowUpOnSquare />
                              ) : (
                                <HiArrowUpOnSquare />
                              )}
                              Check-Out
                            </button>
                          </Modal.Open>
                        )}
                      </Menu.Item>
                    )}
                    {rowData.checkStatus === "CHECKED_OUT" && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setOpen(true)}
                            className="group gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm"
                          >
                            {active ? (
                              <MdOutlinePrint />
                            ) : (
                              <MdOutlineLocalPrintshop />
                            )}
                            Print Receipt
                          </button>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`bookings/${rowData.id}`}
                          className="
											 group flex gap-1 w-full items-center rounded-md px-2 py-2 text-sm"
                        >
                          {active ? <HiEye /> : <HiEye />}
                          View Details
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    {rowData.checkStatus === "UNCONFIRMED" && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`checkin/${rowData.id}`}
                            className="group flex gap-1 w-full items-center rounded-md px-2 py-2 text-sm"
                          >
                            {active ? (
                              <HiArrowDownOnSquare />
                            ) : (
                              <HiArrowDownOnSquare />
                            )}
                            Check-In
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    {(rowData.checkStatus === "UNCONFIRMED" ||
                      rowData.checkStatus === "CHECKED_OUT") && (
                      <Menu.Item>
                        {({ active }) => (
                          <Modal.Open opens="delete-booking">
                            <button className="group gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm">
                              {active ? <HiTrash /> : <HiTrash />}
                              Delete
                            </button>
                          </Modal.Open>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>

        <Modal.Window name="delete-booking">
          <ConfirmationPage
            handler={(onCloseModal: any) => {
              handleDelete(onCloseModal);
            }}
            isLoading={isDeleting}
            modalText={"Are you sure you want to delete cabin"}
          />
        </Modal.Window>

        <Modal.Window name="check-out">
          <ConfirmationPage
            handler={(onCloseModal: any) => handleCheckout(onCloseModal)}
            isLoading={isCheckingOut}
            modalText={`Are you sure you want to checkout
							 ${rowData.guests.name}`}
          />
        </Modal.Window>
      </Modal>

      {open && (
        <ReceiptPopup activity={rowData} open={open} setOpen={setOpen} />
      )}
    </td>
  );
};

export default BookingsRowActions;
