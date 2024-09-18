const Users= require('../models/UserModel');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
phoneFormat=/^[6-9]\d{9}$/;
emailFormat=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
userNameFormat=/^[a-zA-Z0-9]{1,30}$/;
passwordFormat=/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;


const signUpUser = async (req, res)=>{
    //business logic
    const {name, phone, email, username, password } = req.body;

    //Validations
    if(name?.length < 2 || name?.length > 50){
        res.status(400).json({error: "name should have atleast 2 characters and max 50 characters"})
        return;
    }
    if(!phoneFormat.test(phone)){
        res.status(400).json({error: "Phone number should have atleast 10 digits and start above 6..."})
        return;
    }
    if(!emailFormat.test(email)){
        res.status(400).json({error: "Invalid Email address"})
        return;
    }
    if(!userNameFormat.test(username)){
        res.status(400).json({error: "Invalid username"})
        return;
    }
    if(!passwordFormat.test(password)){
        res.status(400).json({error: "Invalid Password, should have atleast 1 capital letter and 1 symbol"})
        return;
    }
    //Saving the data in Cluster
    try {
        //removing duplicates
        const userByUsername= await Users.findOne({username: username})
        if(userByUsername){
            res.status(400).json({error: "Username already exists in the system"})
            return;
        }
        const userByEmail= await Users.findOne({email: email})
        if(userByEmail){
            res.status(400).json({error: "Email already exists in the system"})
            return;
        }
        const userByPhone= await Users.findOne({phone: phone})
        if(userByPhone){
            res.status(400).json({error: "Phone number already exists in the system"})
            return;
        }


       const user = await Users.create({name, phone, email, username, password : bcrypt.hashSync(password, salt)});
       res.status(201).json(user);
    } catch (error) {
        res.status(401).json({error: "User could not be created"});
    }

    res.end('signup done on JDPI');
}

const loginUser = async (req,res)=>{
    console.log(req.body)
    const {username, password} = req.body
    try{
        const userDoc = await Users.findOne({username: username})
        if(!userDoc){
            res.status(400).json({error : "Please enter correct username and password"})
            return;
        }
        const isValidPwd = bcrypt.compareSync(password, userDoc.password);
        if(!isValidPwd){
            res.status(400).json({error: "Please enter correct username and password"})
            return;
        }
        const token = jwt.sign({ id: userDoc.id}, process.env.JWT_SECRET, {expiresIn: '5h'});
        console.log(token);
        res.cookie('token', token, {httpOnly: true, samesite: 'none', secure: true})
        .status(200)
        .json({
            message: "login successful", 
            userInfo:{
                id: userDoc._id,
                name: userDoc.name,
                phone: userDoc.phone,
                email: userDoc.email,
                username : userDoc.username
                }});
    }
    catch (e) {

    }
    res.end();
}

const getProfileInfoByCookie = async(req, res) =>{
    const {token} = req.cookies;
    if(!token){
        res.status(401).end();
        return;
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userDoc = await Users.findOne({_id: decodedToken.id});
        res.status(200).json({
            userInfo:{
                id: userDoc._id,
                name: userDoc.name,
                phone: userDoc.phone,
                email: userDoc.email,
                username : userDoc.username
            }
        });
    }
    catch(err){
        res.status(401).end();
    }
}


module.exports = {signUpUser, loginUser, getProfileInfoByCookie}