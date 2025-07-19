import React, { useState } from 'react';
import { HelpCircle, Camera, MousePointer, Play, Eye, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

const UserGuide: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: '🚀 Getting Started',
      icon: <Play className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Step 1: Scan Your Cube</h4>
            <p className="text-gray-300 text-sm mb-2">Click the "Start Scan" button in the Camera Scanner panel (left side)</p>
            <p className="text-gray-400 text-xs">The app will simulate detecting all 6 faces of your cube (this represents OpenCV camera detection)</p>
          </div>
          
          <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-green-300 mb-2">Step 2: View Solution</h4>
            <p className="text-gray-300 text-sm mb-2">Once scanning is complete, solution steps will appear on the right</p>
            <p className="text-gray-400 text-xs">Each step shows the move notation (like R, U, F) and hand gestures</p>
          </div>
          
          <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-300 mb-2">Step 3: Follow Steps</h4>
            <p className="text-gray-300 text-sm mb-2">Use "Auto Solve" or manually navigate through each step</p>
            <p className="text-gray-400 text-xs">The 3D cube will show you exactly which face to rotate</p>
          </div>
        </div>
      )
    },
    {
      id: 'camera-scanner',
      title: '📷 Camera Scanner',
      icon: <Camera className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-white mb-2">How it works:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Click "Start Scan" to begin cube detection</li>
              <li>• The scanner detects faces 1-6 progressively</li>
              <li>• Progress bar shows detection status</li>
              <li>• Once complete, your cube state is captured</li>
            </ul>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              <strong>Note:</strong> This simulates OpenCV computer vision. In a real implementation, 
              you would point your camera at each face of your physical cube.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cube-controls',
      title: '🎮 3D Cube Controls',
      icon: <MousePointer className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-lg p-3">
              <h4 className="font-medium text-blue-300 mb-2">Mouse Controls</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• <strong>Drag:</strong> Rotate entire cube view</li>
                <li>• <strong>Click face:</strong> Rotate that face</li>
                <li>• <strong>Hover:</strong> Highlight face</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <h4 className="font-medium text-green-300 mb-2">Buttons</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• <strong>Scramble:</strong> Mix up the cube</li>
                <li>• <strong>Reset:</strong> Return to solved state</li>
                <li>• <strong>Show Hints:</strong> Highlight next move</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'solution-steps',
      title: '📋 Solution Steps',
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-white mb-2">Understanding Notation:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-300">
                <strong>R</strong> = Right face clockwise
              </div>
              <div className="text-gray-300">
                <strong>R'</strong> = Right face counter-clockwise
              </div>
              <div className="text-gray-300">
                <strong>U</strong> = Top face clockwise
              </div>
              <div className="text-gray-300">
                <strong>U'</strong> = Top face counter-clockwise
              </div>
              <div className="text-gray-300">
                <strong>F</strong> = Front face clockwise
              </div>
              <div className="text-gray-300">
                <strong>F'</strong> = Front face counter-clockwise
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-white mb-2">Hand Gestures:</h4>
            <div className="text-gray-300 text-sm space-y-1">
              <div>👉 = Rotate right face clockwise</div>
              <div>👈 = Rotate left face clockwise</div>
              <div>👆 = Rotate top face clockwise</div>
              <div>👇 = Rotate bottom face clockwise</div>
              <div>🔄 = Rotate front/back face</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'controls',
      title: '🎛️ Control Panel',
      icon: <Play className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-white mb-2">Navigation:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong>Prev/Next:</strong> Move between solution steps manually</li>
              <li>• <strong>Auto Solve:</strong> Watch the cube solve itself automatically</li>
              <li>• <strong>Show Hints:</strong> Highlight which face to rotate next</li>
            </ul>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3">
            <h4 className="font-medium text-blue-300 mb-2">Pro Tip:</h4>
            <p className="text-gray-300 text-sm">
              Use "Show Hints" mode to see which face will be highlighted for the current step. 
              This helps you learn the solving sequence!
            </p>
          </div>
        </div>
      )
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">How to Use the Cube Solver</h3>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="font-medium text-white">{section.title}</span>
              </div>
              {expandedSection === section.id ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSection === section.id && (
              <div className="p-4 bg-gray-850 border-t border-gray-700">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-700/30">
        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Quick Start Summary
        </h4>
        <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
          <li>Click "Start Scan" to detect your cube</li>
          <li>Wait for all 6 faces to be detected</li>
          <li>Review the solution steps on the right</li>
          <li>Use "Auto Solve" or follow steps manually</li>
          <li>Watch the 3D cube show you each move</li>
        </ol>
      </div>
    </div>
  );
};

export default UserGuide;