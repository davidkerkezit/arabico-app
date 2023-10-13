import React, { useState } from "react";
import USER from "../assets/user-test.jog.jpeg";
import { Link, useSubmit } from "react-router-dom";

function Users({ users }) {
  const [loadedUsers, setLoadedUsers] = useState(10);
  const submit = useSubmit();
  const showMoreHandler = () => {
    setLoadedUsers(loadedUsers + 10);

    submit(
      {
        loadedUsers: loadedUsers + 10,
        choice: "users",
      },
      {
        method: "post",
      }
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mx-4 pb-20">
        {users.map((user) => (
          <Link
            className=" h-[10rem] flex  gap-4 bg-slate-600/5 items-end rounded-lg border-[1px] border-whiteness/5 relative"
            to={`/${user.attributes.username}`}
          >
            <img
              src={USER}
              alt=""
              className="w-full h-full aspect-square object-cover absolute border-[1px] border-whiteness top-0 bottom-0 rounded-lg"
            />
            <div className="flex justify-center items-center flex-col z-10 py-1 bg-black/60 w-full backdrop-blur-sm rounded-b-lg border-t-transparent border-[1px] border-whiteness">
              <h5 className="font-secondary text-xl text-whiteness/75">
                {user.attributes.name}
              </h5>
              <p className="font-secondary text-whiteness/50">
                {user.attributes.username}
              </p>
            </div>
          </Link>
        ))}

        {users.length.toString()[users.length.toString().length - 1] ===
          "0" && (
          <button
            onClick={showMoreHandler}
            className="bg-whiteness text-coal px-3 w-max py-2 mx-auto  rounded-sm text-sm mb-8 mt-2 hover:bg-light-gold duration-10"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export default Users;
