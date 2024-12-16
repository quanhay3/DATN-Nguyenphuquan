import User from "../models/user.js";
import bcrypt from "bcrypt";
import xlsx from "xlsx";
import fs from "fs";
import Product from "../models/product.js";

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

export const readDataFromfile = async () => {
  const productCount = await Product.countDocuments();
  if (
    fs.existsSync(
      "C:/Users/hoadn/OneDrive/Desktop/workplace/powder automate/shopee.xlsx"
    ) &&
    productCount === 0
  ) {
    // Đọc file Excel
    const workbook = xlsx.readFile(
      "C:/Users/hoadn/OneDrive/Desktop/workplace/powder automate/shopee.xlsx"
    );
    const sheet_name_list = workbook.SheetNames;

    // Chọn sheet đầu tiên
    const sheet = workbook.Sheets[sheet_name_list[0]];

    // Chuyển sheet thành dạng JSON (bỏ qua dòng tiêu đề)
    const products = xlsx.utils.sheet_to_json(sheet, { header: 1 }).slice(1); // Bỏ qua dòng tiêu đề

    // Hàm tạo dữ liệu sản phẩm
    const generateProductData = (url, name, price) => {
      // Xử lý giá trị price để loại bỏ dấu chấm và ký tự "₫"

      const priceWithoutDotsAndCurrency = parseFloat(
        typeof price == "string"
          ? price.replace(/\./g, "").replace(" ₫", "")
          : `${price}`.replace(/\./g, "")
      );

      // Math.random để tạo giá trị ngẫu nhiên cho discount và quantity
      const discount = Math.floor(Math.random() * (80 - 20 + 1)) + 20; // Random discount từ 20 đến 80
      const quantity = Math.floor(Math.random() * (200 - 1 + 1)) + 1; // Random quantity từ 1 đến 200

      return {
        image: url,
        name: name,
        price: priceWithoutDotsAndCurrency,
        discount: discount,
        description: `Đây là ${name}`, // Tạo description
        quantity: quantity,
        status: "SALE",
        category: "Shopify",
      };
    };

    // Tạo dữ liệu sản phẩm từ danh sách các sản phẩm trong file Excel
    const datas = products.map(([url, name, price]) =>
      generateProductData(url, name, price)
    );

    datas.map(async (item) => await Product.create(item));
  }
};
