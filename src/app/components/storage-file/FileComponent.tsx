import React from "react";
import {
  downloadPrivateFile,
  getPrivateFile,
} from "@/app/api/services/storage-files";
import { UserFile } from "@/app/types/user/user-files";

type FileProps = {
  userFile: UserFile;
};

const FileComponent: React.FC<FileProps> = ({ userFile }) => {
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [fileType, setFileType] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getFile = async () => {
      try {
        const response = await downloadPrivateFile(userFile.file_name);
        // Create a URL for the file blob
        const fileBlobUrl = URL.createObjectURL(response.data);
        setFileUrl(fileBlobUrl);

        const imagePath = userFile.file_url;

        // Get the file extension
        const extension = imagePath.split(".").pop()?.toLowerCase();
        // Define the accepted extensions directly
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const videoExtensions = [".mp4", ".webm", ".avi"];

        // Check if it's an image or video based on the extension
        if (imageExtensions.includes(`.${extension}`)) {
          setFileType("image");
        } else if (videoExtensions.includes(`.${extension}`)) {
          setFileType("video");
        } else {
          setFileType(null); // Unsupported file type
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
