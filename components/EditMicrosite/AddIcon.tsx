import React from "react";
import AddSmallIcon from "./AddSmallIcon";
import AddEmbed from "./AddEmbed";

const AddIcon = ({ data }: { data: string }) => {
  // console.log("data", data);

  return (
    <div>
      {data === "Small Icon" && <AddSmallIcon />}{" "}
      {data === "Embed" && <AddEmbed />}
    </div>
  );
};

export default AddIcon;
