import React from 'react';
import { Camera, CheckCircle, Clock, Zap } from 'lucide-react';

interface StatusIndicatorProps {
  isScanning: boolean;
  cubeDetected: boolean;
  solutionReady: boolean;
  isAutoSolving: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isScanning,
  cubeDetected,
  solutionReady,
  isAutoSolving
}) => {
  const getStatus = () => {
    if (isAutoSolving) {
      return {
        icon: <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />,
        text: 'Auto-solving in progress...',
        color: 'bg-yellow-900/30 border-yellow-700/50 text-yellow-300'
      };
    }
    
    if (isScanning) {
      return {
        icon: <Camera className="w-5 h-5 text-blue-400 animate-pulse" />,
        text: 'Scanning cube faces...',
        color: 'bg-blue-900/30 border-blue-700/50 text-blue-300'
      };
    }
    
    if (solutionReady) {
      return {
        icon: <CheckCircle className="w-5 h-5 text-green-400" />,
        text: 'Solution ready! Follow the steps.',
        color: 'bg-green-900/30 border-green-700/50 text-green-300'
      };
    }
    
    if (cubeDetected) {
      return {
        icon: <Clock className="w-5 h-5 text-orange-400" />,
        text: 'Cube detected. Generating solution...',
        color: 'bg-orange-900/30 border-orange-700/50 text-orange-300'
      };
    }
    
    return {
      icon: <Camera className="w-5 h-5 text-gray-400" />,
      text: 'Ready to scan your cube',
      color: 'bg-gray-800 border-gray-700 text-gray-300'
    };
  };

  const status = getStatus();

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${status.color} transition-all duration-300`}>
      {status.icon}
      <span className="font-medium">{status.text}</span>
    </div>
  );
};

export default StatusIndicator;