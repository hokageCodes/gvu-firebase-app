import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { BiBell } from 'react-icons/bi'; // Import the notifications icon
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const AdminHeader = () => {
  const { currentUser, adminName, adminEmail, adminPhotoURL } = useAuth(); // Updated to include adminPhotoURL
  const [greeting, setGreeting] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [messagesDropdownOpen, setMessagesDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const messagesSnapshot = await getDocs(collection(db, 'messages'));
      const messagesData = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter out unread messages
      const unreadMessages = messagesData.filter(message => !message.read);

      setMessages(unreadMessages);

      // Update unread count
      setUnreadCount(unreadMessages.length);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (messageId) => {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: true });

      // Update unread count
      setUnreadCount(prevCount => Math.max(prevCount - 1, 0));

      // Remove message from dropdown
      removeMessageFromDropdown(messageId);

      // Refresh messages
      fetchMessages();
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const removeMessageFromDropdown = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleMessagesDropdown = () => {
    setMessagesDropdownOpen(!messagesDropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = '/admin-login';
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <header className="bg-[#fff] text-[#01553d] flex justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold">{greeting}, {adminName || 'Admin'}</h1>
      </div>
      <div className="flex items-center">
        <div className="ml-4 flex items-center">
          <button className="focus:outline-none" onClick={toggleMessagesDropdown}>
            {/* Notifications icon */}
            <BiBell style={{ fontSize: '24px' }} />
            {unreadCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">{unreadCount}</span>}
          </button>
          {messagesDropdownOpen && (
            <div className="absolute right-0 mt-12 w-80 bg-white border border-gray-300 rounded shadow-md">
              <ul>
                {messages.length > 0 ? (
                  messages.map(message => (
                    <li key={message.id} className="px-4 py-3 border-b hover:bg-gray-100">
                      <p className="font-bold">{message.fullName}</p>
                      <p className="text-gray-700">{message.message.substring(0, 50)}...</p>
                      <p className="text-gray-500 text-xs">{new Date(message.createdAt.seconds * 1000).toLocaleString()}</p>
                      {!message.read && (
                        <button
                          className="text-xs text-blue-500 hover:underline focus:outline-none"
                          onClick={() => markAsRead(message.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-center text-gray-500">No messages yet</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="relative flex items-center gap-4" ref={menuRef}>
          <div className="flex items-center cursor-pointer" onClick={toggleProfileMenu}>
            <img 
              src={adminPhotoURL || 'https://via.placeholder.com/39'} // Updated to use adminPhotoURL
              alt="admin" 
              className="rounded-full border-2 border-gray-300 h-8 w-8 sm:h-10 sm:w-10 object-cover" 
            />
            <IoIosArrowDown className="ml-2" />
          </div>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-56 w-48 rounded-md shadow-lg bg-white py-1 z-50">
              <div className="px-4 py-2">
                <p className="text-sm sm:text-base font-semibold text-[#01553d]">{adminName}</p>
                <p className="text-xs sm:text-sm text-gray-500">{adminEmail}</p>
              </div>
              <hr />
              <a href="/admin-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <button 
                onClick={handleLogout} 
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
              
export default AdminHeader;

