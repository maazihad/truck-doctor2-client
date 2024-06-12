/***
 * step-1 : 
 * app.post('/jwt', async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2h',
  });
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maaAge: 60 * 60 * 24 * 7 * 1000, // 1 week
    })
    .send({ success: true });
});
 * 
 * step-2: 
 * app.use(
  //auth step-2 (step 3 ক্লায়েন্ট সাইটে)
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);
 * step-3 : 
useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // auth step-4
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      // ‍auth step-4
      if (currentUser) {
        axios
          .post('http://localhost:5001/jwt', loggedUser, {
            withCredentials: true,
          })
          .then((response) => {
            console.log('token response', response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
        // auth step-6 (step 7 সার্ভার সাইটে cookie parser install করতে হবে )
      } else {
        axios
          .post('http://localhost:5001/logout', loggedUser, {
            withCredentials: true,
          })
          .then((response) => {
            console.log('token response from logout', response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
    return () => {
      return unSubscribe();
    };
  }, [user?.email]);
 * 
 *  step-5
    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log('from logout', user);
      res.clearCookie('token', { maxAge: 0 }).send({ success: true });
    });
 * 
 * auth step-7 
app.use(cookieParser());
 * 
  step-8
 *   const url = `http://localhost:5001/bookings?email=${user?.email}`;
  useEffect(() => {
    axios // auth step - 8
      .get(url, { withCredentials: true }) // যদি fetch দিয়ে করলে {credetials: include} দিতে হবে
      .then((data) => setBookings(data.data))
      .catch((err) => console.log(err.message));
  }, [url]);
 * 
 * 
 * auth step-9
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  // console.log('token in the middleware ::', token);

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized Access' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized Access.' });
    }
    // console.log('token is decoded by verify', decoded);
    req.user = decoded;
    next();
  });
};
 * 
  step-10
 * app.get('/bookings', logger, verifyToken, async (req, res) => {
      // auth step - 11
      console.log('User info : ', req.query?.email);
      console.log('Token owner info : ', req.user);
      // console.log('Token is ', req.cookies.token);
      // console.log('Cookie is ', req.cookies);
      // auth step - 11.5
      if (req?.user?.email !== req?.query?.email) {
        return res.status(403).send({ message: 'Forbidden Access' });
      }

      let query = {};
      if (req.query?.email) {
        query = { email: req.query?.email };
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });
 * 
 * 
 * 
 */
