import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const { currentUser, adminName } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesDropdownOpen, setMessagesDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMessagesDropdown = () => {
    setMessagesDropdownOpen(!messagesDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
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

  return (
    <header className="px-4 py-2 shadow bg-white w-full md:w-auto md:flex-shrink-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">Welcome, {adminName || 'Admin'}</h1>
          <p className="text-gray-600">{greeting}</p>
        </div>

        <div className="relative flex items-center">
          <button
            className="relative"
            onClick={toggleMessagesDropdown}
          >
            <FaEnvelope className="text-xl" />
            {unreadCount > 0 && (
              <span className="ml-2 text-sm bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2">
                {unreadCount}
              </span>
            )}
          </button>

          {messagesDropdownOpen && (
            <div
              className="text-sm text-left absolute top-12 right-0 mt-1 bg-white rounded border border-gray-400 shadow max-h-64 overflow-y-auto w-80 z-10"
            >
              <ul>
                {messages.length > 0 ? (
                  messages.map(message => (
                    <li key={message.id} className="px-4 py-3 border-b hover:bg-gray-200">
                      <Link to={`/messages`} className="block">
                        <p className="font-bold">{message.fullName}</p>
                        <p className="text-gray-700">{message.message.substring(0, 50)}...</p>
                        <p className="text-gray-500 text-xs">{new Date(message.createdAt.seconds * 1000).toLocaleString()}</p>
                      </Link>
                      {!message.read && (
                        <button
                          className="text-xs text-blue-500 hover:underline focus:outline-none mr-2"
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

          <button
            data-dropdown
            className="flex items-center px-3 py-2 ml-4 focus:outline-none hover:bg-gray-200 hover:rounded-md"
            type="button"
            onClick={toggleDropdown}
          >
            <img
              src={currentUser ? currentUser.photoURL : 'https://via.placeholder.com/100'}
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-4 text-sm hidden md:inline-block">{adminName || 'Jessica Smith'}</span>
            <svg className="fill-current w-3 ml-4" viewBox="0 0 407.437 407.437">
              <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z" />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              data-dropdown-items
              className="text-sm text-left absolute top-12 right-0 mt-1 bg-white rounded border border-gray-400 shadow"
            >
              <ul>
                <li className="px-4 py-3 hover:bg-gray-200">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
