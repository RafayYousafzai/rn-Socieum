import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Platform } from "react-native";

export default function Component() {
  if (Platform.OS !== "web") {
    return (
      <Text className="text-center p-4 text-red-600 font-bold">WEB ONLY</Text>
    );
  }

  const [input, setInput] = useState({ url: "", code: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const generateQRCodeData = () => `https://socieum.vercel.app/${input.code}`;

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code-canvas");
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full -ml-12 -mb-12 opacity-20"></div>

          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 relative z-10">
            QR Code Generator
            <span className="block text-sm font-normal text-gray-500 mt-2">
              Create and customize your QR codes
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="url"
                  value="https://socieum.vercel.app/"
                  disabled
                  placeholder="Enter Base URL"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="code"
                  value={input.code}
                  onChange={handleInputChange}
                  placeholder="Enter Code"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    ></path>
                  </svg>
                </div>
              </div>
              <button
                onClick={downloadQRCode}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105"
              >
                Download QR Code
              </button>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-400 to-blue-500 transform rotate-45 -ml-8 -mb-8"></div>
              <QRCodeCanvas
                id="qr-code-canvas"
                value={generateQRCodeData()}
                size={256}
                level="H"
                includeMargin={true}
                className="shadow-lg rounded-lg"
              />
              <p className="mt-4 text-sm text-gray-600 text-center">
                Scan this QR code or click the download button
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Generated URL:{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {generateQRCodeData()}
              </span>
            </p>
          </div>

          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
}
