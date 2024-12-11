import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const initData = async () => {
  try {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // Mã hóa mật khẩu nếu cần

      await User.create({
        userName: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};
