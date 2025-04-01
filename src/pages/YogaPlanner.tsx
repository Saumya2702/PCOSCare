import React, { useState } from 'react';
import { Play, Clock, ChevronDown, Heart, Moon, Sun, Activity, Leaf, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const yogaRoutines = [
  {
    id: 1,
    title: 'Morning Energy Flow',
    duration: '20 min',
    level: 'Beginner',
    description: 'Start your day with gentle stretches and energizing poses',
    poses: ['Sun Salutation', 'Cat-Cow Stretch', 'Warrior I', "Child's Pose"],
    benefits: ['Boosts metabolism', 'Reduces insulin resistance', 'Improves circulation'],
    pcosFocus: ['Energy', 'Hormone balance'],
    icon: <Sun className="w-5 h-5" />
  },
  {
    id: 2,
    title: 'Hormone Balance Flow',
    duration: '30 min',
    level: 'Intermediate',
    description: 'Poses specifically designed to help balance hormones',
    poses: ['Bridge Pose', 'Legs up the Wall', 'Butterfly Pose', 'Corpse Pose'],
    benefits: ['Regulates menstrual cycle', 'Reduces stress hormones', 'Supports thyroid function'],
    pcosFocus: ['Hormones', 'Stress relief'],
    icon: <Leaf className="w-5 h-5" />
  },
  {
    id: 3,
    title: 'Stress Relief Sequence',
    duration: '25 min',
    level: 'All Levels',
    description: 'Calming poses to reduce stress and anxiety',
    poses: ['Forward Fold', 'Easy Pose', 'Seated Twist', 'Savasana'],
    benefits: ['Lowers cortisol', 'Improves sleep quality', 'Reduces inflammation'],
    pcosFocus: ['Relaxation', 'Mental health'],
    icon: <Moon className="w-5 h-5" />
  },
  {
    id: 4,
    title: 'Metabolic Boost',
    duration: '35 min',
    level: 'Intermediate',
    description: 'Active sequence to improve insulin sensitivity',
    poses: ['Warrior II', 'Triangle Pose', 'Chair Pose', 'Twisted Chair'],
    benefits: ['Enhances glucose metabolism', 'Supports weight management', 'Increases energy'],
    pcosFocus: ['Metabolism', 'Weight'],
    icon: <Activity className="w-5 h-5" />
  },
  {
    id: 5,
    title: 'Fertility Support',
    duration: '40 min',
    level: 'Intermediate',
    description: 'Poses to support reproductive health',
    poses: ['Reclining Bound Angle', 'Supported Bridge', 'Hip Openers', 'Legs Up the Wall'],
    benefits: ['Improves ovarian function', 'Enhances blood flow', 'Reduces pelvic tension'],
    pcosFocus: ['Fertility', 'Reproductive health'],
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 6,
    title: 'Evening Wind Down',
    duration: '15 min',
    level: 'Beginner',
    description: 'Gentle sequence to prepare for restful sleep',
    poses: ['Seated Forward Bend', 'Supine Twist', 'Happy Baby', 'Corpse Pose'],
    benefits: ['Regulates circadian rhythm', 'Reduces nighttime cravings', 'Promotes recovery'],
    pcosFocus: ['Sleep', 'Recovery'],
    icon: <Moon className="w-5 h-5" />
  }
];

const YogaPlanner = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<{
    symptoms: string[];
    fitnessLevel: string;
    goals: string[];
  }>({
    symptoms: [], // Initialize as an empty array of strings
    fitnessLevel: '',
    goals: [],
  });

  const filters = [
    { id: 'all', name: 'All Routines', icon: <Zap className="w-4 h-4" /> },
    { id: 'hormones', name: 'Hormone Balance', icon: <Leaf className="w-4 h-4" /> },
    { id: 'stress', name: 'Stress Relief', icon: <Moon className="w-4 h-4" /> },
    { id: 'metabolism', name: 'Metabolism', icon: <Activity className="w-4 h-4" /> },
    { id: 'fertility', name: 'Fertility', icon: <Heart className="w-4 h-4" /> }
  ];

  const filteredRoutines = yogaRoutines.filter(routine => {
    if (activeFilter === 'all') return true;
        return routine.pcosFocus.some(focus => 
            focus.toLowerCase().includes(activeFilter))
         });
      

  const toggleAssessment = () => {
    setShowAssessment(!showAssessment);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* Header with animated gradient */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.h1 
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          💖 Your Cycle & Stretch Planner 🧘🏽‍♀️
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Specially designed yoga routines to help manage PCOS symptoms and improve overall wellbeing
        </p>
      </motion.section>

      {/* Filter buttons */}
      <motion.div 
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filters.map(filter => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 ${
              activeFilter === filter.id 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.icon}
            {filter.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Yoga Routine Cards */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredRoutines.map((routine) => (
          <motion.div
            key={routine.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-pink-100 text-pink-600">
                  {routine.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{routine.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{routine.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{routine.level}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 my-4">{routine.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">PCOS Benefits:</h4>
                <ul className="space-y-1">
                  {routine.benefits.slice(0, 2).map((benefit, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="text-pink-500 mr-1">•</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={() => setSelectedRoutine(selectedRoutine === routine.id ? null : routine.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                {selectedRoutine === routine.id ? 'Hide Details' : 'Start Routine'}
              </motion.button>
            </div>
            
            <AnimatePresence>
              {selectedRoutine === routine.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-pink-50 overflow-hidden"
                >
                  <div className="p-4 border-t border-pink-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Poses:</h4>
                        <ul className="space-y-1">
                          {routine.poses.map((pose, index) => (
                            <motion.li 
                              key={index} 
                              className="text-sm text-gray-600"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              • {pose}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">PCOS Focus:</h4>
                        <div className="flex flex-wrap gap-1">
                          {routine.pcosFocus.map((focus, i) => (
                            <motion.span
                              key={i}
                              className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 + 0.2 }}
                            >
                              {focus}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-pink-600 font-medium flex items-center">
                      View detailed instructions
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default YogaPlanner;