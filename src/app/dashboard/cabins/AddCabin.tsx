"use client";
import React, { FC, ReactNode } from "react";
import CabinForm from "./CabinForm";
import Modal from "@/components/shared/modal/Modal";
import { CiCirclePlus } from "react-icons/ci";

const AddCabin: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <div>
          <button
            type="button"
            className="btn-primary flex items-center gap-1 rounded-3xl"
          >
            <CiCirclePlus size={18} /> Add New Cabin
          </button>
        </div>
      </Modal.Open>
      <Modal.Window
        title="Add Cabin"
        description="Add a new cabin to your list"
        name="cabin-form"
      >
        <CabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
