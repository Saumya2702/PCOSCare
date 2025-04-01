import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  differenceInDays,
  subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, ClipboardList, History, Droplet, Heart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const symptomOptions = ["Cramps", "Fatigue", "Mood Swings", "Headache", "Acne", "Bloating", "Cravings"];

// Animated character component
const PeriodCharacter = ({ mood = "happy" }: { mood?: string }) => {
  const variants = {
    happy: { 
      rotate: [0, -5, 5, 0],
      transition: { duration: 1.5, repeat: Infinity } 
    },
    sad: { 
      y: [0, -3, 0],
      transition: { duration: 1.2, repeat: Infinity } 
    },
    default: { 
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity } 
    }
  };

  return (
    <motion.div
      animate={mood in variants ? mood : "default"}
      variants={variants}
      className="relative"
    >
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        {/* Face */}
        <circle cx="50" cy="50" r="40" fill="#FECDD3" />
        
        {/* Eyes */}
        <motion.circle 
          cx="40" cy="45" r="4" fill="#333"
          animate={{ scaleY: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle 
          cx="60" cy="45" r="4" fill="#333"
          animate={{ scaleY: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        
        {/* Mouth */}
        {mood === "happy" && (
          <motion.path 
            d="M40 65 Q50 75 60 65"
            stroke="#333" 
            strokeWidth="3" 
            fill="none"
            animate={{ d: ["M40 65 Q50 75 60 65", "M40 65 Q50 70 60 65"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
        {mood === "sad" && (
          <motion.path 
            d="M40 70 Q50 60 60 70"
            stroke="#333" 
            strokeWidth="3" 
            fill="none"
            animate={{ d: ["M40 70 Q50 60 60 70", "M40 70 Q50 65 60 70"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
        {!["happy", "sad"].includes(mood) && (
          <line x1="40" y1="65" x2="60" y2="65" stroke="#333" strokeWidth="3" />
        )}
        
        {/* Hair */}
        <motion.path 
          d="M30 35 Q50 15 70 35"
          stroke="#333" 
          strokeWidth="4" 
          fill="none"
          animate={{ d: ["M30 35 Q50 15 70 35", "M30 35 Q50 20 70 35"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Animated period drops */}
        <motion.circle 
          cx="35" cy="35" r="5" fill="#F43F5E"
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle 
          cx="65" cy="35" r="5" fill="#F43F5E"
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  );
};

const CycleTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [symptoms, setSymptoms] = useState<{ [key: string]: string[] }>({});
  const [showInfo, setShowInfo] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);

  // Load saved data
  useEffect(() => {
    const savedPeriods = localStorage.getItem("periodDays");
    const savedSymptoms = localStorage.getItem("symptoms");
    
    if (savedPeriods) {
      setPeriodDays(JSON.parse(savedPeriods).map((date: string) => new Date(date)));
    }
    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms));
    }
  }, []);

  // Calculate cycle data
  const cycleLength = periodDays.length > 1
    ? Math.round(
        periodDays.reduce((sum, date, i, arr) => 
          i === 0 ? sum : sum + differenceInDays(date, arr[i - 1]), 0) / 
        (periodDays.length - 1)
      )
    : 28;

  const nextPeriod = periodDays.length > 0 
    ? addDays(periodDays[periodDays.length - 1], cycleLength) 
    : null;

  // Save data
  useEffect(() => {
    localStorage.setItem("periodDays", JSON.stringify(periodDays.map(date => date.toISOString())));
    localStorage.setItem("symptoms", JSON.stringify(symptoms));
  }, [periodDays, symptoms]);

  // Calendar setup
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Handle interactions
  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    const isPeriod = periodDays.some(d => isSameDay(d, day));
    setPeriodDays(isPeriod
      ? periodDays.filter(d => !isSameDay(d, day))
      : [...periodDays, day].sort((a, b) => a.getTime() - b.getTime())
    );
  };

  const toggleSymptom = (symptom: string) => {
    if (!selectedDate) return;
    const key = format(selectedDate, "yyyy-MM-dd");
    const updatedSymptoms = symptoms[key]?.includes(symptom)
      ? symptoms[key].filter((s) => s !== symptom)
      : [...(symptoms[key] || []), symptom];
    setSymptoms({ ...symptoms, [key]: updatedSymptoms });
  };

  // Determine character mood based on selected date
  const getCharacterMood = () => {
    if (!selectedDate) return "default";
    if (periodDays.some(d => isSameDay(d, selectedDate))) return "sad";
    const daySymptoms = symptoms[format(selectedDate, "yyyy-MM-dd")] || [];
    if (daySymptoms.length > 2) return "sad";
    return "happy";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-4"
    >
      {/* Header with animated character */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-6 relative"
      >
       <motion.div
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity }}
    className="absolute left-1/4 -top-6" // Increased -top value
>
    <Droplet className="w-8 h-8 text-pink-500" />
</motion.div>

<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-purple-600 bg-clip-text text-transparent mb-2">
    Period Diary
</h1>
<p className="text-pink-600">Track your menstrual cycle with ease</p>
        {showCharacter && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="flex justify-center mt-2"
          >
            <PeriodCharacter mood={getCharacterMood()} />
          </motion.div>
        )}
      </motion.div>

      {/* Calendar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-4 mb-6 backdrop-blur-sm bg-opacity-80"
      >
        {/* Calendar navigation */}
        <div className="flex items-center justify-between mb-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentDate(addDays(currentDate, -30))}
            className="p-2 text-pink-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.h2 
            key={currentDate.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold text-pink-700"
          >
            {format(currentDate, "MMMM yyyy")}
          </motion.h2>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentDate(addDays(currentDate, 30))}
            className="p-2 text-pink-600"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.1 }}
              className="text-xs font-medium text-pink-600"
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((day, i) => {
            const isPeriod = periodDays.some(d => isSameDay(d, day));
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const daySymptoms = symptoms[format(day, "yyyy-MM-dd")] || [];
            
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <motion.button
                  onClick={() => handleDateClick(day)}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full aspect-square rounded-full flex items-center justify-center text-sm
                    ${isPeriod ? "bg-pink-500 text-white" : "hover:bg-pink-50"}
                    ${isSelected ? "ring-2 ring-pink-400" : ""}`}
                >
                  {format(day, "d")}
                </motion.button>
                
                {daySymptoms.length > 0 && (
                  <motion.div 
                    className="absolute bottom-1 left-0 right-0 flex justify-center space-x-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {daySymptoms.slice(0, 3).map((s, i) => (
                      <motion.div 
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-pink-600"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Symptoms Section */}
      <AnimatePresence>
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-2xl shadow-lg mb-6 backdrop-blur-sm bg-opacity-80"
        >
          <div className="flex items-center justify-between mb-3">
            <motion.div whileHover={{ rotate: 5 }}>
              <ClipboardList className="w-5 h-5 text-pink-500" />
            </motion.div>
            <h2 className="text-lg font-semibold text-pink-600 flex-1 ml-2">
              Log Symptoms
            </h2>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInfo(!showInfo)}
              className="text-pink-600"
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </div>

          {selectedDate ? (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3"
              >
                <h3 className="font-medium text-gray-800">
                  {format(selectedDate, "PPP")}
                  {periodDays.some(d => isSameDay(d, selectedDate)) && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                    >
                      Period Day
                    </motion.span>
                  )}
                </h3>
              </motion.div>
              
              <motion.div 
                layout
                className="flex flex-wrap gap-2"
              >
                {symptomOptions.map((symptom) => {
                  const isSelected = symptoms[format(selectedDate, "yyyy-MM-dd")]?.includes(symptom);
                  return (
                    <motion.button
                      key={symptom}
                      layout
                      onClick={() => toggleSymptom(symptom)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${isSelected 
                          ? "bg-pink-600 text-white shadow-md" 
                          : "bg-pink-50 text-pink-600 hover:bg-pink-100"}`}
                    >
                      {symptom}
                    </motion.button>
                  );
                })}
              </motion.div>
            </>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-center py-4"
            >
              Select a date to log symptoms
            </motion.p>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Cycle Information */}
      {periodDays.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-2xl shadow-lg text-white"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center mb-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <History className="w-5 h-5 mr-2" />
            </motion.div>
            <h2 className="text-lg font-semibold">Cycle Information</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white bg-opacity-20 p-2 rounded-lg"
            >
              <div className="text-xs opacity-80">Cycle Length</div>
              <div className="font-semibold">{cycleLength} days</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white bg-opacity-20 p-2 rounded-lg"
            >
              <div className="text-xs opacity-80">Next Period</div>
              <div className="font-semibold">
                {nextPeriod ? format(nextPeriod, "MMM d") : "Unknown"}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {periodDays.length > 1 ? (
              <p>Based on your {periodDays.length} recorded periods</p>
            ) : (
              <p>Record more periods for accurate predictions</p>
            )}
          </motion.div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default CycleTracker;