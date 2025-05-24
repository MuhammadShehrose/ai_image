// import React, { useState, useEffect } from "react";
// import { useConfig } from "@/context/ConfigContext";
// import { Input, Button, Typography } from "@material-tailwind/react";

// const ApiConfigPage = () => {
//      const { config, updateConfig } = useConfig();
//      const [form, setForm] = useState({ api_key: "", api_host: "" });
//      const [loading, setLoading] = useState(false);

//      useEffect(() => {
//           if (config) {
//                setForm(config);
//           }
//      }, [config]);

//      const handleChange = (e) => {
//           setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//      };

//      const handleSubmit = async (e) => {
//           e.preventDefault();
//           setLoading(true); // Start loading
//           await updateConfig(form);
//           setLoading(false); // Stop loading
//           alert("Configuration updated successfully.");
//      };

//      return (
//           <div className="p-6">
//                <Typography variant="h4" className="mb-4">API Configuration</Typography>
//                <form onSubmit={handleSubmit} className="space-y-4">
//                     <Input
//                          label="API Key"
//                          name="api_key"
//                          value={form.api_key}
//                          onChange={handleChange}
//                     />
//                     <Input
//                          label="API Host"
//                          name="api_host"
//                          value={form.api_host}
//                          onChange={handleChange}
//                     />
//                     {/* <Button type="submit" color="blue">Save Configuration</Button> */}
//                     <button
//                          onClick={handleGenerate}
//                          disabled={loading}
//                          className="bg-black text-white px-4 py-2 rounded hover:bg-black opacity-80"
//                     >
//                          {loading ? "Save Configuration...." : "Save Configuration"}
//                     </button>
//                </form>
//           </div>
//      );
// };

// export default ApiConfigPage;
// import React, { useState, useEffect } from "react";
// import { useConfig } from "@/context/ConfigContext";
// import { Input, Typography } from "@material-tailwind/react";

// const ApiConfigPage = () => {
//      const { config, updateConfig } = useConfig();
//      const [form, setForm] = useState({ api_key: "", api_host: "" });
//      const [loading, setLoading] = useState(false); // Add loading state

//      useEffect(() => {
//           if (config) {
//                setForm(config);
//           }
//      }, [config]);

//      const handleChange = (e) => {
//           setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//      };

//      const handleSubmit = async (e) => {
//           e.preventDefault();
//           setLoading(true); // Start loading
//           await updateConfig(form);
//           setLoading(false); // Stop loading
//           alert("Configuration updated successfully.");
//      };

//      return (
//           <div className="p-6">
//                <Typography variant="h4" className="mb-4">API Configuration</Typography>
//                <form onSubmit={handleSubmit} className="space-y-4">
//                     <Input
//                          label="API Key"
//                          name="api_key"
//                          value={form.api_key}
//                          onChange={handleChange}
//                     />
//                     <Input
//                          label="API Host"
//                          name="api_host"
//                          value={form.api_host}
//                          onChange={handleChange}
//                     />
//                     <button
//                          type="submit" // Make it a submit button
//                          disabled={loading}
//                          className="bg-black text-white px-4 py-2 rounded hover:bg-black opacity-80"
//                     >
//                          {loading ? "Save Configuration...." : "Save Configuration"}
//                     </button>
//                </form>
//           </div>
//      );
// };

// export default ApiConfigPage;

// start the code hussain 


import React, { useState, useEffect } from "react";
import { Typography, Input, Switch } from "@material-tailwind/react";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const ApiConfigPage = () => {
     const [keys, setKeys] = useState([]);
     const [newKey, setNewKey] = useState({ api_key: "", api_host: "" });
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          fetchKeys();
     }, []);

     const fetchKeys = async () => {
          const snapshot = await getDocs(collection(db, "api_config"));
          const allKeys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setKeys(allKeys);
     };

     const handleAddKey = async (e) => {
          e.preventDefault();
          if (!newKey.api_key || !newKey.api_host) return alert("All fields are required");
          setLoading(true);

          // Deactivate existing active keys
          const activeKeys = keys.filter((k) => k.status === "active");
          for (const key of activeKeys) {
               await updateDoc(doc(db, "api_config", key.id), { status: "inactive" });
          }

          // Add new key with default count
          await addDoc(collection(db, "api_config"), {
               ...newKey,
               count: 0,
               status: "active",
               created_at: new Date()
          });

          setNewKey({ api_key: "", api_host: "" });
          await fetchKeys();
          setLoading(false);
     };

     const toggleStatus = async (id, currentStatus) => {
          if (currentStatus === "inactive") {
               // Deactivate other keys first
               const activeKeys = keys.filter((k) => k.status === "active");
               for (const key of activeKeys) {
                    await updateDoc(doc(db, "api_config", key.id), { status: "inactive" });
               }
          }
          await updateDoc(doc(db, "api_config", id), {
               status: currentStatus === "active" ? "inactive" : "active",
          });
          fetchKeys();
     };

     return (
          <div className="p-6 space-y-6">
               <Typography variant="h4">API Configuration</Typography>

               {/* Add New Key Form */}
               <form onSubmit={handleAddKey} className="space-y-4 max-w-md">
                    <Input
                         label="API Key"
                         name="api_key"
                         value={newKey.api_key}
                         onChange={(e) => setNewKey((prev) => ({ ...prev, api_key: e.target.value }))}
                    />
                    <Input
                         label="API Host"
                         name="api_host"
                         value={newKey.api_host}
                         onChange={(e) => setNewKey((prev) => ({ ...prev, api_host: e.target.value }))}
                    />
                    <button
                         type="submit"
                         disabled={loading}
                         className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-90"
                    >
                         {loading ? "Saving..." : "Add New API Key"}
                    </button>
               </form>

               {/* Keys Table */}
               <div className="overflow-x-auto mt-8">
                    <table className="min-w-full text-left text-sm border border-gray-300">
                         <thead className="bg-gray-100">
                              <tr>
                                   <th className="p-2">Key</th>
                                   <th className="p-2">Host</th>
                                   <th className="p-2">Count</th>
                                   <th className="p-2">Status</th>
                                   <th className="p-2">Toggle</th>
                              </tr>
                         </thead>
                         <tbody>
                              {keys.map((key) => (
                                   <tr key={key.id} className="border-t border-gray-300">
                                        <td className="p-2">{key.api_key}</td>
                                        <td className="p-2">{key.api_host}</td>
                                        <td className="p-2 text-center">{key.count ?? 0}</td>
                                        <td className="p-2 capitalize">{key.status}</td>
                                        <td className="p-2">
                                             <Switch
                                                  checked={key.status === "active"}
                                                  onChange={() => toggleStatus(key.id, key.status)}
                                                  color="green"
                                             />
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default ApiConfigPage;
