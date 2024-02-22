const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const authmiddleware = require('./middleware/authMiddleware');
const authutils = require('./middleware/authUtils');


const app = express();
app.use(bodyParser.json());


const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'Alan', password: '123' },
    { id: 3, username: 'Jose', password: '123' }
    // Agrega más usuarios si es necesario
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);//Aqui basicamente llamamos al arreglo que 
    //encuentre alguno de los usuarios que tenemos en el arreglo
    if (user) {
        const token = authutils.generateToken({ id: user.id, username: user.username });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});


// app.post('/login',(req,res)=>{
//     const username = req.body.username;
//     const password = req.body.password;
//     if(username === 'admin' && password === 'admin'){
//         const token = authutils.generateToken({id: 1, username: username});
//         res.json({token});
//     }else{
//         res.json(401).json({error: "Unauthorized"});
//     }
// });


app.use(authmiddleware);


app.use('/products',productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutado ${PORT}`);
})

