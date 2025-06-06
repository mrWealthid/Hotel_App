"use client";

import React, { FC, useState } from "react";
import GuestForm from "./GuestForm";
import Modal from "@/components/shared/modal/Modal";

import { CiCirclePlus } from "react-icons/ci";

const AddGuest: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="Guest-form">
        <div>
          <button
            type="button"
            className="btn-primary flex items-center gap-1 rounded-3xl"
          >
            <CiCirclePlus size={18} /> Add New Guest
          </button>
        </div>
      </Modal.Open>
      <Modal.Window
        title="Add Guest"
        description="Add a new guest to your list"
        name="Guest-form"
      >
        <GuestForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddGuest;
