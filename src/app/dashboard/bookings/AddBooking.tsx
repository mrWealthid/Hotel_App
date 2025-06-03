"use client";
import React from "react";
import BookingForm from "./BookingForm";
import Modal from "@/components/shared/modal/Modal";

import { CiCirclePlus } from "react-icons/ci";

const AddBooking = ({ settings }: any) => {
  return (
    <Modal title="Add Booking" description="Add a new booking to your list">
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
      <Modal.Window name="Booking-form">
        <BookingForm settings={settings} />
      </Modal.Window>
    </Modal>
  );
};

export default AddBooking;
