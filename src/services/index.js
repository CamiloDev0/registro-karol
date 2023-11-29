import axios from "axios";
import { v4 as uuid } from "uuid";
export const exportAsImage = async (file = "") => {
  try {
    const imageKey = uuid();
    const imgElement = new Image();
    imgElement.src = URL.createObjectURL(file);

    /*   await new Promise((resolve) => {
      imgElement.onload = resolve;
    }); */

    const canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement, 0, 0);

    const canvasImage = canvas.toDataURL("image/png", 1.0);

    const headers = {
      "Content-Type": "application/json",
    };
    const data = JSON.stringify({
      image: canvasImage,
      id: imageKey,
      folder: "mirror",
    });
    const responseApi = await axios({
      method: "post",
      url: "https://mocionws.info/",
      headers,
      data,
    });
    return {
      error: null,
      data: {
        imageKey,
        responseApi,
      },
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};
