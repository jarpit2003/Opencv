import React from 'react';
import { ChevronRight, RotateCw, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface Step {
  id: number;
  notation: string;
  description: string;
  icon: React.ReactNode;
  face: string;
  direction: 'clockwise' | 'counterclockwise';
}

interface SolutionStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  isPlaying: boolean;
}

const SolutionSteps: React.FC<SolutionStepsProps> = ({ steps, currentStep, onStepClick, isPlaying }) => {
  const getStepIcon = (notation: string) => {
    if (notation.includes("'")) {
      return <RotateCcw className="w-4 h-4" />;
    }
    return <RotateCw className="w-4 h-4" />;
  };

  const getHandGesture = (notation: string) => {
    const gestures = {
      'R': '👉 Right face clockwise',
      "R'": '👈 Right face counter-clockwise',
      'L': '👈 Left face clockwise',
      "L'": '👉 Left face counter-clockwise',
      'U': '👆 Top face clockwise',
      "U'": '👇 Top face counter-clockwise',
      'D': '👇 Bottom face clockwise',
      "D'": '👆 Bottom face counter-clockwise',
      'F': '🔄 Front face clockwise',
      "F'": '🔄 Front face counter-clockwise',
      'B': '🔄 Back face clockwise',
      "B'": '🔄 Back face counter-clockwise'
    };
    return gestures[notation as keyof typeof gestures] || '🤏 Rotate as shown';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Step 3: Solution Steps</h3>
        <div className="text-sm text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {steps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => onStepClick(index)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
              index === currentStep
                ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20'
                : index < currentStep
                ? 'bg-green-600/10 border-green-500/30'
                : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === currentStep
                    ? 'bg-blue-500 text-white'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      index === currentStep ? 'text-blue-400' : 'text-white'
                    }`}>
                      {step.notation}
                    </span>
                    {getStepIcon(step.notation)}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                </div>
              </div>
              
              {index === currentStep && (
                <ChevronRight className="w-5 h-5 text-blue-400 animate-pulse" />
              )}
            </div>

            {index === currentStep && (
              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-300 mb-2">Hand Gesture:</p>
                  <p className="text-yellow-400 font-medium">{getHandGesture(step.notation)}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {steps.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div>
            <p className="mb-2">Scan your cube to generate solution steps</p>
            <p className="text-xs text-gray-500">Click "Start Scan" in the Camera Scanner first</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionSteps;