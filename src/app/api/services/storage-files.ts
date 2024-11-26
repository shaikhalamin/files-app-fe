import { axiosPrivate } from "../lib/axios-private";
import { axiosPublic } from "../lib/axios-public";

export const uploadFile = async (formData: any) => {
  return axiosPrivate.post(`/storage-files`, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const generateShareableLink = async (fileName: string) => {
  return axiosPrivate.post(`/storage-files/generate-link/${fileName}`, {
    headers: {
      Accept: "application/json",
    },
  });
};

export const filePrivatePreview = async (fileName: string) => {
  return axiosPrivate.get(`/storage-files/private/preview/${fileName}`, {
    responseType: "blob",
  });
};

export const filePublicPreview = async (token: string) => {
  return axiosPublic.get(`/storage-files/public/preview/${token}`, {
    responseType: "blob",
  });
};

export const getUserFiles = async () => {
  return axiosPrivate.get("/storage-files", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserFilesByFilter = async (query: string) => {
  return axiosPrivate.get(`/storage-files?${query}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const downloadPrivateFile = async (fileName: string) => {
  return axiosPrivate.get(`/storage-files/download/${fileName}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPrivateFile = async (fileUrl: string) => {
  return axiosPrivate.get(`${fileUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getFileContentType = async (fileUrl: string) => {
  return axiosPublic.head(fileUrl);
};
