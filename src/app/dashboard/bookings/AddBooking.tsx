"use client";
import React, { FC } from "react";
import BookingForm from "./BookingForm";
import Modal from "@/components/shared/modal/Modal";

import { CiCirclePlus } from "react-icons/ci";
import { AddBookingProps } from "./model/booking.model";

const AddBooking: FC<AddBookingProps> = ({ settings }) => {
  return (
    <Modal>
      <Modal.Open opens="Booking-form">
        <div>
          <button
            type="button"
            className="btn-primary flex items-center gap-1 rounded-3xl"
          >
            <CiCirclePlus size={18} /> Add New Booking
          </button>
        </div>
      </Modal.Open>
      <Modal.Window
        title="Add Booking"
        description="Add a new booking to your list"
        name="Booking-form"
      >
        <BookingForm settings={settings} />
      </Modal.Window>
    </Modal>
  );
};

export default AddBooking;
