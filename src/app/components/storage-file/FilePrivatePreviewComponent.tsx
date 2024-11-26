"use client";

import React, { useEffect, useState } from "react";
import {
  filePrivatePreview,
  getFileContentType,
} from "@/app/api/services/storage-files";

type FileProps = {
  fileName: string;
};

const FilePrivatePreviewComponent: React.FC<FileProps> = ({ fileName }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const getFile = async () => {
      try {
        const { data } = await filePrivatePreview(fileName);
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
  }, [fileName, fileUrl]);

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
          <p>Detecting....</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FilePrivatePreviewComponent;
