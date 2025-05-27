// import React, { useState, useRef } from 'react';
// import {
//      Upload,
//      Sparkles,
//      Download,
//      Settings,
//      Palette,
//      ImageIcon,
//      Wand2,
//      Camera,
//      Brush,
//      Zap,
//      RefreshCw,
//      Heart,
//      Share2,
//      User,
//      LogOut,
//      Bell,
//      History
// } from 'lucide-react';

// const GeneratePage = () => {
//      const [selectedImage, setSelectedImage] = useState(null);
//      const [selectedStyle, setSelectedStyle] = useState('');
//      const [prompt, setPrompt] = useState('');
//      const [isGenerating, setIsGenerating] = useState(false);
//      const [generatedImages, setGeneratedImages] = useState([]);
//      const fileInputRef = useRef(null);

//      const styles = [
//           { id: 'photorealistic', name: 'Photorealistic', color: 'from-blue-500 to-cyan-500' },
//           { id: 'artistic', name: 'Artistic Painting', color: 'from-purple-500 to-pink-500' },
//           { id: 'anime', name: 'Anime Style', color: 'from-pink-500 to-red-500' },
//           { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-cyan-500 to-purple-500' },
//           { id: 'vintage', name: 'Vintage Film', color: 'from-orange-500 to-yellow-500' },
//           { id: 'minimalist', name: 'Minimalist', color: 'from-gray-500 to-slate-500' },
//           { id: 'fantasy', name: 'Fantasy Art', color: 'from-emerald-500 to-blue-500' },
//           { id: 'sketch', name: 'Pencil Sketch', color: 'from-gray-600 to-gray-800' }
//      ];

//      const handleFileSelect = (event) => {
//           const file = event.target.files[0];
//           if (file) {
//                const reader = new FileReader();
//                reader.onload = (e) => {
//                     setSelectedImage(e.target.result);
//                };
//                reader.readAsDataURL(file);
//           }
//      };

//      const handleGenerate = () => {
//           setIsGenerating(true);
//           // Simulate generation process
//           setTimeout(() => {
//                const newImages = [
//                     { id: 1, url: selectedImage, style: selectedStyle },
//                     { id: 2, url: selectedImage, style: selectedStyle },
//                     { id: 3, url: selectedImage, style: selectedStyle },
//                     { id: 4, url: selectedImage, style: selectedStyle }
//                ];
//                setGeneratedImages(newImages);
//                setIsGenerating(false);
//           }, 3000);
//      };

//      return (
//           <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 ">
//                {/* Background Effects */}
//                <div className="fixed inset-0 overflow-hidden pointer-events-none">
//                     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
//                     <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
//                </div>

//                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
//                     {/* Header */}
//                     <div className="text-center mb-12">
//                          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
//                               Transform Your Vision into
//                               <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                                    Stunning Artwork
//                               </span>
//                          </h1>
//                          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
//                               Upload an image or describe your vision. Our AI will create professional-quality artwork in your chosen style.
//                          </p>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                          {/* Left Side - Input Section */}
//                          <div className="space-y-8">
//                               {/* Text Prompt */}
//                               <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
//                                    <h3 className="text-gray-700 text-xl font-semibold mb-4 flex items-center">
//                                         <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
//                                         Describe Your Vision
//                                    </h3>
//                                    <textarea
//                                         value={prompt}
//                                         onChange={(e) => setPrompt(e.target.value)}
//                                         placeholder="Describe the image you want to create... e.g., 'A majestic mountain landscape at sunset with a lake reflection'"
//                                         className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                                    />
//                               </div>

//                               {/* Image Upload */}
//                               <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
//                                    <h3 className="text-gray-700 text-xl font-semibold mb-4 flex items-center">
//                                         <Upload className="w-5 h-5 mr-2 text-white" />
//                                         Upload Reference Image
//                                    </h3>

//                                    <div
//                                         className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
//                                         onClick={() => fileInputRef.current?.click()}
//                                    >
//                                         {selectedImage ? (
//                                              <div className="space-y-4">
//                                                   <img
//                                                        src={selectedImage}
//                                                        alt="Selected"
//                                                        className="max-w-full h-48 object-cover rounded-lg mx-auto"
//                                                   />
//                                                   <p className="text-gray-300">Click to change image</p>
//                                              </div>
//                                         ) : (
//                                              <div className="space-y-4">
//                                                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
//                                                        <Camera className="w-8 h-8 text-gray-700" />
//                                                   </div>
//                                                   <div>
//                                                        <p className="text-gray-700 font-medium">Choose File</p>
//                                                        <p className="text-gray-400 text-sm">Upload an image to use as reference</p>
//                                                   </div>
//                                              </div>
//                                         )}
//                                    </div>

