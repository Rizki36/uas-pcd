"use client";
import { clipping } from "@/helper";
import React from "react";

const Subtraction = () => {
  const inputACanvasRef = React.useRef<HTMLCanvasElement>(null);
  const inputBCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const onProcess = async () => {
    const inputACanvas = inputACanvasRef.current;
    const inputBCanvas = inputBCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;

    if (!inputACanvas || !inputBCanvas || !outputCanvas) return;

    await Promise.all([
      inputACanvas.onload,
      inputBCanvas.onload,
      outputCanvas.onload,
    ]);

    const inputACtx = inputACanvas?.getContext("2d", {
      willReadFrequently: true,
    });
    const inputBCtx = inputBCanvas?.getContext("2d", {
      willReadFrequently: true,
    });
    const outputCtx = outputCanvas?.getContext("2d", {
      willReadFrequently: true,
    });

    if (!inputACtx || !inputBCtx || !outputCtx) return;

    const inputAImageData = inputACtx.getImageData(
      0,
      0,
      inputACanvas.width,
      inputACanvas.height
    );

    const inputBImageData = inputBCtx.getImageData(
      0,
      0,
      inputBCanvas.width,
      inputBCanvas.height
    );

    const inputAPixels = inputAImageData.data;
    const inputBPixels = inputBImageData.data;

    const outputImageData = outputCtx.createImageData(
      outputCanvas.width,
      outputCanvas.height
    );

    const outputPixels = outputImageData.data;

    // split into smaller chunks, to prevent blocking the main thread
    const chunkSize = 1000;
    const chunkCount = Math.ceil(outputPixels.length / chunkSize);

    for (let i = 0; i < chunkCount; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, outputPixels.length);

      for (let j = start; j < end; j += 4) {
        outputPixels[j] = clipping(inputAPixels[j] - inputBPixels[j]);
        outputPixels[j + 1] = clipping(
          inputAPixels[j + 1] - inputBPixels[j + 1]
        );
        outputPixels[j + 2] = clipping(
          inputAPixels[j + 2] - inputBPixels[j + 2]
        );
        outputPixels[j + 3] = 255;
      }
    }

    outputCtx.putImageData(outputImageData, 0, 0);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="grid gap-y-4 md:gap-y-0 md:grid-cols-2 mb-8 w-full">
        <div className="flex items-center justify-center flex-col">
          <div className="mb-3">Input A</div>
          <canvas
            ref={inputACanvasRef}
            width={384}
            height={256}
            className="border mx-auto mt-3"
          />
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered max-w-md mt-2"
            onChange={(e) => {
              const fileList = e.target.files;
              const file = fileList?.[0];

              if (file) {
                const url = URL.createObjectURL(file);
                const img = new Image();
                img.src = url;
                img.onload = () => {
                  const inputCanvas = inputACanvasRef.current;

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

                  inputCtx.filter = "grayscale(100%)";

                  inputCtx.fillStyle = "white";
                  inputCtx.fillRect(
                    0,
                    0,
                    inputCanvas.width,
                    inputCanvas.height
                  );

                  inputCtx.drawImage(
                    img,
                    offsetX,
                    offsetY,
                    newWidth,
                    newHeight
                  );
                };
              }
            }}
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="mb-3">Input B</div>
          <canvas
            ref={inputBCanvasRef}
            width={384}
            height={256}
            className="border mx-auto mt-3"
          />
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered max-w-md mt-2"
            onChange={(e) => {
              const fileList = e.target.files;
              const file = fileList?.[0];

              if (file) {
                const url = URL.createObjectURL(file);
                const img = new Image();
                img.src = url;
                img.onload = () => {
                  const inputCanvas = inputBCanvasRef.current;

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

                  inputCtx.filter = "grayscale(100%)";

                  inputCtx.fillStyle = "white";
                  inputCtx.fillRect(
                    0,
                    0,
                    inputCanvas.width,
                    inputCanvas.height
                  );

                  inputCtx.drawImage(
                    img,
                    offsetX,
                    offsetY,
                    newWidth,
                    newHeight
                  );
                };
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col mx-auto w-96">
        <button onClick={onProcess} className="btn btn-primary mt-3">
          Process
        </button>
      </div>
      <div>
        <div className="my-3 text-center">Output</div>
        <canvas
          ref={outputCanvasRef}
          width={384}
          height={256}
          className="border mx-auto mt-3"
        />
      </div>
    </div>
  );
};

export default Subtraction;
