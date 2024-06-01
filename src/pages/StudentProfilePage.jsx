import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { updatePassword } from "firebase/auth";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f0f2f5;
  border-radius: 10px;
  max-width: 600px;
  margin: auto;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const EditIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

const StudentProfilePage = () => {
  const { currentUser } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState({ fullName: false, email: false, matricNumber: false, phoneNumber: false, password: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(userData.fullName);
          setEmail(userData.email);
          setMatricNumber(userData.matricNumber);
          setPhoneNumber(userData.phoneNumber);
          setProfileImageUrl(userData.profileImage || "default-profile.png");
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      let profileImageUrlToUpdate = profileImageUrl;
      if (profileImage) {
        const storageRef = ref(storage, `profile-images/${currentUser.uid}/${profileImage.name}`);
        await uploadBytes(storageRef, profileImage);
        profileImageUrlToUpdate = await getDownloadURL(storageRef);
      }
  
      const userDataRef = doc(db, "users", currentUser.uid);
      const userDataSnapshot = await getDoc(userDataRef);
      const userData = userDataSnapshot.data();
  
      const updatedUserData = {
        profileImage: profileImageUrlToUpdate,
        fullName,
        email,
        matricNumber,
        phoneNumber,
        password: newPassword ? newPassword : null, // Update password if new password provided, otherwise nullify
      };
  
      await updateDoc(userDataRef, updatedUserData);
  
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
        setPassword(newPassword); // Update the password state
        setNewPassword(""); // Clear the new password field
      }
  
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile. " + error.message);
    }
  };
  

  const handleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <ProfileContainer>
      <h1>My Profile</h1>
      <ProfileImage src={profileImageUrl} alt="Profile" />
      <input type="file" onChange={handleImageChange} />
      <Form onSubmit={handleProfileUpdate}>
        <InputGroup>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            readOnly={!editing.fullName}
          />
          <EditIcon icon={faEdit} onClick={() => handleEdit("fullName")} />
        </InputGroup>
        <InputGroup>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!editing.email}
          />
          <EditIcon icon={faEdit} onClick={() => handleEdit("email")} />
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            readOnly={!editing.matricNumber}
          />
          <EditIcon icon={faEdit} onClick={() => handleEdit("matricNumber")} />
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            readOnly={!editing.phoneNumber}
          />
          <EditIcon icon={faEdit} onClick={() => handleEdit("phoneNumber")} />
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            readOnly={!editing.password}
          />
          <EditIcon icon={faEdit} onClick={() => handleEdit("password")} />
        </InputGroup>
        <Button type="submit">Update Profile</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
    </ProfileContainer>
  );
};

export default StudentProfilePage;
