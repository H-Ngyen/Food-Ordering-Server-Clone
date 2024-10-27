import { Request, Response } from "express"
import User from "../models/user"

//getCurrentUser 
//  tìm kiếm user đang có trong csdl hay chưa bằng userid với _id tương ứng
//  output: user not found hoặc trả về file json currentUser
//createCurrentUser
//  lấy auth0Id 
//  kiểm tra tồn tại người dùng trong csdl với auth0Id
//  output: nếu true trả về trạng thái 200, nếu ! tạo người dùng mới từ req.body và lưu nó vào csdl
//updateCurrentUser
//  name, addressLine1, country, city
//  cập nhật thông tin mới cho user

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });

        if (!currentUser)
            return res.send(404).json({ message: "User not found" });
        
        res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.send(500).json("Something went wrong")
    }
}

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const currentUser = await User.findOne({ auth0Id });

        if (currentUser)
            return res.status(200).send();

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        return res.send(500).json("Create user failed");
    }
}

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { userId, name, addressLine1, country, city } = req.body;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();
        
        res.send(user);
    } catch (error) {
        console.log(error);
        return res.send(500).json("Update user failed");
    }
}

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser
}