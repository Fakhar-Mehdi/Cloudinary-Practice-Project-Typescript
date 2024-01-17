export const resetForm = (res: any, setFormData: any, fileInputRef: any) => {
  if (res.status === 200) {
    setFormData({
      name: "",
      email: "",
      age: "",
      profilePicture: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};

export const getResponse = async (res: any, event: any) => {
  return {
    code: res.status,
    message:
      res.status === 200
        ? `Thanks ${event.target?.name.value} for signing up`
        : `${await res.text()}`,
  };
};

export const getBody = (event: any, formData: any) => {
  const body: any = new FormData();
  body.append("name", event.target?.name.value);
  body.append("email", event.target?.email.value);
  body.append("age", event.target?.age.value);
  body.append("profilePicture", formData.profilePicture);
  return body;
};