//                                    <input
//                                         ref={fileInputRef}
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleFileSelect}
//                                         className="hidden"
//                                    />
//                               </div>

//                               {/* Style Selection */}
//                               <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
//                                    <h3 className="text-gray-700 text-xl font-semibold mb-6 flex items-center">
//                                         <Palette className="w-5 h-5 mr-2 text-pink-400" />
//                                         Choose a Style
//                                    </h3>

//                                    <div className="grid grid-cols-2 gap-4">
//                                         {styles.map((style) => (
//                                              <button
//                                                   key={style.id}
//                                                   onClick={() => setSelectedStyle(style.id)}
//                                                   className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedStyle === style.id
//                                                        ? 'border-purple-500 bg-purple-500/20'
//                                                        : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
//                                                        }`}
//                                              >
//                                                   <div className={`w-12 h-12 bg-gradient-to-r ${style.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
//                                                        <Brush className="w-6 h-6 text-gray-700" />
//                                                   </div>
//                                                   <p className="text-gray-700 text-sm font-medium">{style.name}</p>
//                                              </button>
//                                         ))}
//                                    </div>
//                               </div>

//                               {/* Generate Button */}
//                               <button
//                                    onClick={handleGenerate}
//                                    disabled={!prompt && !selectedImage}
//                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-purple-500/25"
//                               >
//                                    {isGenerating ? (
//                                         <>
//                                              <RefreshCw className="w-5 h-5 animate-spin" />
//                                              <span>Generating...</span>
//                                         </>
//                                    ) : (
//                                         <>
//                                              <Zap className="w-5 h-5" />
//                                              <span>Generate Artwork</span>
//                                         </>
//                                    )}
//                               </button>
//                          </div>

//                          {/* Right Side - Results */}
//                          <div className="space-y-8">
//                               {/* Generation Status */}
//                               {isGenerating && (
//                                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center">
//                                         <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
//                                              <Sparkles className="w-8 h-8 text-gray-700" />
//                                         </div>
//                                         <h3 className="text-gray-700 text-xl font-semibold mb-2">Creating Your Masterpiece</h3>
//                                         <p className="text-gray-300">Our AI is working its magic...</p>
//                                         <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
//                                              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
//                                         </div>
//                                    </div>
//                               )}

//                               {/* Generated Results */}
//                               {generatedImages.length > 0 && (
//                                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
//                                         <h3 className="text-gray-700 text-xl font-semibold mb-6 flex items-center">
//                                              <ImageIcon className="w-5 h-5 mr-2 text-green-400" />
//                                              Generated Results
//                                         </h3>

//                                         <div className="grid grid-cols-2 gap-4">
//                                              {generatedImages.map((image) => (
//                                                   <div key={image.id} className="relative group">
//                                                        <img
//                                                             src={image.url}
//                                                             alt="Generated"
//                                                             className="w-full h-48 object-cover rounded-lg"
//                                                        />
//                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-3">
//                                                             <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
//                                                                  <Download className="w-5 h-5 text-gray-700" />
//                                                             </button>
//                                                             <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
//                                                                  <Heart className="w-5 h-5 text-gray-700" />
//                                                             </button>
//                                                             <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
//                                                                  <Share2 className="w-5 h-5 text-gray-700" />
//                                                             </button>
//                                                        </div>
//                                                   </div>
//                                              ))}
//                                         </div>
//                                    </div>
//                               )}

//                               {/* Tips */}
//                               <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
//                                    <h3 className="text-gray-700 text-lg font-semibold mb-4">💡 Pro Tips</h3>
//                                    <ul className="space-y-2 text-gray-800 text-sm">
//                                         <li>• Be specific in your descriptions for better results</li>
//                                         <li>• Try different styles to see varied interpretations</li>
//                                         <li>• Use reference images to guide the AI's output</li>
//                                         <li>• Combine multiple concepts for unique creations</li>
//                                    </ul>
//                               </div>
//                          </div>
//                     </div>
//                </div>
//           </div>
//      );
// };

// export default GeneratePage;

import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
     getDocs,
     query,
     where,
     collection,
     addDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const styles = [
     "Modern",
     "Rustic",
     "Bohemian",
     "Minimalist",
     "Industrial",
     "Scandinavian",
];

