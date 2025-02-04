import React, { useState } from "react";

const ImageUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image before submitting!");
      return;
    }
    console.log("Form Data:", {
      name: formData.name,
      email: formData.email,
      image: formData.image ? formData.image.name : "No image uploaded",
    });
    alert("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px", margin: "0 auto" }}>
      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "block", width: "100%" }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageUploadForm;
