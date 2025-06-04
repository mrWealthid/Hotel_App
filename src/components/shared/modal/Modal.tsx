"use client";
import React, { cloneElement, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createContext } from "react";
import { useOutsideClick } from "@/components/shared/hooks/useOutSideClick";
import { ModalContextProps, ModalProps, WindowProps } from "./model/modal";

const ModalContext = createContext<ModalContextProps>({
  openName: "",
  close: () => {},
  open: (name: string) => {},
  size: "w-full lg:w-1/2",
  title: "",
});

function Modal({ children, size = "w-full md:w-1/2 2xl:w-1/3" }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open, size }}>
      {children}
    </ModalContext.Provider>
  );
}

const Open = React.forwardRef<HTMLButtonElement, any>(
  ({ children, opens, ...props }, ref) => {
    const { open }: any = useContext(ModalContext);
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: () => open(opens),
    });
  }
);

const Window = ({ name, children, title, description }: WindowProps) => {
  const { openName, close, open, size }: ModalContextProps =
    useContext(ModalContext);

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, close);

  if (name !== openName) return null;
  return createPortal(
    <section>
      <div
        className={` ${
          openName === name
            ? "visible scale-100 opacity-100"
            : "invisible scale-50  opacity-0"
        } overflow-y-auto w-full backdrop overflow-x-hidden  fixed bg-gray-900 top-0  bg-opacity-80 left-0 z-50 md:inset-0 h-modal h-full justify-center items-center flex transition-all ease-in-out duration-1500`}
        id="popup-modal"
      >
        <div ref={modalRef} className={`${size} relative p-6 h-auto`}>
          <div className="card flex flex-col gap-6 skin rounded-2xl shadow p-6">
            <div className="flex justify-between">
              <section className="flex flex-col gap-1">
                <h3>{title}</h3>
                {description && (
                  <p className="text-xs text-gray-500 dark:text-secondary">
                    {description}
                  </p>
                )}
              </section>

              <div>
                <button
                  className=" bg-primary text-white z-50 hover:bg-primary hover:text-white rounded-lg text-sm p-1.5 dark:hover:bg-primary dark:hover:text-white"
                  data-modal-toggle="popup-modal"
                  type="button"
                >
                  <svg
                    onClick={close}
                    aria-hidden="true"
                    className=" w-3 h-3  sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <hr className="-mx-6" />
            <>
              {React.isValidElement(children)
                ? cloneElement(children, { onCloseModal: close })
                : null}
            </>
          </div>
        </div>
      </div>
    </section>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
