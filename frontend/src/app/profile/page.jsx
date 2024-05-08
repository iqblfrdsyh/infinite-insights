import Sidebar from "@/components/layouts/sidebar";
import { Avatar } from "@nextui-org/react";
import React from "react";

const Profile = () => {
  return (
    <React.Fragment>
      <section className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <figure className="flex justify-center mt-10">
            <Avatar
              src="/assets/images/person.png"
              alt="person"
              isBordered
              color="success"
              className="w-[200px] h-[200px]"
            />
          </figure>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Profile;
