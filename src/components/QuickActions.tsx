import React from 'react';
import { Play, RotateCcw, Shuffle, HelpCircle, Zap } from 'lucide-react';

interface QuickActionsProps {
  onStartScan: () => void;
  onAutoSolve: () => void;
  onReset: () => void;
  onScramble: () => void;
  onShowHelp: () => void;
  isScanning: boolean;
  isAutoSolving: boolean;
  hasSolution: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onStartScan,
  onAutoSolve,
  onReset,
  onScramble,
  onShowHelp,
  isScanning,
  isAutoSolving,
  hasSolution
}) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-400" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onStartScan}
          disabled={isScanning}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>

        <button
          onClick={onAutoSolve}
          disabled={!hasSolution || isAutoSolving}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          Auto Solve
        </button>

        <button
          onClick={onScramble}
          disabled={isAutoSolving}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-4 h-4" />
          Scramble
        </button>

        <button
          onClick={onReset}
          disabled={isAutoSolving}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <button
        onClick={onShowHelp}
        className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        Need Help?
      </button>
    </div>
  );
};

export default QuickActions;