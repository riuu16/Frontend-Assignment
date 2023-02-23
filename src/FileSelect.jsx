import React, { useState } from "react";

const FileSelect = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [gender, setGender] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Selected file: ${selectedFile.name}`);
    console.log(`Selected gender: ${gender}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" onChange={handleFileSelect} />
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        <input type="file" name="movie" accept="video/*"></input>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      </div>
      <div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onChange={handleGenderChange}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={handleGenderChange}
        />
        <label htmlFor="female">Female</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileSelect;
