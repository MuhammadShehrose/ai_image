// import { useState } from "react";
// import {
//   Card,
//   CardBody,
//   Button,
//   Typography,
//   Select,
//   Option,
// } from "@material-tailwind/react";
// import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// export default function EnhanceImage() {
//   const [originalImage, setOriginalImage] = useState(null); // Base64 string
//   const [enhancedImage, setEnhancedImage] = useState(null); // Base64 string
//   const [style, setStyle] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file); // Convert to base64
//       reader.onloadend = () => {
//         const base64 = reader.result;
//         setOriginalImage(base64); // Save as base64
//       };
//     }
//   };

//   const handleGenerate = async () => {
//     if (!originalImage || !style) return alert("Please upload image and select style");

//     // Simulate image enhancement
//     setTimeout(async () => {
//       setEnhancedImage(originalImage); // Copy original image as "enhanced"

//       // Store in localStorage (optional)
//       localStorage.setItem("enhanced-image", originalImage);
//       const gallery = JSON.parse(localStorage.getItem("gallery")) || [];
//       gallery.push({ url: originalImage, style });
//       localStorage.setItem("gallery", JSON.stringify(gallery));

//       // Store in Firestore
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (!user) {
//           console.error("No user logged in");
//           return;
//         }

//         const db = getFirestore();
//         const docRef = await addDoc(collection(db, "images"), {
//           user_id: user.uid,
//           image: originalImage, // Base64 string
//           type: style,
//           createdAt: Timestamp.now(),
//         });

//         console.log("✅ Saved to Firestore with ID:", docRef.id);
//       } catch (error) {
//         console.error("❌ Error saving to Firestore:", error);
//       }
//     }, 1500);
//   };

//   return (
//     <div className="mt-12 mb-8 flex flex-col gap-12">
//       <Card>
//         <CardBody className="px-4 pb-4">
//           <Typography variant="h5" color="blue-gray" className="mb-4">
//             Enhance Your Room Image
//           </Typography>

//           {/* Upload Input & Style Select */}
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="block w-full"
//             />

//             <Select label="Select Style" value={style} onChange={(val) => setStyle(val)}>
//               <Option value="modern">Modern</Option>
//               <Option value="minimalist">Minimalist</Option>
//               <Option value="rustic">Rustic</Option>
//             </Select>

//             <Button onClick={handleGenerate} className="w-[350px] px-0">Generate Image</Button>
//           </div>

//           {/* Image Preview */}
//           {originalImage && enhancedImage && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               <div>
//                 <Typography variant="small" className="mb-2">Original Image</Typography>
//                 <img src={originalImage} alt="Original" className="rounded-lg shadow-md" />
//               </div>
//               <div>
//                 <Typography variant="small" className="mb-2">Enhanced Image ({style})</Typography>
//                 <img src={enhancedImage} alt="Enhanced" className="rounded-lg shadow-md" />
//               </div>
//             </div>
//           )}
//         </CardBody>
//       </Card>
//     </div>
//   );
// }





import React, { useState } from "react";
import axios from "axios";

const styles = [
  "Modern",
  "Rustic",
  "Bohemian",
  "Minimalist",
  "Industrial",
  "Scandinavian",
];

const ImageToImage = () => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState(
    "A bedroom with a bohemian spirit centered around a relaxed canopy bed complemented by a large macrame wall hanging. An eclectic dresser serves as a unique storage solution while an array of potted plants brings life and color to the room"
  );
  const [style, setStyle] = useState(styles[0]);

  const generateImage = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setError(null);
    setOutputUrl(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", prompt);
      formData.append("style", style);
      
      const response = await axios.post(
        "http://localhost:5000/api/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response: ", response.data.output);
      
      setOutputUrl(response.data.output);
    } catch (err) {
      setError("Failed to generate image.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Image to Image Generator</h1>

      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="mb-4">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {styles.map((styleOption) => (
            <option key={styleOption} value={styleOption}>
              {styleOption}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter prompt"
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={generateImage}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {file && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Input Image</h2>
          <img
            src={URL.createObjectURL(file)}
            alt="Input Preview"
            className="rounded shadow-md max-h-64 mx-auto"
          />
        </div>
      )}

      {outputUrl && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Output Image</h2>
          <img src={outputUrl} alt="Output" className="rounded shadow-lg" />
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default ImageToImage;
