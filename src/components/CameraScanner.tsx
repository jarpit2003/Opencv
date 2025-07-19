import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Scan, CheckCircle } from 'lucide-react';

interface CameraScannerProps {
  onCubeDetected: (cubeState: any) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onCubeDetected, isScanning, setIsScanning }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [detectedFaces, setDetectedFaces] = useState(0);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        // Start cube detection simulation
        simulateCubeDetection();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const simulateCubeDetection = () => {
    // Simulate progressive face detection
    let faces = 0;
    const interval = setInterval(() => {
      faces++;
      setDetectedFaces(faces);
      
      if (faces >= 6) {
        clearInterval(interval);
        // Simulate detected cube state
        const mockCubeState = {
          front: [['white', 'red', 'white'], ['blue', 'white', 'green'], ['yellow', 'white', 'orange']],
          back: [['yellow', 'blue', 'yellow'], ['red', 'yellow', 'white'], ['green', 'yellow', 'blue']],
          right: [['red', 'green', 'red'], ['orange', 'red', 'yellow'], ['blue', 'red', 'white']],
          left: [['orange', 'white', 'orange'], ['green', 'orange', 'blue'], ['red', 'orange', 'yellow']],
          top: [['green', 'orange', 'green'], ['white', 'green', 'red'], ['yellow', 'green', 'blue']],
          bottom: [['blue', 'yellow', 'blue'], ['orange', 'blue', 'green'], ['white', 'blue', 'red']]
        };
        setTimeout(() => onCubeDetected(mockCubeState), 500);
      }
    }, 800);
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      setDetectedFaces(0);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Scan className="w-5 h-5 text-blue-400" />
          Step 1: Camera Scanner
        </h3>
        <button
          onClick={toggleScanning}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isScanning 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isScanning ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          {isScanning ? 'Stop Scan' : 'Start Scan'}
        </button>
      </div>

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-64 bg-gray-800 rounded-lg object-cover ${
            !isScanning ? 'hidden' : ''
          }`}
        />
        
        {!isScanning && (
          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="mb-2">Click "Start Scan" to detect your cube</p>
              <p className="text-xs text-gray-500">This simulates OpenCV computer vision</p>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Scanning overlay */}
            <div className="absolute inset-4 border-2 border-blue-400 rounded-lg">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400"></div>
            </div>
            
            {/* Detection progress */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>Detecting faces: {detectedFaces}/6</span>
                {detectedFaces === 6 && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(detectedFaces / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {hasPermission === false && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300 text-sm">
            Camera access denied. In a real implementation, you would need camera permissions to scan your physical cube.
          </p>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
        <h4 className="text-blue-300 font-medium mb-1">💡 How this works:</h4>
        <p className="text-gray-300 text-sm">
          This simulates <strong>OpenCV computer vision</strong> detecting each face of your physical Rubik's cube. 
          In a real implementation, you would point your camera at each face to capture the current state.
        </p>
      </div>
      
      <div className="mt-3 p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
        <h4 className="text-green-300 font-medium mb-1">🎯 Next Steps:</h4>
        <p className="text-gray-300 text-sm">
          After scanning, the app will generate step-by-step solution instructions with hand gestures to guide you through solving your cube!
        </p>
      </div>
    </div>
  );
};

export default CameraScanner;