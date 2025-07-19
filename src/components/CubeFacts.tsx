import React from 'react';
import { Brain, Clock, Trophy, Zap, Users, Globe } from 'lucide-react';

const CubeFacts: React.FC = () => {
  const facts = [
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      title: "43 Quintillion Combinations",
      description: "There are 43,252,003,274,489,856,000 possible configurations of a Rubik's Cube, but only one solution state."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "God's Number is 20",
      description: "Any scrambled cube can be solved in 20 moves or fewer. This was proven using computer analysis in 2010."
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      title: "World Record: 3.13 seconds",
      description: "The current world record for solving a 3x3 Rubik's Cube is 3.13 seconds, set by Max Park in 2023."
    },
    {
      icon: <Zap className="w-6 h-6 text-green-400" />,
      title: "Speedcubing Methods",
      description: "Popular solving methods include CFOP, Roux, ZZ, and Petrus. CFOP is the most widely used by speedcubers."
    },
    {
      icon: <Users className="w-6 h-6 text-red-400" />,
      title: "Global Community",
      description: "The World Cube Association organizes official competitions worldwide with over 180,000 registered competitors."
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: "Invented in 1974",
      description: "Created by Hungarian architect Ernő Rubik as a teaching tool to help explain 3D geometry to his students."
    }
  ];

  const algorithms = [
    { name: "Sexy Move", notation: "R U R' U'", description: "Most fundamental algorithm in cubing" },
    { name: "T-Perm", notation: "R U R' F' R U R' U' R' F R2 U' R'", description: "Common PLL algorithm" },
    { name: "Sune", notation: "R U R' U R U2 R'", description: "Popular OLL case" },
    { name: "Anti-Sune", notation: "R U2 R' U' R U' R'", description: "Mirror of Sune algorithm" }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Brain className="w-6 h-6 text-purple-400" />
        Rubik's Cube Facts & Algorithms
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {facts.map((fact, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {fact.icon}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">{fact.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{fact.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Common Algorithms
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {algorithms.map((alg, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-white">{alg.name}</h5>
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">ALG</span>
              </div>
              <code className="text-blue-400 text-sm font-mono block mb-2">{alg.notation}</code>
              <p className="text-gray-400 text-xs">{alg.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/30">
        <h4 className="text-white font-medium mb-2">💡 Pro Tip</h4>
        <p className="text-gray-300 text-sm">
          Practice finger tricks and learn to execute algorithms smoothly. Muscle memory is key to improving your solving times!
        </p>
      </div>
    </div>
  );
};

export default CubeFacts;