const GeneratePage = () => {
     const [loading, setLoading] = useState(false);
     const [outputUrl, setOutputUrl] = useState(null);
     const [error, setError] = useState(null);
     const [file, setFile] = useState(null);
     const [prompt, setPrompt] = useState("");
     const [style, setStyle] = useState(styles[0]);
     const auth = getAuth();
     const db = getFirestore();

     const generateImage = async () => {
          if (!file) return setError("Please select an image to upload.");
          if (file.size > 1024 * 1024) return setError("Image size must be less than 1 MB.");
          if (!style) return setError("Please select a style.");
          if (!prompt || prompt.trim().length < 5) return setError("Please enter a more descriptive prompt.");

          setLoading(true);
          setError(null);
          setOutputUrl(null);

          try {
               const keySnapshot = await getDocs(
                    query(collection(db, "replicate_keys"), where("status", "==", "active"))
               );

               if (keySnapshot.empty) {
                    throw new Error("No active API key found.");
               }

               const apiKey = keySnapshot.docs[0].data().api_key;

               const formData = new FormData();
               formData.append("image", file);
               formData.append("prompt", prompt);
               formData.append("style", style);

               const response = await axios.post("http://localhost:5000/api/generate", formData, {
                    headers: {
                         "Content-Type": "multipart/form-data",
                         "x-api-key": apiKey,
                    },
               });

               const imageResponse = await fetch(response.data.output);
               const imageBlob = await imageResponse.blob();

               if (imageBlob.size > 1024 * 1024) {
                    setError("Generated image is too large to store in database (over 1MB).");
                    return;
               }

               const base64 = await convertBlobToBase64(imageBlob);
               const user = auth.currentUser;
               if (user) {
                    await addDoc(collection(db, "images"), {
                         user_id: user.uid,
                         prompt,
                         image: base64,
                         type: style,
                         createdAt: new Date(),
                    });
               }

               setOutputUrl(response.data.output);
          } catch (err) {
               console.error(err);
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
          <div className="min-h-screen  to-black py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-10">
                    <h1 className="text-4xl font-extrabold text-white mb-12 text-center tracking-wide">
                         Image to Image Generator
                    </h1>

                    <div className="grid grid-cols-12 gap-8">
                         {/* Upload */}
                         <div className="col-span-12 md:col-span-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
                              <label className="text-white font-semibold mb-2">Upload Image</label>
                              <input
                                   type="file"
                                   accept="image/*"
                                   onChange={(e) => setFile(e.target.files[0])}
                                   className="block w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                              />
                         </div>

                         {/* Style Select */}
                         <div className="col-span-12 md:col-span-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
                              <label className="text-white font-semibold mb-2">Select Style</label>
                              <select
                                   value={style}
                                   onChange={(e) => setStyle(e.target.value)}
                                   className="w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                              >
                                   {styles.map((styleOption) => (
                                        <option key={styleOption} value={styleOption} className="text-black">
                                             {styleOption}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         {/* Prompt */}
                         <div className="col-span-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-6 flex flex-col">
                              <label className="text-white font-semibold mb-2">Prompt Description</label>
                              <textarea
                                   rows={4}
                                   value={prompt}
                                   onChange={(e) => setPrompt(e.target.value)}
                                   placeholder="Enter your detailed prompt description..."
                                   className="resize-none w-full rounded-lg border border-white/40 bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                              />
                         </div>

                         {/* Generate Button */}
                         <div className="col-span-12 text-center">
                              <button
                                   onClick={generateImage}
                                   disabled={loading}
                                   className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 px-12 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                   {loading ? "Generating..." : "Generate Image"}
                              </button>
                         </div>

                         {/* Error Message */}
                         {error && (
                              <div className="col-span-12">
                                   <div className="rounded-lg bg-red-700/80 text-red-100 px-5 py-3 border border-red-300/50 shadow-sm">
                                        {error}
                                   </div>
                              </div>
                         )}

                         {/* Input Image */}
                         {file && (
                              <div className="col-span-12 md:col-span-6">
                                   <h2 className="text-white font-semibold mb-4 text-lg">Input Image</h2>
                                   <div className="rounded-xl overflow-hidden border border-white/30 shadow-lg">
                                        <img
                                             src={URL.createObjectURL(file)}
                                             alt="Input Preview"
                                             className="w-full object-cover max-h-80"
                                        />
                                   </div>
                              </div>
                         )}

                         {/* Output Image */}
                         {outputUrl && (
                              <div className="col-span-12 md:col-span-6">
                                   <h2 className="text-white font-semibold mb-4 text-lg">Generated Image</h2>
                                   <div className="rounded-xl overflow-hidden border border-white/30 shadow-lg">
                                        <img
                                             src={outputUrl}
                                             alt="Generated Output"
                                             className="w-full object-cover max-h-80"
                                        />
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default GeneratePage;
