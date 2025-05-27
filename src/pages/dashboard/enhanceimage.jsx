import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

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
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const auth = getAuth();
  const db = getFirestore();

  const generateImage = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    if (file.size > 1024 * 1024) { // 1MB = 1048576 bytes
      setError("Image size must be less than 1 MB.");
      return;
    }

    if (!style) {
      setError("Please select a style.");
      return;
    }

    if (!prompt || prompt.trim().length < 5) {
      setError("Please enter a more descriptive prompt.");
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

      // Convert to base64
      const imageResponse = await fetch(response.data.output);
      const imageBlob = await imageResponse.blob();
      if (imageBlob.size > 1024 * 1024) {
        setError("Generated image is too large to store in database (over 1MB).");
        return;
      }
      const base64 = await convertBlobToBase64(imageBlob);

      // Save to Firestore
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "images"), {
          user_id: user.uid,
          prompt: prompt,
          image: base64,
          type: style,
          createdAt: new Date(),
        });
      }

      setOutputUrl(response.data.output);
    } catch (err) {
      setError("Failed to generate image.");
    }

    setLoading(false);
  };

  const convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Image to Image Generator</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* File Upload - 6 columns */}
        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Style Select - 6 columns */}
        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {styles.map((styleOption) => (
              <option key={styleOption} value={styleOption}>
                {styleOption}
              </option>
            ))}
          </select>
        </div>

        {/* Textarea - 12 columns */}
        <div className="col-span-12">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prompt Description
          </label>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            placeholder="Enter your detailed prompt description..."
          />
        </div>

        {/* Generate Button - 12 columns */}
        <div className="col-span-12 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-8 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="col-span-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Input Image - 6 columns */}
        {file && (
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Input Image</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <img
                src={URL.createObjectURL(file)}
                alt="Input Preview"
                className="w-full h-auto rounded-lg shadow-md object-cover max-h-80"
              />
            </div>
          </div>
        )}

        {/* Output Image - 6 columns */}
        {outputUrl && (
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Generated Image</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <img
                src={outputUrl}
                alt="Generated Output"
                className="w-full h-auto rounded-lg shadow-md object-cover max-h-80"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToImage;
