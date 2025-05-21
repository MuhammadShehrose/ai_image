import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function EnhanceImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [style, setStyle] = useState("");
  const [uploading, setUploading] = useState(false);

  const auth = getAuth();
  const storage = getStorage();
  const firestore = getFirestore();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(file);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage || !style) {
      alert("Please upload image and select style");
      return;
    }

    setUploading(true);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(originalImage);
      reader.onloadend = async () => {
        try {
          // Step 1: Use GPT-4 Vision to analyze the image and create a detailed description
          const visionResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: [
                    { 
                      type: "text", 
                      text: `Using the provided room image as reference, create a detailed description that captures all essential elements while reimagining it in ${style} aesthetic. Analyze the room's spatial layout, furniture arrangement, and architectural features, then describe how these would transform while maintaining the space's core functionality. Include specifics about the adapted color palette, materials, textures, lighting, wall treatments, floor coverings, and decorative elements that would authentically represent the ${style}. Focus on how key pieces would be reinterpreted through this stylistic lens, preserving the room's purpose and spatial flow while completely embracing the visual language and characteristics of the ${style}. The description should be comprehensive enough to serve as a detailed reference for generating a new version of the room that honors both the original layout and the distinctive qualities of the chosen aesthetic.` 
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: reader.result
                      }
                    }
                  ]
                }
              ],
              max_tokens: 300
            },
            {
              headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
              },
            }
          );
          
          // Step 2: Get the description from GPT-4 Vision
          const description = visionResponse.data.choices[0].message.content;
          
          // Step 3: Use DALL-E to generate a new image based on the description
          const imageGenResponse = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
              model: "dall-e-3",
              prompt: `Generate a photorealistic interior design in ${style} style based on this description: ${description}. Create a high-resolution, professionally rendered image that faithfully maintains the original room's layout, dimensions, and spatial arrangement while completely transforming its aesthetic to embody authentic ${style} design principles. Ensure all architectural features, furniture placement, and functional zones remain in their original positions, but reimagine every visual element—including furniture pieces, materials, color palette, lighting fixtures, wall treatments, flooring, textiles, and decorative objects—to exemplify the distinctive characteristics of ${style} design. Pay careful attention to accurate material rendering, natural lighting effects, realistic textures, and proper perspective to achieve a photorealistic quality. The final image should look like a professional interior photography shot that convincingly presents how this exact space would appear if expertly redesigned in a beautiful, sophisticated ${style} aesthetic while preserving its original spatial integrity and functionality.`,
              n: 1,
              size: "1024x1024",
            },
            {
              headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
              },
            }
          );
          
          const imageUrl = imageGenResponse.data.data[0].url;
          setEnhancedImage(imageUrl);

          // Step 4: Save to localStorage gallery
          const gallery = JSON.parse(localStorage.getItem("gallery")) || [];
          gallery.push({ url: imageUrl, style });
          localStorage.setItem("gallery", JSON.stringify(gallery));

          // Step 5: Upload to Firebase Storage
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const storageRef = ref(storage, `enhanced-images/${Date.now()}.jpg`);
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);

          // Step 6: Save metadata to Firestore
          const user = auth.currentUser;
          await addDoc(collection(firestore, "enhancedImages"), {
            userId: user?.uid,
            style,
            prompt: `Enhance the room in a ${style} style.`,
            imageUrl: downloadURL,
            createdAt: new Date(),
          });

          alert("Image enhanced and saved successfully!");
        } catch (error) {
          console.error("Error in AI processing:", error);
          // alert("Failed to enhance image: " + (error.response?.data?.error?.message || error.message));
        }
      };
    } catch (error) {
      console.error("Error enhancing image:", error);
      // alert("Failed to enhance image: " + (error.response?.data?.error?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="px-4 pb-4">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Enhance Your Room Image
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full"
            />

            <Select label="Select Style" value={style} onChange={(val) => setStyle(val)}>
              <Option value="modern">Modern</Option>
              <Option value="minimalist">Minimalist</Option>
              <Option value="rustic">Rustic</Option>
            </Select>

            <Button onClick={handleGenerate} className="w-[350px] px-0" disabled={uploading}>
              {uploading ? "Enhancing..." : "Generate Image"}
            </Button>
          </div>

          {originalImage && enhancedImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <Typography variant="small" className="mb-2">Original Image</Typography>
                <img src={URL.createObjectURL(originalImage)} alt="Original" className="rounded-lg shadow-md" />
              </div>
              <div>
                <Typography variant="small" className="mb-2">Enhanced Image ({style})</Typography>
                <img src={enhancedImage} alt="Enhanced" className="rounded-lg shadow-md" />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}