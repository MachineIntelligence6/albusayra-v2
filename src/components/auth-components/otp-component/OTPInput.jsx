import React, { useRef } from "react";

const OTPInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Only take the last entered character
    setOtp(updatedOtp);

    // Move focus to the next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = ""; // Clear current input
      setOtp(updatedOtp);

      // Move focus to the previous input if it exists
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");

    const updatedOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < 6) {
        updatedOtp[i] = char;
      }
    });

    setOtp(updatedOtp);

    // Focus the last filled input
    const lastIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 mt-4">
      {otp.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={char}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-12 border rounded-md text-center text-lg"
        />
      ))}
    </div>
  );
};

export default OTPInput;
