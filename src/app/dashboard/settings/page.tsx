import React, { FC } from "react";
import { useForm } from "react-hook-form";
import SettingsForm from "./SettingsForm";
import { findData, getData, updateData } from "@/utils/apiRequests";

const page: FC = async () => {
  const settings = await getData("api/settings", "settings");

  return (
    <div>
      <h1 className="title">Settings </h1>
      <div className="w-full">
        <SettingsForm settings={settings.data} />
      </div>
    </div>
  );
};

export default page;
