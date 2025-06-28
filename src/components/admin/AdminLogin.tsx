// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     console.log("Logging in with", username, password);

//     const res = await fetch('https://znujbwmnpanlhwxgwlhm.supabase.co/functions/v1/verify-host', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     });

//     const result = await res.json();

//     if (result.success) {
//       localStorage.setItem('isHostLoggedIn', 'true');
//       navigate('/admin'); // redirect to AdminDashboard after login
//     } else {
//       setLoginError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-blue-600 mb-2">EzyRide</h1>
//           <p className="text-gray-600">Welcome HOST</p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('https://znujbwmnpanlhwxgwlhm.supabase.co/functions/v1/verify-host', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (result.success) {
      const now = Date.now();
      localStorage.setItem('isHostLoggedIn', 'true');
      localStorage.setItem('hostLoginTime', now.toString());
      localStorage.setItem('lastActivityTime', now.toString());
      navigate('/admin');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-start items-center pt-10 px-4">
      {/* Logo */}
      <div className="mb-20">
        <img
          src="EzyRide-removebg-preview.png"
          alt="EzyRide Logo"
          className="w-40 md:w-60 h-auto mx-auto"
        />
      </div>
     

      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-gray-600 font-bold text-lg">Welcome HOST</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
