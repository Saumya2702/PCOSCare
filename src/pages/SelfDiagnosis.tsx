import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const questions = [
  { question: "Do you have irregular menstrual cycles?", options: ["Yes", "No"] },
  { question: "Have you noticed excessive hair growth (face, chest, back)?", options: ["Yes", "No"] },
  { question: "Do you experience sudden weight gain or difficulty losing weight?", options: ["Yes", "No"] },
  { question: "Do you have acne or oily skin?", options: ["Yes", "No"] },
  { question: "Have you noticed hair thinning or hair loss?", options: ["Yes", "No"] },
  { question: "Do you experience frequent mood swings or depression?", options: ["Yes", "No"] },
  { question: "Have you been diagnosed with high blood sugar levels or insulin resistance?", options: ["Yes", "No"] },
  { question: "Do you experience difficulty in conceiving or fertility issues?", options: ["Yes", "No"] },
  { question: "Do you have severe period cramps?", options: ["Yes", "No"] },
  { question: "Do you experience heavy or prolonged bleeding during periods?", options: ["Yes", "No"] },
  { question: "Do you feel fatigued or have low energy during your periods?", options: ["Yes", "No"] },
  { question: "Have you noticed dark patches on your skin, especially around the neck and underarms?", options: ["Yes", "No"] },
];

const SelfDiagnosis = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));

  const handleChange = (index: number, answer: string) => {
    const newResponses = [...responses];
    newResponses[index] = answer;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    if (responses.includes(null)) {
      toast.warn("Please answer all the questions.");
      return;
    }

    const yesCount = responses.filter((resp) => resp === "Yes").length;

    if (yesCount >= 6) {
      toast.error("High likelihood of PCOS. Please consult a doctor.");
    } else if (yesCount >= 4) {
      toast.warn("Moderate likelihood of PCOS. Consider consulting a doctor.");
    } else {
      toast.success("Low likelihood of PCOS. Stay healthy!");
    }
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-r from-pink-200 to-purple-300"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl p-6 rounded-lg max-w-lg w-full text-center"
      >
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4"
          initial={{ y: -20, opacity: 0 }}
          style={{ fontFamily: "'DynaPuff', cursive" }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          PCOS: What's Going On❓
        </motion.h1>

        {questions.map((q, index) => (
          <motion.div 
            key={index} 
            className="mt-4 text-left bg-gray-100 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-medium text-pink-600">{q.question}</p>
            {q.options.map((option) => (
              <label key={option} className="block text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name={`q${index}`}
                  value={option}
                  checked={responses[index] === option}
                  onChange={() => handleChange(index, option)}
                  className="mr-2 accent-pink-500"
                />
                {option}
              </label>
            ))}
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition"
          onClick={handleSubmit}
        >
          Submit
        </motion.button>

        <ToastContainer position="top-center" autoClose={3000} />
      </motion.div>
    </motion.div>
  );
};

export default SelfDiagnosis;