import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  const handleGenerate = async () => {
    if (!prompt || prompt.trim().length < 5) {
      setError("Please enter a more descriptive prompt.");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    const encodedParams = new URLSearchParams();
    encodedParams.set("prompt", prompt);
    encodedParams.set("width", "1024");
    encodedParams.set("height", "1024");
    encodedParams.set("seed", "918440");
    encodedParams.set("model", "flux");

    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php",
      headers: {
        "x-rapidapi-key": "bae1c67a2bmsh5e36da8a32e7a97p1e2bacjsnc2240f23cc35",
        "x-rapidapi-host": "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: encodedParams,
      responseType: "blob",
    };

    try {
      const response = await axios.request(options);
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);

      // Save image URL to display
      setImageUrl(imageObjectUrl);

      // 🔁 Convert Blob to Base64
      const base64 = await convertBlobToBase64(imageBlob);

      // Save to Firestore (optional)
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "images"), {
          user_id: user.uid,
          prompt: prompt,
          image: base64,
          createdAt: new Date(),
        });
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Convert Blob to Base64
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // result includes `data:image/...`
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="w-full max-w-none mx-auto mt-10 p-4 border rounded">
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="5"
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-black opacity-80"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <p className="mb-2 font-semibold">Generated Image:</p>
          <img
            src={imageUrl}
            alt="Generated"
            className="w-full rounded border"
          />
        </div>
      )}
    </div>
  );
}
