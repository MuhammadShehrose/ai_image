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
import React, { useState, useEffect } from "react";
import { useConfig } from "@/context/ConfigContext";
import { Input, Typography } from "@material-tailwind/react";

const ApiConfigPage = () => {
     const { config, updateConfig } = useConfig();
     const [form, setForm] = useState({ api_key: "", api_host: "" });
     const [loading, setLoading] = useState(false); // Add loading state

     useEffect(() => {
          if (config) {
               setForm(config);
          }
     }, [config]);

     const handleChange = (e) => {
          setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true); // Start loading
          await updateConfig(form);
          setLoading(false); // Stop loading
          alert("Configuration updated successfully.");
     };

     return (
          <div className="p-6">
               <Typography variant="h4" className="mb-4">API Configuration</Typography>
               <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                         label="API Key"
                         name="api_key"
                         value={form.api_key}
                         onChange={handleChange}
                    />
                    <Input
                         label="API Host"
                         name="api_host"
                         value={form.api_host}
                         onChange={handleChange}
                    />
                    <button
                         type="submit" // Make it a submit button
                         disabled={loading}
                         className="bg-black text-white px-4 py-2 rounded hover:bg-black opacity-80"
                    >
                         {loading ? "Save Configuration...." : "Save Configuration"}
                    </button>
               </form>
          </div>
     );
};

export default ApiConfigPage;