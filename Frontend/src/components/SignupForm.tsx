import React, { useState, ChangeEvent, useRef } from "react";
import { getBody, getResponse, resetForm } from "../helper";

interface SignUpFormState {
  name: string;
  email: string;
  age: string;
  profilePicture: any;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormState>({
    name: "",
    email: "",
    age: "",
    profilePicture: null,
  });
  const [response, setResponse] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: event.target.files?.[0] as any,
    }));
  };

  const HandleSubmit = async (event: any) => {
    event.preventDefault();
    const body = getBody(event, formData);
    let res: any = await fetch("http://localhost:3001/saveCredentials", {
      method: "POST",
      body,
    });
    const responseData = await getResponse(res, event);
    setResponse(responseData);
    resetForm(res, setFormData, fileInputRef);
  };

  return (
    <div>
      <form className="signup-form" onSubmit={HandleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            required
          />
        </div>

        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p
        style={{
          marginLeft: "50px",
          marginRight: "20px",
          color: response?.code === 200 ? "green" : "red",
        }}
      >
        {response?.message || ""}
      </p>
    </div>
  );
};

export default SignUpForm;
