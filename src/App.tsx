import React, { useState, useEffect } from 'react';
import WelcomeModal from './components/WelcomeModal';
import TourGuide from './components/TourGuide';
import QuickActions from './components/QuickActions';
import ProgressTracker from './components/ProgressTracker';
import RubiksCube from './components/RubiksCube';
import CameraScanner from './components/CameraScanner';
import SolutionSteps from './components/SolutionSteps';
import CubeFacts from './components/CubeFacts';
import UserGuide from './components/UserGuide';
import StatusIndicator from './components/StatusIndicator';
import { Play, Pause, SkipForward, SkipBack, Camera, Cuboid as Cube, BookOpen, Zap, HelpCircle } from 'lucide-react';

interface Step {
  id: number;
  notation: string;
  description: string;
  icon: React.ReactNode;
  face: string;
  direction: 'clockwise' | 'counterclockwise';
}

function App() {
  const [activeTab, setActiveTab] = useState('solver');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [cubeState, setCubeState] = useState(null);
  const [solutionSteps, setSolutionSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoSolving, setIsAutoSolving] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [cubeDetected, setCubeDetected] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [solveProgress, setSolveProgress] = useState(0);

  const mockSolutionSteps: Step[] = [
    { id: 1, notation: "F", description: "Rotate front face clockwise", icon: "🔄", face: "front", direction: "clockwise" },
    { id: 2, notation: "R", description: "Rotate right face clockwise", icon: "🔄", face: "right", direction: "clockwise" },
    { id: 3, notation: "U", description: "Rotate top face clockwise", icon: "🔄", face: "top", direction: "clockwise" },
    { id: 4, notation: "R'", description: "Rotate right face counter-clockwise", icon: "🔄", face: "right", direction: "counterclockwise" },
    { id: 5, notation: "U'", description: "Rotate top face counter-clockwise", icon: "🔄", face: "top", direction: "counterclockwise" },
    { id: 6, notation: "F'", description: "Rotate front face counter-clockwise", icon: "🔄", face: "front", direction: "counterclockwise" },
    { id: 7, notation: "R", description: "Rotate right face clockwise", icon: "🔄", face: "right", direction: "clockwise" },
    { id: 8, notation: "U", description: "Rotate top face clockwise", icon: "🔄", face: "top", direction: "clockwise" },
    { id: 9, notation: "R'", description: "Rotate right face counter-clockwise", icon: "🔄", face: "right", direction: "counterclockwise" },
    { id: 10, notation: "U'", description: "Rotate top face counter-clockwise", icon: "🔄", face: "top", direction: "counterclockwise" }
  ];

  const getCurrentPhase = () => {
    if (isScanning) return 'scan';
    if (cubeDetected && solutionSteps.length === 0) return 'solve';
    return 'complete';
  };

  const handleCubeDetected = (detectedCubeState: any) => {
    setCubeState(detectedCubeState);
    setCubeDetected(true);
    setSolveProgress(0);
    // Simulate solution generation
    const generateSolution = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setSolveProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setSolutionSteps(mockSolutionSteps);
          setCurrentStep(0);
        }
      }, 200);
    };
    generateSolution();
    setIsScanning(false);
  };

  const handleAutoSolve = () => {
    if (solutionSteps.length === 0) return;
    
    setIsAutoSolving(true);
    setShowHint(false);
    
    const executeStep = (stepIndex: number) => {
      if (stepIndex >= solutionSteps.length) {
        setIsAutoSolving(false);
        return;
      }
      
      setCurrentStep(stepIndex);
      
      setTimeout(() => {
        executeStep(stepIndex + 1);
      }, 1500);
    };
    
    executeStep(0);
  };

  const handleStepClick = (stepIndex: number) => {
    if (!isAutoSolving) {
      setCurrentStep(stepIndex);
    }
  };

  const handleNextStep = () => {
    if (currentStep < solutionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleStartTour = () => {
    setShowWelcome(false);
    setShowTour(true);
    setTourStep(0);
  };

  const handleCompleteTour = () => {
    setShowTour(false);
    setTourStep(0);
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setCubeDetected(false);
    setSolutionSteps([]);
  };

  const handleShowHelp = () => {
    setActiveTab('guide');
  };

  // Update scan progress
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 16.67; // 6 steps, so 100/6 ≈ 16.67 per step
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const tabs = [
    { id: 'solver', label: 'Cube Solver', icon: <Cube className="w-4 h-4" /> },
    { id: 'guide', label: 'How to Use', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'facts', label: 'Facts & Tips', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)}
        onStartTour={handleStartTour}
      />
      
      <TourGuide 
        isActive={showTour}
        onComplete={handleCompleteTour}
        currentStep={tourStep}
        onStepChange={setTourStep}
      />

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Advanced Rubik's Cube Solver
              </h1>
              <p className="text-gray-300 text-sm">
                Designed by <span className="text-blue-400 font-medium">Shivane</span> and <span className="text-purple-400 font-medium">Arpit</span> • 
                Powered by OpenCV Computer Vision
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Cube className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-black/10 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Indicator */}
        <div id="status-indicator" className="mb-6">
          <StatusIndicator
            isScanning={isScanning}
            cubeDetected={cubeDetected}
            solutionReady={solutionSteps.length > 0}
            isAutoSolving={isAutoSolving}
          />
        </div>

        {activeTab === 'solver' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Camera Scanner */}
            <div className="space-y-4">
              <div id="camera-scanner">
                <CameraScanner
                  onCubeDetected={handleCubeDetected}
                  isScanning={isScanning}
                  setIsScanning={setIsScanning}
                />
              </div>
              
              <ProgressTracker 
                currentPhase={getCurrentPhase()}
                scanProgress={scanProgress}
                solveProgress={solveProgress}
              />
              
              <QuickActions
                onStartScan={handleStartScan}
                onAutoSolve={handleAutoSolve}
                onReset={() => {}} // Will be connected to cube reset
                onScramble={() => {}} // Will be connected to cube scramble
                onShowHelp={handleShowHelp}
                isScanning={isScanning}
                isAutoSolving={isAutoSolving}
                hasSolution={solutionSteps.length > 0}
              />
            </div>

            {/* Center Column - 3D Cube */}
            <div className="flex flex-col items-center justify-center">
              <div id="rubiks-cube" className="bg-gray-900 rounded-xl p-8 border border-gray-700 w-full">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  {cubeState ? 'Your Cube (Live Camera State)' : 'Interactive 3D Cube'}
                </h3>
                <RubiksCube
                  cubeState={cubeState}
                  currentStep={currentStep}
                  isAutoSolving={isAutoSolving}
                  showHint={showHint}
                />
                
                {cubeState && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">Live Camera State</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Solution Steps */}
            <div className="space-y-4">
              <div id="solution-steps">
                <SolutionSteps
                  steps={solutionSteps}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                  isPlaying={isAutoSolving}
                />
              </div>
              
              {/* Control Panel */}
              {solutionSteps.length > 0 && (
                <div id="control-panel" className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Solution Controls
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStep === 0 || isAutoSolving}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <SkipBack className="w-4 h-4" />
                      Prev
                    </button>
                    
                    <button
                      onClick={handleNextStep}
                      disabled={currentStep === solutionSteps.length - 1 || isAutoSolving}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleAutoSolve}
                      disabled={isAutoSolving || solutionSteps.length === 0}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isAutoSolving ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isAutoSolving ? 'Auto-Solving...' : 'Auto Solve'}
                    </button>
                    
                    <button
                      onClick={toggleHint}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        showHint 
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      {showHint ? 'Hide Hints' : 'Show Hints'}
                    </button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      💡 <strong>Tip:</strong> Use "Show Hints" to see which face to rotate next, or click "Auto Solve" to watch the solution!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <button
                onClick={() => setShowWelcome(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Show Welcome Guide Again
              </button>
            </div>
            <UserGuide />
          </div>
        )}

        {activeTab === 'facts' && (
          <div className="max-w-4xl mx-auto">
            <CubeFacts />
          </div>
        )}
      </main>

      {/* Floating Help Button */}
      <button
        onClick={() => setShowWelcome(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-30"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="mb-2">
              Advanced Rubik's Cube Solver with Computer Vision Integration
            </p>
            <p className="text-sm">
              Built with React, TypeScript, and OpenCV • 
              <span className="text-blue-400 ml-1">Designed by Shivane and Arpit</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;