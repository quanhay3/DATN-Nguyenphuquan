import User from "../models/user.js";
import bcrypt from "bcrypt";
import xlsx from "xlsx";
import fs from "fs";
import Product from "../models/product.js";
import Category from "../models/category.js";
import product from "../models/product.js";

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
    fs.existsSync("D:/Download/lazada_sale_items (1).xlsx") &&
    productCount === 0
  ) {
    // Đọc file Excel
    const workbook = xlsx.readFile("D:/Download/lazada_sale_items (1).xlsx");
    const sheet_name_list = workbook.SheetNames;

    // Chọn sheet đầu tiên
    const sheet = workbook.Sheets[sheet_name_list[0]];

    // Chuyển sheet thành dạng JSON (bỏ qua dòng tiêu đề)
    const products = xlsx.utils.sheet_to_json(sheet, { header: 1 }).slice(1); // Bỏ qua dòng tiêu đề

    const categories = await Category.find(); // Lấy danh sách category từ DB
    if (!categories.length) {
      console.error("No categories found in the database.");
      return;
    }

    // Hàm tạo dữ liệu sản phẩm
    const generateProductData = (url, name, price, categoryId) => {
      // Xử lý giá trị price để loại bỏ dấu chấm và ký tự "₫"

      const priceWithoutDotsAndCurrency = parseFloat(
        typeof price == "string"
          ? price.replace(/\./g, "").replace(/\,/g, "").replace("₫", "")
          : `${price}`.replace(/\./g, "").replace(/\,/g, "")
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
        categoryId: categoryId,
      };
    };

    const datas = products.map(([name, price, _, url]) => {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      return generateProductData(url, name, price, randomCategory._id);
    });

    for (const data of datas) {
      const product = await Product.create(data);

      // Gắn id sản phẩm vào danh mục
      await Category.findByIdAndUpdate(
        product.categoryId,
        { $push: { products: product._id } },
        { new: true }
      );
    }

    console.log("Products and categories linked successfully.");
  }
};

export const deletePrd = async () => {
  try {
    const result = await Product.deleteMany({ type: "Lazada" });
    console.log(
      `${result.deletedCount} products with type "Lazda" have been deleted.`
    );
  } catch (error) {
    console.error("Error deleting products:", error);
  }
};

export const createCategory = async () => {
  const categoriesCount = await Category.countDocuments();
  if (categoriesCount > 0) {
    return;
  }
  const categories = [
    { name: "Electronics", products: [] },
    { name: "Clothing", products: [] },
    { name: "Home & Garden", products: [] },
    { name: "Sports & Outdoors", products: [] },
    { name: "Books & Audible", products: [] },
    { name: "Toys & Games", products: [] },
    { name: "Health & Beauty", products: [] },
    { name: "Gifts & Watches", products: [] },
    { name: "Pet Supplies", products: [] },
    { name: "Travel & Luggage", products: [] },
    { name: "Business & Industrial", products: [] },
    { name: "Music & Audio", products: [] },
    { name: "Pet Care & Accessories", products: [] },
    { name: "Services & Professional", products: [] },
    { name: "Automotive & Motorcycle", products: [] },
    { name: "Office Supplies", products: [] },
    { name: "Miscellaneous", products: [] },
  ];

  categories.map(async (item) => await Category.create(item));
};

export const cleanCategoryProducts = async () => {
  try {
    const categories = await Category.find().populate("products");

    for (const category of categories) {
      const validProducts = category.products.filter(
        (product) => product !== null
      );

      if (validProducts.length !== category.products.length) {
        // Cập nhật lại danh sách sản phẩm trong category
        category.products = validProducts.map((product) => product._id);
        await category.save();
        console.log(`Updated category: ${category.name}`);
      }
    }

    console.log("Category cleaning completed.");
  } catch (error) {
    console.error("Error cleaning category products:", error);
  }
};
