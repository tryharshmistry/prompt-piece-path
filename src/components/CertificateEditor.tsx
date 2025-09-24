import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Edit3, Type, Save } from "lucide-react";
import certificateTemplate from "@/assets/certificate-template.jpg";

interface CertificateEditorProps {
  playerName: string;
  onBack: () => void;
}

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
}

export const CertificateEditor = ({ playerName, onBack }: CertificateEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textElements, setTextElements] = useState<TextElement[]>([
    {
      id: "name",
      text: playerName,
      x: 50,
      y: 45,
      fontSize: 24,
      color: "#000000",
      fontFamily: "Arial"
    },
    {
      id: "event",
      text: "Prompt Puzzle Challenge",
      x: 50,
      y: 55,
      fontSize: 18,
      color: "#000000",
      fontFamily: "Arial"
    },
    {
      id: "organization",
      text: "AI Learning Academy",
      x: 50,
      y: 65,
      fontSize: 16,
      color: "#000000",
      fontFamily: "Arial"
    }
  ]);
  const [selectedElement, setSelectedElement] = useState<string>("name");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      renderCanvas();
    };
    img.src = certificateTemplate;

    const renderCanvas = () => {
      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;
      
      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw text elements
      textElements.forEach(element => {
        ctx.font = `${element.fontSize}px ${element.fontFamily}`;
        ctx.fillStyle = element.color;
        ctx.textAlign = "center";
        
        const x = (element.x / 100) * canvas.width;
        const y = (element.y / 100) * canvas.height;
        
        ctx.fillText(element.text, x, y);
      });
    };

    if (imageLoaded) {
      renderCanvas();
    }
  }, [textElements, imageLoaded]);

  const updateTextElement = (id: string, field: keyof TextElement, value: string | number) => {
    setTextElements(prev => 
      prev.map(element => 
        element.id === id 
          ? { ...element, [field]: value }
          : element
      )
    );
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${playerName}-certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const selectedTextElement = textElements.find(el => el.id === selectedElement);

  return (
    <div className="min-h-screen bg-gradient-primary p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h1 className="text-3xl font-bold mb-2">Certificate Editor</h1>
          <p className="text-white/80">Customize your Prompt Puzzle completion certificate</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Canvas Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-puzzle backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Certificate Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto border rounded-lg shadow-lg bg-white"
                    style={{ maxHeight: "450px" }}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-muted animate-pulse rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Loading template...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Editor Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Element Selector */}
            <Card className="shadow-puzzle backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Text Elements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {textElements.map(element => (
                  <Button
                    key={element.id}
                    variant={selectedElement === element.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedElement(element.id)}
                  >
                    {element.id === "name" && "Participant Name"}
                    {element.id === "event" && "Event/Program"}
                    {element.id === "organization" && "Organization"}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Text Editor */}
            {selectedTextElement && (
              <Card className="shadow-puzzle backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Edit Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="text">Text Content</Label>
                    <Input
                      id="text"
                      value={selectedTextElement.text}
                      onChange={(e) => updateTextElement(selectedElement, "text", e.target.value)}
                      placeholder="Enter text..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="fontSize">Font Size</Label>
                      <Input
                        id="fontSize"
                        type="number"
                        min="8"
                        max="48"
                        value={selectedTextElement.fontSize}
                        onChange={(e) => updateTextElement(selectedElement, "fontSize", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        type="color"
                        value={selectedTextElement.color}
                        onChange={(e) => updateTextElement(selectedElement, "color", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="x">Horizontal Position (%)</Label>
                      <Input
                        id="x"
                        type="number"
                        min="0"
                        max="100"
                        value={selectedTextElement.x}
                        onChange={(e) => updateTextElement(selectedElement, "x", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="y">Vertical Position (%)</Label>
                      <Input
                        id="y"
                        type="number"
                        min="0"
                        max="100"
                        value={selectedTextElement.y}
                        onChange={(e) => updateTextElement(selectedElement, "y", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="success"
                size="lg"
                className="w-full"
                onClick={downloadCertificate}
                disabled={!imageLoaded}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={onBack}
              >
                Back to Game
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};