const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");

// ✅ Configure cloudinary only once at top level
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// ✅ Upload Function
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    // 📤 Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath);

    // 🧹 Delete the local file after upload
    fs.unlinkSync(filePath);

    // ✅ Return secure URL
    return uploadResult.secure_url;

  } catch (error) {
    // 🧹 Clean up on error too
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("❌ Cloudinary Upload Error:", error);
    return null;
  }
};

// ✅ Export the function
module.exports = uploadOnCloudinary;
