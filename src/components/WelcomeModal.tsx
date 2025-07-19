import React, { useState } from 'react';
import { X, Play, Camera, Eye, Zap, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onStartTour }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Welcome to the Rubik's Cube Solver! 🎲</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <div className="text-3xl">🎯</div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                This app helps you solve any Rubik's cube using computer vision and step-by-step guidance.
                Let's get you started in just 3 simple steps!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 text-center">
                <Camera className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-300 mb-2">1. Scan Your Cube</h3>
                <p className="text-gray-300 text-sm">Click "Start Scan" to detect your cube's current state</p>
              </div>

              <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 text-center">
                <Eye className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-green-300 mb-2">2. View Solution</h3>
                <p className="text-gray-300 text-sm">Get step-by-step instructions with hand gestures</p>
              </div>

              <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-4 text-center">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-300 mb-2">3. Solve It!</h3>
                <p className="text-gray-300 text-sm">Follow along or use auto-solve to watch it happen</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-300 mb-2">💡 Quick Tips:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• The camera scanner simulates OpenCV computer vision technology</li>
                <li>• Each solution step shows hand gestures (👉👈👆👇) to guide you</li>
                <li>• Click any face of the 3D cube to rotate it manually</li>
                <li>• Use "Show Hints" to see which face to rotate next</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onStartTour}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Interactive Tour
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
              >
                Skip & Explore
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;