"use client";

import React, { useEffect, useState } from "react";
import {
  filePublicPreview,
  getFileContentType,
} from "@/app/api/services/storage-files";

type FileProps = {
  token: string;
};

const FilePublicPreviewComponent: React.FC<FileProps> = ({ token }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const getFile = async () => {
      try {
        // const response = await filePublicPreview(token);

        // // Create a URL for the file blob
        // const fileBlobUrl = URL.createObjectURL(response.data);
        // setFileUrl(fileBlobUrl);

        // // Detect the file type from Blob MIME type
        // const mimeType = response.data.type; // e.g., "image/png", "video/mp4"
        // if (mimeType.startsWith("image/")) {
        //   setFileType("image");
        // } else if (mimeType.startsWith("video/")) {
        //   setFileType("video");
        // } else {
        //   setFileType(null); // Unsupported file type
        // }

        const { data } = await filePublicPreview(token);
        const fileSignedUrl = data?.data?.signedUrl;
        setFileUrl(fileSignedUrl);
        const response = await getFileContentType(fileSignedUrl);
        const contentType = response.headers["content-type"];

        if (contentType?.startsWith("image/")) {
          setFileType("image");
        } else if (contentType?.startsWith("video/")) {
          setFileType("video");
        } else {
          setFileType(null); //
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
  }, [fileUrl, token]);

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

export default FilePublicPreviewComponent;
