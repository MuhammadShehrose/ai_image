import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("gallery")) || [];
    setImages(savedImages);
  }, []);

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `design-${index + 1}.jpg`;
    link.click();
  };

  const handleDelete = (indexToDelete) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete);
    setImages(updatedImages);
    localStorage.setItem("gallery", JSON.stringify(updatedImages));
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4 font-bold">
        Gallery Page
      </Typography>

      {images.length === 0 ? (
        <Typography variant="paragraph">No saved designs found.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <Card key={index} className="shadow-md">
              <CardBody>
                <img
                  src={img.url}
                  alt={`Design ${index + 1}`}
                  className="rounded-lg mb-2"
                />
                <Typography variant="small" className="mb-2 text-center">
                  Style: {img.style}
                </Typography>
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
                    onClick={() => handleDelete(index)}
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
