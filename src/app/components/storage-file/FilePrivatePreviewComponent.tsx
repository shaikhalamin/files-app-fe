"use client";

import React, { useEffect, useState } from "react";
import { filePrivatePreview } from "@/app/api/services/storage-files";

type FileProps = {
  fileName: string;
};

const FilePrivatePreviewComponent: React.FC<FileProps> = ({ fileName }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const getFile = async () => {
      try {
        const response = await filePrivatePreview(fileName);

        // Create a URL for the file blob
        const fileBlobUrl = URL.createObjectURL(response.data);
        setFileUrl(fileBlobUrl);

        // Detect the file type from Blob MIME type
        const mimeType = response.data.type; // e.g., "image/png", "video/mp4"
        if (mimeType.startsWith("image/")) {
          setFileType("image");
        } else if (mimeType.startsWith("video/")) {
          setFileType("video");
        } else {
          setFileType(null); // Unsupported file type
        }
      } catch (error) {
        console.error("Error fetching file", error);
      }
    };

    getFile();

    // Clean up the object URL when the component unmounts
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileName]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {fileUrl ? (
        fileType === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fileUrl} alt="Uploaded File" className="full-height" />
        ) : fileType === "video" ? (
          <video controls className="full-height">
            <source src={fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Unsupported file type.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FilePrivatePreviewComponent;
