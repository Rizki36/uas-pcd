"use client";
import React from "react";

const ToNegative = () => {
  const inputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const file = fileList?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const inputCanvas = inputCanvasRef.current;

        const inputCtx = inputCanvas?.getContext("2d");
        if (!inputCtx || !inputCanvas) return;

        const { width, height } = img;
        const ratio = Math.min(
          inputCanvas.width / width,
          inputCanvas.height / height
        );
        const newWidth = width * ratio;
        const newHeight = height * ratio;
        const offsetX = (inputCanvas.width - newWidth) / 2;
        const offsetY = (inputCanvas.height - newHeight) / 2;

        inputCtx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
      };
    }
  };

  const onConvert = () => {
    const inputCanvas = inputCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;

    if (!inputCanvas || !outputCanvas) return;

    const inputCtx = inputCanvas?.getContext("2d");
    const outputCtx = outputCanvas?.getContext("2d");

    if (!inputCtx || !outputCtx) return;

    const inputImageData = inputCtx.getImageData(
      0,
      0,
      inputCanvas.width,
      inputCanvas.height
    );

    const inputPixels = inputImageData.data;
    for (let i = 0; i < inputPixels.length; i += 4) {
      inputPixels[i] = 255 - inputPixels[i];
      inputPixels[i + 1] = 255 - inputPixels[i + 1];
      inputPixels[i + 2] = 255 - inputPixels[i + 2];
    }
    outputCtx.putImageData(inputImageData, 0, 0);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center py-4">
      <div className="order-2 md:order-1 grid md:grid-cols-2 mb-8 w-full">
        <div className="flex items-center justify-center flex-col">
          <div className="mb-3">Input</div>
          <canvas
            ref={inputCanvasRef}
            height={256}
            width={320}
            className="border mx-auto mt-3"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="mb-3">Output</div>
          <canvas
            ref={outputCanvasRef}
            height={256}
            width={320}
            className="border mx-auto mt-3"
          />
        </div>
      </div>
      <div className="order-1 md:order-2 mb-5 md:mb-0 flex flex-col mx-auto w-full md:w-96 px-2">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={onInputChange}
        />
        <button onClick={onConvert} className="btn btn-primary mt-3">
          Convert
        </button>
      </div>
    </div>
  );
};

export default ToNegative;
