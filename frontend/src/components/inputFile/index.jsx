import React from "react";

const InputFile = () => {
  return (
    <div>
      <label className="block mb-2 text-sm" htmlFor="file_input">
        Upload Thumbnail Blog
      </label>
      <input className="border-2 rounded-md p-1 text-sm" id="file_input" type="file" />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        JPG, JPEG or PNG (MAX. 800x400px).
      </p>
    </div>
  );
};

export default InputFile;
