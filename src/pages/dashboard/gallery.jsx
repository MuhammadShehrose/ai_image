import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!currentUser) {
          console.warn("User not logged in.");
          setLoading(false);
          return;
        }

        const db = getFirestore();
        let q;

        if (currentUser.type === "admin") {
          q = query(collection(db, "images"));
        } else {
          q = query(collection(db, "images"), where("user_id", "==", currentUser.uid));
        }

        const querySnapshot = await getDocs(q);
        const imagesFromFirestore = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().image,
          style: doc.data().type,
          prompt: doc.data().prompt,
          user_id: doc.data().user_id,
        }));

        setImages(imagesFromFirestore);
      } catch (error) {
        console.error("Error loading images from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [currentUser]);

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `design-${index + 1}.jpg`;
    link.click();
  };

  const handleDelete = async (imageId) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "images", imageId));
      setImages(images.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4 font-bold">
        Gallery
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner className="h-8 w-8" />
        </div>
      ) : images.length === 0 ? (
        <Typography variant="paragraph" className="text-center text-gray-500">
          No saved designs found.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <Card key={img.id} className="shadow-md h-full flex flex-col justify-between">
              <CardBody>
                <img
                  src={img.url}
                  alt={`Design ${index + 1}`}
                  className="rounded-lg mb-2"
                />
                {img.style && (
                  <Typography variant="small" className="mb-2 text-center">
                    <strong className="text-black">Style:</strong> {img.style}
                  </Typography>
                )}
                {img.prompt && (
                  <Typography variant="small" className="mb-2 text-center">
                    <strong className="text-black">Prompt:</strong> {img.prompt}
                  </Typography>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownload(img.url, index)}
                  >
                    Save Image
                  </Button>
                  <Button
                    size="sm"
                    color="red"
                    className="w-full"
                    onClick={() => handleDelete(img.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
