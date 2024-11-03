"use client";
import { useState } from "react";
import axios from "axios";
import PushToMintCollectionButton from "@/components/Button/PushToMintCollectionButton";
import Image from "next/image";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";

interface ContentFile {
  url: string;
  name: string;
  type: string;
}

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  recipientAddress: string;
  currency: string;
  type: string;
  benefits: string;
  content: ContentFile[];
  enableCreditCard: boolean;
  verifyIdentity: boolean;
  limitQuantity: boolean;
}

const CreateCollectiblePage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    recipientAddress: "",
    currency: "usdc", // Default to USDC
    type: "Collectible", // Default type
    benefits: "", // Benefits input
    content: [], // Content array for multiple files
    enableCreditCard: false,
    verifyIdentity: false,
    limitQuantity: false,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        setImageUploading(true);
        const uploadedUrl = await sendCloudinaryImage(base64Image);
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: uploadedUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setImageUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle multiple file selection and upload to Cloudinary
  const handleContentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setContentUploading(true);
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const reader = new FileReader();
        return new Promise<ContentFile | null>((resolve) => {
          reader.onloadend = async () => {
            const base64File = reader.result as string;
            try {
              const uploadedUrl = await sendCloudinaryImage(base64File);
              resolve({ url: uploadedUrl, name: file.name, type: file.type });
            } catch (error) {
              console.error("Error uploading file:", error);
              alert(`Failed to upload file: ${file.name}`);
              resolve(null); // Return null if failed to upload
            }
          };
          reader.readAsDataURL(file);
        });
      })
    );

    // Filter out any failed uploads (null values)
    const successfulUploads = uploadedFiles.filter(Boolean) as ContentFile[];

    setFormData((prevState) => ({
      ...prevState,
      content: [...prevState.content, ...successfulUploads],
    }));
    setContentUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const storedData = JSON.parse(localStorage.getItem("user-storage") || "{}");
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/nft/collectibles`,
        formData,
        config
      );

      if (response.data.state === "success") {
        alert("Collectible created successfully!");
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          price: "",
          recipientAddress: "",
          currency: "usdc",
          type: "Collectible",
          benefits: "",
          content: [],
          enableCreditCard: false,
          verifyIdentity: false,
          limitQuantity: false,
        });
      }          
    } catch (error) {
      console.error("Error creating collectible:", error);
      alert("Failed to create collectible");
    }
  };

  // Helper to get an icon based on file type
  const getFileTypeIcon = (type: string) => {
    if (type.startsWith("image")) return "🖼️"; // Image icon
    if (type.startsWith("audio")) return "🎵"; // Audio icon
    if (type.startsWith("video")) return "🎥"; // Video icon
    if (type === "application/pdf") return "📄"; // PDF icon
    return "📁"; // Generic file icon
  };

  return (
    <div className="main-container flex">
      {/* Left Column */}
      <div className="w-1/2 p-5">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Create Collectible</h2>
            <div>
              <label htmlFor="name" className="mb-1 block font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Give your digital good a name."
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Note: Your pass name can't be changed after creation</p>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="imageUrl" className="mb-1 block font-medium">Image (JPEG, JPG, PNG)</label>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {imageUploading && <p>Uploading image...</p>}
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block font-medium">Price</label>
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
              <p className="text-sm text-gray-500 mt-1">Note: Currency can't be changed after creation</p>
            </div>

            {/* Content Upload */}
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="text-lg font-medium text-black-600">Content</h3>
              <p className="text-sm text-gray-600">
                Add content to sell. You can upload images, audio, video, PDFs, or other digital files.
              </p>
              <input
                type="file"
                id="content"
                name="content"
                multiple
                accept="*/*"
                onChange={handleContentUpload}
                className="w-full border border-dashed border-gray-300 rounded-lg px-4 py-2 mt-2"
              />
              {contentUploading && <p>Uploading content...</p>}

              {/* Content Preview Grid */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.content.map((file, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-white border rounded shadow-sm w-full">
                    <div className="text-2xl">{getFileTypeIcon(file.type)}</div>
                    <p className="text-xs text-gray-600 mt-1 text-center truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {file.name}
                    </p>
                    </div>
                ))}
                </div>
            </div>

            {/* Benefits Input */}
            <div>
              <label htmlFor="benefits" className="mb-1 block font-medium">Benefits</label>
              <textarea
                id="benefits"
                name="benefits"
                placeholder="Enter each benefit on a new line"
                value={formData.benefits}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Enable Pay with Credit Card & Verify Identity */}
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
              <h3 className="text-md font-medium">Enable Pay with Credit Card</h3>
              <p className="text-sm text-gray-600 mb-2">Let fans buy this pass with a credit card</p>
              <input
                type="checkbox"
                id="enableCreditCard"
                name="enableCreditCard"
                checked={formData.enableCreditCard}
                onChange={handleChange}
              /> Enable

              <div className="mt-4">
                <h3 className="text-md font-medium">Verify Identity</h3>
                <p className="text-sm text-gray-600">Verify your identity to enable credit card payments. You only complete this process once.</p>
                <button
                  type="button"
                  onClick={() => alert("Verification triggered!")}
                  className="bg-black text-white px-4 py-2 rounded-lg mt-2"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Advanced Settings - Limit Quantity */}
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
              <h3 className="text-md font-medium">Advanced Settings</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-medium">Limit quantity</span>
                <input
                  type="checkbox"
                  id="limitQuantity"
                  name="limitQuantity"
                  checked={formData.limitQuantity}
                  onChange={handleChange}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Limit the number of times this digital good can be purchased
              </p>
            </div>

            {/* Agreement */}
            <div className="mt-4">
              <input type="checkbox" required /> I agree with swap Minting Privacy & Policy
            </div>

            <PushToMintCollectionButton onClick={handleSubmit} className="w-max mt-4">
              Create
            </PushToMintCollectionButton>
          </div>
        </div>
      </div>

      {/* Right Column (Preview) */}
      <div className="w-1/2 flex justify-center items-center p-5">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full max-w-md aspect-[3/4] flex flex-col items-start">
          {/* Display dynamic Image as a square */}
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-t-lg mb-4">
            {formData.imageUrl ? (
              <Image
                src={formData.imageUrl}
                width={300}
                height={300}
                alt="Preview"
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <p className="text-gray-500">No Image</p>
            )}
          </div>

          {/* Display Name with label */}
          <div className="mb-2">
            <p className="text-lg font-bold">Name</p>
            <p className="text-sm text-gray-500">{formData.name || "Name will appear here"}</p>
          </div>

          {/* Display Price with label */}
          <div className="mb-2">
            <p className="text-lg font-bold">Price</p>
            <p className="text-sm text-gray-500">{formData.price ? `$${formData.price}` : "Free"}</p>
          </div>

          {/* Display Description with label */}
          <div className="mb-2">
            <p className="text-lg font-bold">Description</p>
            <p className="text-sm text-gray-500">{formData.description || "Description will appear here"}</p>
          </div>

          {/* Dynamic Benefits Section with label */}
          <div className="mt-4 w-full">
            <p className="text-lg font-bold">Benefits</p>
            <ul className="list-disc list-inside text-sm text-gray-500">
              {formData.benefits
                ? formData.benefits.split("\n").map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))
                : <li>No benefits added</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectiblePage;
