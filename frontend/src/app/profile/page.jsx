import ProfileHeader from "@/components/profileHeader";
import React from "react";

const Profile = () => {
  return (
    <React.Fragment>
      <ProfileHeader />
      <section className="my-10 mt-[60px]">
        <h2 className="font-semibold text-[27px]">Data Pribadi</h2>
      </section>
    </React.Fragment>
  );
};

export default Profile;
