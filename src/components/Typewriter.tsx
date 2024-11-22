"use client";

import React, { useState, useEffect } from "react";

type AdvancedTypewriterProps = {
  baseText: string; // Static part of the sentence
  dynamicWords?: string[]; // Words to animate at the end of the sentence
  speed?: number; // Typing speed in milliseconds
  wordChangeDelay?: number; // Delay between switching words (in milliseconds)
  dynamicWordColor?: string; // Color for dynamic words
};

const Typewriter: React.FC<AdvancedTypewriterProps> = ({
  baseText,
  dynamicWords = [],
  speed = 50, // Typing speed
  wordChangeDelay = 1500, // Delay between word changes
  dynamicWordColor = "#5577ff", // Color for the animated text
}) => {
  const [displayedText, setDisplayedText] = useState(""); // Current displayed text
  const [typingIndex, setTypingIndex] = useState(0); // Index for typing characters
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index for dynamic words
  const [isAdding, setIsAdding] = useState(true); // Indicates adding or deleting characters
  const [isPaused, setIsPaused] = useState(false); // Pause between animations

  useEffect(() => {
    if (isPaused) return;

    const typingEffect = () => {
      const currentWord = dynamicWords[currentWordIndex] || "";
      const fullSentence = currentWord
        ? `${baseText} ${currentWord}` // Ensure a space between baseText and dynamicWords
        : baseText;

      if (isAdding) {
        // Typing logic
        if (typingIndex < fullSentence.length) {
          setDisplayedText(fullSentence.slice(0, typingIndex + 1));
          setTypingIndex((prev) => prev + 1);
        } else {
          setIsPaused(true); // Pause after completing the sentence
          setTimeout(() => setIsPaused(false), wordChangeDelay);
          setIsAdding(false); // Start deleting
        }
      } else {
        // Deleting logic
        if (typingIndex > baseText.length) {
          setDisplayedText(fullSentence.slice(0, typingIndex - 1));
          setTypingIndex((prev) => prev - 1);
        } else {
          setIsPaused(true); // Pause before switching to the next word
          setTimeout(() => {
            setIsPaused(false);
            setIsAdding(true);
            setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length); // Move to next word
          }, wordChangeDelay);
        }
      }
    };

    const interval = setInterval(typingEffect, speed);

    return () => clearInterval(interval); // Cleanup interval
  }, [baseText, dynamicWords, typingIndex, isAdding, speed, wordChangeDelay, isPaused, currentWordIndex]);

  // Split the static and dynamic text for styling
  const currentWord = dynamicWords[currentWordIndex] || " ";
  const staticTextLength = baseText.length;
  const staticPart = displayedText.slice(0, staticTextLength);
  const dynamicPart = displayedText.slice(staticTextLength + 1); // Slicing after the non-breaking space

  return (
    <div className="typewriter text-2xl font-medium flex justify-start items-start text-start leading-tight text-white/85 mt-5">
      <h2>{staticPart}</h2>
      <p className="text-start">
      {dynamicPart && (
        <span style={{ color: dynamicWordColor }} className="ml-2 font-bold">{" "}{dynamicPart}</span>
      )}
      <span className="cursor text-purple">_</span>
      </p>
    </div>
  );
};

export default Typewriter;
