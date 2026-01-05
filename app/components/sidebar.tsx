"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaPenFancy, FaRegNewspaper, FaRegNoteSticky } from "react-icons/fa6";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoSettings } from "react-icons/io5";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen border-r  transition-all duration-300 flex flex-col`}
    >
      <div className="flex  justify-between p-4 ">
        <div className="flex items-center gap-5">
          {isOpen && (
            <div className="flex flex-col gap-5 items-start">
              <h1 className="flex gap-3 font-bold text-2xl flex-col">
                <span className="text-blue-500">Software</span>Communtiy
              </h1>

              <div className="h-screen flex flex-col mt-50 gap-15">
                <Button variant={"outline"}>
                  <FaRegNoteSticky />
                  <p>User Test</p>
                </Button>
                <Button variant={"outline"}>
                  <FaPenFancy />
                  <p>Write Blog</p>
                </Button>
                <Button variant={"outline"}>
                  <FaRegNewspaper />
                  <p>IT News</p>
                </Button>
                <Button variant={"outline"}>
                  <IoSettings />
                  <p>Settings</p>
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <GoSidebarExpand className="text-xl" />
            ) : (
              <GoSidebarCollapse className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2"></div>
    </div>
  );
}
