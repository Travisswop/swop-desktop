import React from "react";
import AddSmallIcon from "./AddSmallIcon";
import AddEmbed from "./embed/AddEmbed";
import AddAppIcon from "./appIcon/AddAppIcon";
import AddContactCard from "./contactCard/AddContactCard";
import AddInfoBar from "./infoBar/AddInfoBar";
import AddBlog from "./blog/AddBlog";
import AddVideo from "./Video/AddVideo";

const AddIcon = ({ data }: { data: string }) => {
  // console.log("data", data);

  return (
    <div>
      {data === "Small Icon" && <AddSmallIcon />}
      {data === "Blog" && <AddBlog />}
      {data === "App Icon" && <AddAppIcon />}
      {data === "Info Bar" && <AddInfoBar />}
      {data === "Contact Card" && <AddContactCard />}
      {data === "Embed" && <AddEmbed />}
      {data === "Video" && <AddVideo />}
    </div>
  );
};

export default AddIcon;
