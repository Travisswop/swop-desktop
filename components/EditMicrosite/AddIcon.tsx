import React from "react";
import AddSmallIcon from "./AddSmallIcon";
import AddEmbed from "./AddEmbed";
import AddAppIcon from "./appIcon/AddAppIcon";
import AddContactCard from "./contactCard/AddContactCard";

const AddIcon = ({ data }: { data: string }) => {
  // console.log("data", data);

  return (
    <div>
      {data === "Small Icon" && <AddSmallIcon />}{" "}
      {data === "App Icon" && <AddAppIcon />}
      {data === "Contact Card" && <AddContactCard />}
      {data === "Embed" && <AddEmbed />}
    </div>
  );
};

export default AddIcon;
