import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X, Target } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TourGuideProps {
  isActive: boolean;
  onComplete: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'status',
    title: 'Status Indicator',
    description: 'This shows you exactly what the app is doing at any moment. Watch for color changes!',
    target: 'status-indicator',
    position: 'bottom'
  },
  {
    id: 'scanner',
    title: 'Camera Scanner',
    description: 'Click "Start Scan" here to detect your cube. The app will simulate scanning all 6 faces.',
    target: 'camera-scanner',
    position: 'right'
  },
  {
    id: 'cube',
    title: '3D Interactive Cube',
    description: 'This shows your cube in real-time. Drag to rotate the view, click faces to turn them.',
    target: 'rubiks-cube',
    position: 'top'
  },
  {
    id: 'steps',
    title: 'Solution Steps',
    description: 'Once scanned, step-by-step instructions appear here with hand gestures to guide you.',
    target: 'solution-steps',
    position: 'left'
  },
  {
    id: 'controls',
    title: 'Control Panel',
    description: 'Use these buttons to navigate steps manually or let the app auto-solve for you.',
    target: 'control-panel',
    position: 'top'
  }
];

const TourGuide: React.FC<TourGuideProps> = ({ isActive, onComplete, currentStep, onStepChange }) => {
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);

  useEffect(() => {
    if (isActive && currentStep < tourSteps.length) {
      const step = tourSteps[currentStep];
      setHighlightedElement(step.target);
      
      // Scroll to element
      const element = document.getElementById(step.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightedElement(null);
    }
  }, [isActive, currentStep]);

  if (!isActive || currentStep >= tourSteps.length) return null;

  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      onStepChange(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      
      {/* Tour Tooltip */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Step {currentStep + 1} of {tourSteps.length}</span>
            </div>
            <button
              onClick={onComplete}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
          <p className="text-gray-300 mb-6">{step.description}</p>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-2">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Highlight styles */}
      <style jsx>{`
        #${highlightedElement} {
          position: relative;
          z-index: 45;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3) !important;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default TourGuide;