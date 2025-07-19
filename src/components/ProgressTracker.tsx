import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface ProgressTrackerProps {
  currentPhase: 'scan' | 'solve' | 'complete';
  scanProgress: number;
  solveProgress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentPhase, scanProgress, solveProgress }) => {
  const phases = [
    { id: 'scan', label: 'Scan Cube', icon: Circle },
    { id: 'solve', label: 'Generate Solution', icon: Circle },
    { id: 'complete', label: 'Follow Steps', icon: Circle }
  ];

  const getPhaseStatus = (phaseId: string) => {
    if (currentPhase === 'scan' && phaseId === 'scan') return 'active';
    if (currentPhase === 'solve' && phaseId === 'solve') return 'active';
    if (currentPhase === 'complete' && phaseId === 'complete') return 'active';
    
    if (currentPhase === 'solve' && phaseId === 'scan') return 'complete';
    if (currentPhase === 'complete' && (phaseId === 'scan' || phaseId === 'solve')) return 'complete';
    
    return 'pending';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
      
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const status = getPhaseStatus(phase.id);
          
          return (
            <div key={phase.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                status === 'complete' ? 'bg-green-600' :
                status === 'active' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                {status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : status === 'active' ? (
                  <Clock className="w-5 h-5 text-white animate-pulse" />
                ) : (
                  <span className="text-white font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  status === 'complete' ? 'text-green-400' :
                  status === 'active' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {phase.label}
                </p>
                
                {status === 'active' && phase.id === 'scan' && (
                  <div className="mt-1">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{scanProgress}% complete</p>
                  </div>
                )}
                
                {status === 'active' && phase.id === 'solve' && (
                  <div className="mt-1">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${solveProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Generating solution...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;