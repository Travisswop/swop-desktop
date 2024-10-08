"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PushToMintCollectionButton from "@/components/Button/PushToMintCollectionButton";
import Image from "next/image";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";

const CreateTemplatePage = () => {
  const [formData, setFormData] = useState({
    collectionId: "",
    name: "",
    description: "",
    image: "",
    symbol: "",
    price: "",
    supplyLimit: "",
    expiry: "",
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // UseEffect to load collectionId from local storage
  useEffect(() => {
    const collectionId = localStorage.getItem(
      "swop_desktop_collectionId_for_createTemplate"
    );
    if (collectionId) {
      setFormData((prevState) => ({
        ...prevState,
        collectionId, // Populate the collectionId from local storage
      }));
    }
  }, []); // Empty dependency array to run only once after the component mounts

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Convert `supplyLimit` and `price` to numbers, if they are the target fields
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "supplyLimit" || name === "price" ? Number(value) : value, // Convert to number for those fields
    }));
  };

  // Handle file selection and upload to Cloudinary
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        try {
          setImageUploading(true);
          const imageUrl = await sendCloudinaryImage(base64Image);
          setFormData((prevState) => ({
            ...prevState,
            image: imageUrl,
          }));
          setImageUploading(false);
        } catch (error) {
          console.error("Error uploading image:", error);
          setImageUploading(false);
          alert("Failed to upload image. Please try again.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const storedData = JSON.parse(
        localStorage.getItem("user-storage") || "{}"
      );
      const accessToken = storedData?.state?.state?.user?.accessToken;

      if (!accessToken) {
        alert("Access token not found. Please log in again.");
        return;
      }

      // Explicitly convert supplyLimit and price to numbers before submitting
      const finalData = {
        ...formData,
        supplyLimit: Number(formData.supplyLimit), // Ensure it's a number
        price: Number(formData.price), // Ensure it's a number
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/nft/template`,
        finalData, // Send the finalData with converted numbers
        config
      );

      if (response.data.state === "success") {
        alert("NFT Template created successfully!");
      }
    } catch (error) {
      console.error("Error creating template:", error);
      alert("Failed to create template");
    }
  };

  return (
    <div className="main-container">
      <div className="bg-white">
        <div className="w-1/2 mx-auto flex flex-col gap-4 py-5">
          <h2 className="text-2xl font-bold">Create New NFT Template</h2>

          <div>
            <label htmlFor="collectionId" className="mb-1 block font-medium">
              Collection ID:
            </label>
            <input
              type="text"
              id="collectionId"
              name="collectionId"
              placeholder="Collection ID"
              value={formData.collectionId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              disabled // Disable manual input
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Template Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block font-medium">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Template Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="mb-1 block font-medium">
              Image Upload:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {imageUploading && <p>Uploading image...</p>}
            {/* Conditional rendering of the image preview */}
            {formData.image && (
              <div className="mt-4">
                <Image
                  src={formData.image}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="w-64 h-64 object-cover border border-gray-300 rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = "none")} // Hide if invalid image
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="symbol" className="mb-1 block font-medium">
              Symbol:
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              placeholder="Symbol (e.g. DNC)"
              value={formData.symbol}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block font-medium">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="supplyLimit" className="mb-1 block font-medium">
              Supply Limit:
            </label>
            <input
              type="number"
              id="supplyLimit"
              name="supplyLimit"
              placeholder="Supply Limit"
              value={formData.supplyLimit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="expiry" className="mb-1 block font-medium">
              Expiry (DD/MM/YYYY):
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="Expiry Date (e.g. 15/12/2028)"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <PushToMintCollectionButton onClick={handleSubmit} className="w-max">
            Create Template
          </PushToMintCollectionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
