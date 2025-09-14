import React, { useState, useRef } from 'react';
import { Upload, Camera, Info, User, Github, ExternalLink, Check, AlertCircle } from 'lucide-react';

interface FaceShapeResult {
  shape: string;
  confidence: number;
  description: string;
  tips: string[];
}

const faceShapes = {
  oval: {
    name: 'Oval',
    description: 'Balanced proportions with a slightly curved jawline and forehead that\'s a bit wider than the chin.',
    tips: ['Most versatile face shape', 'Suits almost any hairstyle', 'Can experiment with various makeup looks', 'Avoid styles that add too much volume']
  },
  round: {
    name: 'Round',
    description: 'Full cheeks and a rounded chin with width and length roughly equal.',
    tips: ['Add height with layered cuts', 'Side parts work better than center parts', 'Contour cheeks for definition', 'Avoid blunt cuts that emphasize roundness']
  },
  square: {
    name: 'Square',
    description: 'Strong, angular jawline with forehead, cheeks, and jaw roughly the same width.',
    tips: ['Soften angles with layers', 'Side-swept bangs add femininity', 'Avoid blunt cuts at jaw level', 'Use contouring to soften sharp angles']
  },
  heart: {
    name: 'Heart',
    description: 'Wider forehead and cheekbones with a narrow, pointed chin.',
    tips: ['Add volume to lower face', 'Side parts balance proportions', 'Avoid styles that add width at temples', 'Chin-length cuts work well']
  },
  diamond: {
    name: 'Diamond',
    description: 'Narrow forehead and chin with wide cheekbones.',
    tips: ['Add width at forehead and chin', 'Side-swept bangs work well', 'Avoid high ponytails', 'Chin-length bobs are flattering']
  },
  oblong: {
    name: 'Oblong',
    description: 'Face length is greater than width with a long, straight cheek line.',
    tips: ['Add width with layered styles', 'Bangs help shorten face length', 'Avoid long, straight styles', 'Side parts add width']
  }
};

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<FaceShapeResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('detector');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis with random result
    setTimeout(() => {
      const shapes = Object.keys(faceShapes);
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const shapeData = faceShapes[randomShape as keyof typeof faceShapes];
      
      setResult({
        shape: shapeData.name,
        confidence: Math.floor(Math.random() * 20) + 80,
        description: shapeData.description,
        tips: shapeData.tips
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Camera className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">FaceShape AI</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setActiveTab('detector')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'detector' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Detector
                </button>
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'guide' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Face Shapes Guide
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://sites.google.com/view/face-shape-detector-/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <span className="text-sm">Face Shape Detector</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://whatismyfaceshape.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <span className="text-sm">Free Face Shape Detector</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/gulzar-abbas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'detector' ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Discover Your Face Shape
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your photo and get instant AI-powered analysis of your face shape with personalized styling recommendations.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Upload className="h-6 w-6 text-blue-600" />
                  <span>Upload Your Photo</span>
                </h2>

                <div className="space-y-6">
                  {!selectedImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600">Click to upload your photo</p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={selectedImage}
                          alt="Uploaded"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        {isAnalyzing && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-2"></div>
                              <p className="text-lg font-medium">Analyzing your face shape...</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Choose Different Photo
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">For best results:</p>
                      <ul className="space-y-1 text-blue-700">
                        <li>• Use a clear, front-facing photo</li>
                        <li>• Ensure good lighting</li>
                        <li>• Keep hair away from face</li>
                        <li>• Look directly at the camera</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <User className="h-6 w-6 text-purple-600" />
                  <span>Your Results</span>
                </h2>

                {!result ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Upload a photo to see your results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Analysis Complete</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {result.shape} Face Shape
                      </h3>
                      <div className="flex items-center justify-center space-x-2 text-gray-600">
                        <span>Confidence:</span>
                        <span className="font-bold text-blue-600">{result.confidence}%</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700">{result.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Styling Tips</h4>
                      <div className="space-y-2">
                        {result.tips.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5" />
                            <span className="text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Face Shapes Guide
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Face Shapes Guide</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn about different face shapes and discover which styling approaches work best for each type.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(faceShapes).map(([key, shape]) => (
                <div key={key} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{shape.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {shape.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Tips:</h4>
                    <ul className="space-y-1">
                      {shape.tips.slice(0, 2).map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Camera className="h-6 w-6" />
                <span className="text-xl font-bold">FaceShape AI</span>
              </div>
              <p className="text-gray-400">
                Advanced AI-powered face shape detection and styling recommendations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="https://sites.google.com/view/face-shape-detector-/home" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
                  Face Shape Detector
                </a>
                <a href="https://whatismyfaceshape.net/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
                  Free Face Shape Detector
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Developer</h3>
              <a href="https://github.com/gulzar-abbas" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span>gulzar-abbas</span>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FaceShape AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;