import { Request, Response } from "express"
import User from "../models/user"

//getCurrentUser 
//  tìm kiếm user đang có trong csdl hay chưa bằng userid với _id tương ứng
//  output: user not found hoặc trả về file json currentUser
//createCurrentUser
//  lấy thông tin người dùng bằng auth0Id 
//  kiểm tra tồn tại người dùng trong csdl với auth0Id
//  output: nếu true trả về trạng thái 200, nếu ! tạo người dùng mới từ req.body và lưu nó vào csdl
//updateCurrentUser
//  name, addressLine1, country, city
//  cập nhật thông tin mới cho user
