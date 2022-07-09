import React from "react";
import User from "./User";
function users({ users, auth }) {
   return (
      <>
         <div className="flex flex-col mx-5 mt-5">
            <div className="-my-2 overflow-x-auto">
               <div className="py-2 align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-r-0 border-l-0 border-gray-700">
                     <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-white">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                                 Name
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                                 Role
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                                 Class
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                 <span className="sr-only">Delete</span>
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                 <span className="sr-only">Edit</span>
                              </th>
                           </tr>
                        </thead>
                        {users.map(
                           ({ _id, name, classe, role, avatar, email }) => (
                              <User
                                 key={_id}
                                 id={_id}
                                 name={name}
                                 email={email}
                                 classe={classe}
                                 auth={auth}
                                 avatar={avatar}
                                 role={role}
                              />
                           ),
                        )}
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default users;
