import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

export default function TextToImage() {
  const [activeTab, setActiveTab] = useState("features");
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = () => {
    if (!prompt) return alert("Please enter a text prompt.");
    
    // Simulate AI image generation
    setTimeout(() => {
      setGeneratedImage("https://via.placeholder.com/400x300.png?text=Generated+Image");
    }, 1500);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4 font-bold">Text to Image Page</Typography>

      <Card>
        <CardBody>
          <Tabs value={activeTab}>
            <TabsHeader>
              <Tab value="features" onClick={() => setActiveTab("features")}>
                Features
              </Tab>
              <Tab value="editor" onClick={() => setActiveTab("editor")}>
                Editor
              </Tab>
            </TabsHeader>

            <TabsBody>
              <TabPanel value="features">
                <div className="flex flex-col items-center gap-4">
                  <Typography variant="h6">Start designing AI-generated images or videos based on your prompts.</Typography>
                  <Button onClick={() => setActiveTab("editor")} className="w-[200px]">
                    Start Designing
                  </Button>
                </div>
              </TabPanel>

              <TabPanel value="editor">
                <div className="flex flex-col gap-4">
                  <Textarea
                    label="Enter your text prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button onClick={handleGenerate} className="w-[200px]">
                    Generate Image
                  </Button>

                  {generatedImage && (
                    <div className="mt-6">
                      <Typography variant="small" className="mb-2">Generated Result</Typography>
                      <img
                        src={generatedImage}
                        alt="Generated"
                        className="rounded-lg shadow-lg max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
