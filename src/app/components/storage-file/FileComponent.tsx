import React, { useEffect, useState } from "react";
import {
  downloadPrivateFile,
  getFileContentType,
  getPrivateFile,
} from "@/app/api/services/storage-files";
import { UserFile } from "@/app/types/user/user-files";

type FileProps = {
  userFile: UserFile;
};

const FileComponent: React.FC<FileProps> = ({ userFile }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const getFile = async () => {
      try {
        const { data } = await downloadPrivateFile(userFile.file_name);
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
  }, [userFile]);

  return (
    <div>
      {fileUrl ? (
        fileType === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fileUrl}
            alt="Uploaded File"
            className={`w-100 object-fit`}
            height={250}
          />
        ) : fileType === "video" ? (
          <video controls className={`w-100 object-fit`} height={250}>
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

export default FileComponent;
