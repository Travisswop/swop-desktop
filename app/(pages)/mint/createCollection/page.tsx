"use client";
import { useState } from "react";
import axios from "axios";
import PushToMintCollectionButton from "@/components/Button/PushToMintCollectionButton";
import Image from "next/image";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";

const CreateCollectionPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    recipientAddress: "",
    currency: "sol", // Default to Solana
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
            imageUrl: imageUrl,
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

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/nft/collections`,
        formData,
        config
      );

      if (response.data.state === "success") {
        alert("Collection created successfully!");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      alert("Failed to create collection");
    }
  };

  return (
    <div className="main-container">
      <div className="bg-white">
        <div className="w-1/2 mx-auto flex flex-col gap-4 py-5">
          <h2 className="text-2xl font-bold">Create New Collection</h2>

          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Collection Name"
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
              placeholder="Collection Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="mb-1 block font-medium">
              Image URL:
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {imageUploading && <p>Uploading image...</p>}
            {/* Display image preview if uploaded successfully */}
            {formData.imageUrl && (
              <div className="mt-4">
                <Image
                  src={formData.imageUrl}
                  width={300}
                  height={300}
                  alt="Preview"
                  className="w-64 h-64 object-cover border border-gray-300 rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = "none")} // Hide if invalid image
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block font-medium">
              Price in USD:
            </label>
            <input
              type="text"
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
            <label
              htmlFor="recipientAddress"
              className="mb-1 block font-medium"
            >
              Recipient&apos;s Solana Address:
            </label>
            <input
              type="text"
              id="recipientAddress"
              name="recipientAddress"
              placeholder="Recipient Address"
              value={formData.recipientAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="currency" className="mb-1 block font-medium">
              Currency:
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="sol">Solana (SOL)</option>
              {/* Add other options if needed */}
            </select>
          </div>

          <PushToMintCollectionButton onClick={handleSubmit} className="w-max">
            Create Collection
          </PushToMintCollectionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionPage;
