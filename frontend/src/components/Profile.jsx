import React, { useState } from 'react';
import { LabelInput } from './Signup';
import axios from 'axios'; 

const Profile = () => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.put('http://localhost:3000/api/v1/user/update',{
      name,profilePicture
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
           "Authorization" : localStorage.getItem("token")
        },
      });
     if(response.status){
        alert("Profile Updated Successfully.")
     }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className='flex justify-center items-center content-center my-32'>
      <form className='p-4 flex flex-col items-center justify-center shadow-lg' onSubmit={handleSubmit}>
        <span className='text-2xl font-extralight'> Update Profile  </span>
        <div className='w-full my-4'>
          <LabelInput type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
       <div className='flex gap-5 items-center'>
       <input type='file' className='bg-slate-100 rounded-md p-3 mt-2 mb-6' onChange={handleImageChange} />
       {previewImage && <img src={previewImage} alt="Preview" className="w-16 h-16 ml-4 rounded-full" />}
       </div>
        <button type='submit' className='px-32 rounded-md bg-black text-white py-2'>Submit</button>
      </form>
    </div>
  );
};

export default Profile;
