import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Shuffle, Play, Pause, SkipForward, SkipBack, Lightbulb } from 'lucide-react';

interface Face {
  id: string;
  colors: string[][];
}

interface CubeState {
  front: string[][];
  back: string[][];
  right: string[][];
  left: string[][];
  top: string[][];
  bottom: string[][];
}

const initialColors = {
  front: [['white', 'white', 'white'], ['white', 'white', 'white'], ['white', 'white', 'white']],
  back: [['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow']],
  right: [['red', 'red', 'red'], ['red', 'red', 'red'], ['red', 'red', 'red']],
  left: [['orange', 'orange', 'orange'], ['orange', 'orange', 'orange'], ['orange', 'orange', 'orange']],
  top: [['green', 'green', 'green'], ['green', 'green', 'green'], ['green', 'green', 'green']],
  bottom: [['blue', 'blue', 'blue'], ['blue', 'blue', 'blue'], ['blue', 'blue', 'blue']]
};

const colorMap = {
  white: '#ffffff',
  yellow: '#ffed4e',
  red: '#ef4444',
  orange: '#f97316',
  green: '#22c55e',
  blue: '#3b82f6'
};

interface RubiksCubeProps {
  cubeState?: CubeState;
  currentStep?: number;
  isAutoSolving?: boolean;
  onFaceRotate?: (face: string, direction: string) => void;
  showHint?: boolean;
}

const RubiksCube: React.FC<RubiksCubeProps> = ({ 
  cubeState, 
  currentStep = 0, 
  isAutoSolving = false,
  onFaceRotate,
  showHint = false
}) => {
  const [internalCubeState, setInternalCubeState] = useState<CubeState>(cubeState || initialColors);
  const [rotation, setRotation] = useState({ x: -25, y: 45 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedFace, setHighlightedFace] = useState<string | null>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (cubeState) {
      setInternalCubeState(cubeState);
    }
  }, [cubeState]);

  useEffect(() => {
    if (showHint && currentStep >= 0) {
      // Simulate highlighting the face that needs to be rotated
      const faces = ['front', 'right', 'top', 'left', 'back', 'bottom'];
      const faceToHighlight = faces[currentStep % faces.length];
      setHighlightedFace(faceToHighlight);
      
      const timer = setTimeout(() => {
        setHighlightedFace(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showHint, currentStep]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAutoSolving) return;
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isAutoSolving) return;
    
    const deltaX = e.clientX - lastMouse.current.x;
    const deltaY = e.clientY - lastMouse.current.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const scrambleCube = () => {
    if (isAnimating || isAutoSolving) return;
    
    setIsAnimating(true);
    const colors = ['white', 'yellow', 'red', 'orange', 'green', 'blue'];
    const newState: CubeState = {
      front: [],
      back: [],
      right: [],
      left: [],
      top: [],
      bottom: []
    };

    Object.keys(newState).forEach(face => {
      newState[face as keyof CubeState] = Array(3).fill(null).map(() =>
        Array(3).fill(null).map(() => colors[Math.floor(Math.random() * colors.length)])
      );
    });

    setTimeout(() => {
      setInternalCubeState(newState);
      setIsAnimating(false);
    }, 600);
  };

  const resetCube = () => {
    if (isAnimating || isAutoSolving) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setInternalCubeState(initialColors);
      setIsAnimating(false);
    }, 600);
  };

  const rotateFace = (face: keyof CubeState, clockwise: boolean = true) => {
    if (isAnimating || isAutoSolving) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setInternalCubeState(prev => {
        const newState = { ...prev };
        const faceMatrix = [...prev[face]];
        
        if (clockwise) {
          const rotated = [
            [faceMatrix[2][0], faceMatrix[1][0], faceMatrix[0][0]],
            [faceMatrix[2][1], faceMatrix[1][1], faceMatrix[0][1]],
            [faceMatrix[2][2], faceMatrix[1][2], faceMatrix[0][2]]
          ];
          newState[face] = rotated;
        } else {
          const rotated = [
            [faceMatrix[0][2], faceMatrix[1][2], faceMatrix[2][2]],
            [faceMatrix[0][1], faceMatrix[1][1], faceMatrix[2][1]],
            [faceMatrix[0][0], faceMatrix[1][0], faceMatrix[2][0]]
          ];
          newState[face] = rotated;
        }
        
        return newState;
      });
      
      if (onFaceRotate) {
        onFaceRotate(face, clockwise ? 'clockwise' : 'counterclockwise');
      }
      
      setIsAnimating(false);
    }, 600);
  };

  const renderFace = (face: keyof CubeState, className: string) => {
    const isHighlighted = highlightedFace === face;
    
    return (
      <div 
        className={`cube-face ${className} ${isAnimating ? 'animate-pulse' : ''} ${
          isHighlighted ? 'highlighted-face' : ''
        } ${isAutoSolving ? 'pointer-events-none' : ''}`}
        onClick={() => !isAutoSolving && rotateFace(face)}
      >
        {internalCubeState[face].map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cube-square"
              style={{ backgroundColor: colorMap[color as keyof typeof colorMap] }}
            />
          ))
        )}
        
        {isHighlighted && (
          <div className="absolute inset-0 bg-yellow-400/20 rounded-lg animate-pulse pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Lightbulb className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div 
          ref={cubeRef}
          className={`cube-container ${isAutoSolving ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging.current ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {renderFace('front', 'front')}
          {renderFace('back', 'back')}
          {renderFace('right', 'right')}
          {renderFace('left', 'left')}
          {renderFace('top', 'top')}
          {renderFace('bottom', 'bottom')}
        </div>
        
        {isAutoSolving && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              Auto-solving...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={resetCube}
          disabled={isAnimating || isAutoSolving}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <RotateCcw size={18} />
          Reset
        </button>
        
        <button
          onClick={scrambleCube}
          disabled={isAnimating || isAutoSolving}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Shuffle size={18} />
          Scramble
        </button>
      </div>
    </div>
  );
};

export default RubiksCube;