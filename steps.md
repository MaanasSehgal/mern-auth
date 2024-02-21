# CLIENT SIDE PACKAGES:

npm i react-router-dom axios react-hot-toast

# SERVER SIDE PACKAGES:

npm i express dotenv cors mongoose bcrypt jsonwebtoken cookie-parser

# MAIN.JSX

In package.json in script: `"start": "nodemon index.js"`

cors is used to connect frontend port 5173 with backend host 8000

## MAIN

Wrap the app in router

```js
<Router>
    <App />
</Router>
```

```js
<form onSubmit={registerUser}>
    <label>Name</label>
    <input type="text" placeholder="Enter your name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />

    <label>Email</label>
    <input type="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />

    <label>Name</label>
    <input type="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />

    <button type="submit">Register</button>
</form>
```

# APP.JSX

for login and signup, we first setup routes, then we setup:

```js
const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
});

<Navbar />
    <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>

<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
</Routes>
```

# NAVBAR.JSX

```js
<nav>
    <Link to="/">Home</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
</nav>
```

# FLOW

Index.js => authRoutes.js (routes) => authControllers

# AXIOS IN APP.JSX

```js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
```

# HASH AND COMPARE PASSWORD BY BCRYPT

/helpers/auth.js

```js
const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword,
};
```
