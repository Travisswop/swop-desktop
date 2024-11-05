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
  benefits: string[];
  content: ContentFile[];
  enableCreditCard: boolean;
  verifyIdentity: boolean;
  limitQuantity: boolean;
  quantity?: number;
}

const CreateMembershipPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    recipientAddress: "",
    currency: "usdc",
    type: "Membership",
    benefits: [],
    content: [],
    enableCreditCard: false,
    verifyIdentity: false,
    limitQuantity: false,
    quantity: undefined,
  });

  const [newBenefit, setNewBenefit] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prevState) => ({
      ...prevState,
      quantity: isNaN(value) ? undefined : value,
    }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImageName(file.name);

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

  const handleContentUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
              resolve(null);
            }
          };
          reader.readAsDataURL(file);
        });
      })
    );

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/nft/memberships`,
        formData,
        config
      );

      if (response.data.state === "success") {
        alert("Membership created successfully!");
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          price: "",
          recipientAddress: "",
          currency: "usdc",
          type: "Membership",
          benefits: [],
          content: [],
          enableCreditCard: false,
          verifyIdentity: false,
          limitQuantity: false,
          quantity: undefined,
        });
        setSelectedImageName(null);
      }
    } catch (error) {
      console.error("Error creating membership:", error);
      alert("Failed to create membership");
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        benefits: [...prevState.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      benefits: prevState.benefits.filter((_, i) => i !== index),
    }));
  };

  const getFileTypeIcon = (type: string) => {
    if (type.startsWith("image")) return "🖼️";
    if (type.startsWith("audio")) return "🎵";
    if (type.startsWith("video")) return "🎥";
    if (type === "application/pdf") return "📄";
    return "📁";
  };

  return (
    <div className="main-container flex">
      <div className="w-1/2 p-5">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Create Membership</h2>

            <div>
              <label htmlFor="name" className="mb-1 block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Give your membership a name."
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Note: Your membership name can&#39;t be changed after creation
              </p>
            </div>

            <label htmlFor="imageUrl" className="mb-1 block font-medium">
              Image (JPEG, JPG, PNG)
            </label>
            <div className="bg-gray-100 p-4 rounded-lg border border-dashed border-gray-300 text-center">
              {formData.imageUrl ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={formData.imageUrl}
                    width={100}
                    height={100}
                    alt="Preview"
                    className="rounded-lg object-cover"
                  />
                  <p className="text-sm mt-2 text-gray-700">{selectedImageName}</p>
                  <label
                    htmlFor="imageUrl"
                    className="inline-block bg-black text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
                  >
                    Change Picture
                  </label>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center justify-center h-32 cursor-pointer">
                    <div className="text-6xl text-gray-400">📷</div>
                    <p className="text-gray-500">
                      Browse or drag and drop an image here.
                    </p>
                    <label
                      htmlFor="imageUrl"
                      className="inline-block bg-black text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
                    >
                      Browse
                    </label>
                  </div>
                </div>
              )}
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imageUploading && <p>Uploading image...</p>}
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block font-medium">
                Description
              </label>
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
              <label htmlFor="price" className="mb-1 block font-medium">
                Price
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
              <p className="text-sm text-gray-500 mt-1">
                Note: Currency can&#39;t be changed after creation
              </p>
            </div>

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

              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.content.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 bg-white border rounded shadow-sm w-full"
                  >
                    <div className="text-2xl">{getFileTypeIcon(file.type)}</div>
                    <p className="text-xs text-gray-600 mt-1 text-center truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="benefits" className="mb-1 block font-medium">
                Benefits
              </label>
              <input
                type="text"
                placeholder="Enter a benefit"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                + Add Benefit
              </button>
              <div className="flex flex-col gap-2 mt-2">
                {formData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
                  >
                    <span className="text-sm">{benefit}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-500 font-bold"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
              {formData.limitQuantity && (
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={formData.quantity || ""}
                  onChange={handleQuantityChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
                />
              )}
              <p className="text-sm text-gray-500 mt-1">
                Limit the number of times this digital good can be purchased
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
              <h3 className="text-md font-medium">Enable Pay with Credit Card</h3>
              <p className="text-sm text-gray-600 mb-2">Let users buy this membership with a credit card</p>
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

            <div className="mt-4">
              <input type="checkbox" required /> I agree with swop Minting Privacy & Policy
            </div>

            <PushToMintCollectionButton onClick={handleSubmit} className="w-max mt-4">
              Create
            </PushToMintCollectionButton>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center p-5">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full max-w-md aspect-[3/4] flex flex-col items-start">
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

          <div className="mb-2">
            <p className="text-lg font-bold">Name</p>
            <p className="text-sm text-gray-500">{formData.name || "Name will appear here"}</p>
          </div>

          <div className="mb-2">
            <p className="text-lg font-bold">Price</p>
            <p className="text-sm text-gray-500">{formData.price ? `$${formData.price}` : "Free"}</p>
          </div>

          <div className="mb-2">
            <p className="text-lg font-bold">Description</p>
            <p className="text-sm text-gray-500">{formData.description || "Description will appear here"}</p>
          </div>

          <div className="mt-4 w-full">
            <p className="text-lg font-bold">Benefits</p>
            <ul className="list-disc list-inside text-sm text-gray-500">
              {formData.benefits.length > 0
                ? formData.benefits.map((benefit, index) => (
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

export default CreateMembershipPage;
