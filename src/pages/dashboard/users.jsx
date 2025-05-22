// // src/pages/dashboard/AdminPanel.jsx
// import React, { useEffect, useState } from "react";
// import {
//      Card,
//      CardBody,
//      Typography,
//      Spinner,
// } from "@material-tailwind/react";
// import {
//      getFirestore,
//      collection,
//      getDocs,
// } from "firebase/firestore";

// const Users = () => {
//      const [users, setUsers] = useState([]);
//      const [loading, setLoading] = useState(true);

//      useEffect(() => {
//           const fetchUsers = async () => {
//                try {
//                     const db = getFirestore();
//                     const querySnapshot = await getDocs(collection(db, "users"));
//                     const usersList = querySnapshot.docs.map((doc) => ({
//                          id: doc.id,
//                          ...doc.data(),
//                     }));
//                     setUsers(usersList);
//                } catch (error) {
//                     console.error("Error fetching users:", error);
//                } finally {
//                     setLoading(false);
//                }
//           };

//           fetchUsers();
//      }, []);

//      return (
//           <div className="p-6">
//                <Typography variant="h4" className="mb-4 font-bold">
//                     Users
//                </Typography>

//                <Typography variant="paragraph" className="mb-6 text-gray-700">
//                     List of all registered users:
//                </Typography>

//                {loading ? (
//                     <div className="flex justify-center items-center h-40">
//                          <Spinner className="h-8 w-8" />
//                     </div>
//                ) : users.length === 0 ? (
//                     <Typography variant="paragraph" className="text-center text-gray-500">
//                          No users found.
//                     </Typography>
//                ) : (
//                     <Card>
//                          <CardBody className="overflow-x-auto">
//                               <table className="w-full min-w-max table-auto text-left">
//                                    <thead>
//                                         <tr>
//                                              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                                   <Typography variant="small" color="blue-gray" className="font-normal">
//                                                        Name
//                                                   </Typography>
//                                              </th>
//                                              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                                   <Typography variant="small" color="blue-gray" className="font-normal">
//                                                        Email
//                                                   </Typography>
//                                              </th>
//                                              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                                   <Typography variant="small" color="blue-gray" className="font-normal">
//                                                        Type
//                                                   </Typography>
//                                              </th>
//                                              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                                   <Typography variant="small" color="blue-gray" className="font-normal">
//                                                        Actions
//                                                   </Typography>
//                                              </th>
//                                         </tr>
//                                    </thead>
//                                    <tbody>
//                                         {users.map((user, index) => (
//                                              <tr key={user.id} className="even:bg-blue-gray-50/50">
//                                                   <td className="p-4">
//                                                        <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.name || "—"}
//                                                        </Typography>
//                                                   </td>
//                                                   <td className="p-4">
//                                                        <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.email || "—"}
//                                                        </Typography>
//                                                   </td>
//                                                   <td className="p-4 capitalize">
//                                                        <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.type || "user"}
//                                                        </Typography>
//                                                   </td>
//                                                   <td className="p-4">
//                                                        <button
//                                                             className="text-red-500 hover:text-red-700"
//                                                             onClick={() => console.log(`Delete user with ID: ${user.id}`)}
//                                                        >
//                                                             Delete
//                                                        </button>
//                                                   </td>
//                                              </tr>
//                                         ))}
//                                    </tbody>
//                               </table>
//                          </CardBody>
//                     </Card>
//                )}
//           </div>
//      );
// };

// export default Users;
import React, { useEffect, useState } from "react";
import {
     Card,
     CardBody,
     Typography,
     Spinner,
     Button,
} from "@material-tailwind/react";
import {
     getFirestore,
     collection,
     getDocs,
     deleteDoc,
     doc,
     query,
     where, // ✅ Add these two
} from "firebase/firestore";



const Users = () => {
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);

     const fetchUsers = async () => {
          try {
               const db = getFirestore();
               const querySnapshot = await getDocs(collection(db, "users"));
               // Only include users where type is "user"
               const usersList = querySnapshot.docs
                    .map((doc) => ({
                         id: doc.id,
                         ...doc.data(),
                    }))
                    .filter((user) => user.type === "user" || !user.type); // fallback for missing type
               setUsers(usersList);
          } catch (error) {
               console.error("Error fetching users:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleDelete = async (userId, userUid) => {
          if (!userUid) {
               alert("User UID is missing. Cannot delete associated images.");
               return;
          }

          if (window.confirm("Are you sure you want to delete this user and all their data?")) {
               try {
                    const db = getFirestore();

                    // Delete user's images
                    const imagesQuery = query(
                         collection(db, "images"),
                         where("user_id", "==", userUid)
                    );
                    const imagesSnapshot = await getDocs(imagesQuery);
                    const imageDeletions = imagesSnapshot.docs.map((doc) =>
                         deleteDoc(doc.ref)
                    );
                    await Promise.all(imageDeletions);

                    // Delete user document
                    await deleteDoc(doc(db, "users", userId));

                    // Remove user from UI
                    setUsers((prev) => prev.filter((user) => user.id !== userId));

                    alert("User and associated data deleted.");
               } catch (error) {
                    console.error("Error deleting user:", error);
                    alert("Failed to delete user: " + error.message);
               }
          }
     };


     useEffect(() => {
          fetchUsers();
     }, []);

     return (
          <div className="p-6">
               <Typography variant="h4" className="mb-4 font-bold">
                    Users
               </Typography>

               <Typography variant="paragraph" className="mb-6 text-gray-700">
                    List of all registered users:
               </Typography>

               {loading ? (
                    <div className="flex justify-center items-center h-40">
                         <Spinner className="h-8 w-8" />
                    </div>
               ) : users.length === 0 ? (
                    <Typography variant="paragraph" className="text-center text-gray-500">
                         No users found.
                    </Typography>
               ) : (
                    <Card>
                         <CardBody className="overflow-x-auto">
                              <table className="w-full min-w-max table-auto text-left">
                                   <thead>
                                        <tr>
                                             <th className="border-b bg-blue-gray-50 p-4">Name</th>
                                             <th className="border-b bg-blue-gray-50 p-4">Email</th>
                                             <th className="border-b bg-blue-gray-50 p-4">Type</th>
                                             <th className="border-b bg-blue-gray-50 p-4">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {users.map((user) => (
                                             <tr key={user.id} className="even:bg-blue-gray-50/50">
                                                  <td className="p-4">
                                                       <Typography variant="small">{user.name || "—"}</Typography>
                                                  </td>
                                                  <td className="p-4">
                                                       <Typography variant="small">{user.email || "—"}</Typography>
                                                  </td>
                                                  <td className="p-4 capitalize">
                                                       <Typography variant="small">{user.type || "user"}</Typography>
                                                  </td>
                                                  <td className="p-4">
                                                       <Button
                                                            size="sm"
                                                            color="red"
                                                            disabled={user.type === "admin"}
                                                            onClick={() => handleDelete(user.id, user.uid)} // ✅ pass user.uid
                                                       >
                                                            Delete
                                                       </Button>

                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </CardBody>
                    </Card>
               )}
          </div>
     );
};

export default Users;
