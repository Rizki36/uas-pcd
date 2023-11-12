"use client";
import { clipping } from "@/helper";
import React from "react";

const Multiplication = () => {
  const [multiple, setMultiple] = React.useState(1);
  const inputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMultiple(1);
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
    if (!multiple) return;

    const inputCanvas = inputCanvasRef.current;
    const outputCanvas = outputCanvasRef.current;

    if (!inputCanvas || !outputCanvas) return;

    const inputCtx = inputCanvas?.getContext("2d", {
      willReadFrequently: true,
    });
    const outputCtx = outputCanvas?.getContext("2d", {
      willReadFrequently: true,
    });

    if (!inputCtx || !outputCtx) return;

    const inputImageData = inputCtx.getImageData(
      0,
      0,
      inputCanvas.width,
      inputCanvas.height
    );

    const inputPixels = inputImageData.data;
    for (let i = 0; i < inputPixels.length; i += 4) {
      inputPixels[i] = clipping(inputPixels[i] * multiple);
      inputPixels[i + 1] = clipping(inputPixels[i + 1] * multiple);
      inputPixels[i + 2] = clipping(inputPixels[i + 2] * multiple);
    }
    outputCtx.putImageData(inputImageData, 0, 0);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex flex-col mx-auto w-96 mb-9">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={onInputChange}
        />
      </div>
      <div className="grid gap-y-3 md:gap-y-0 md:grid-cols-[1fr,100px,1fr] mb-8 w-full">
        <div className="flex order-2 md:order-1 items-center justify-center flex-col">
          <div className="mb-3">Input</div>
          <canvas
            ref={inputCanvasRef}
            id="input"
            className="w-96 h-64 border mx-auto mt-3"
          />
        </div>
        <div className="flex text-xs order-1 md:order-2 items-center justify-center flex-col">
          Multiple by
          <input
            type="number"
            className="input input-bordered text-xs w-full max-w-[384px] md:max-w-[70px]"
            value={multiple}
            onChange={(e) => {
              setMultiple(Number(e.target.value));
              onConvert();
            }}
            step={0.1}
          />
        </div>
        <div className="flex order-3 md:order-3 items-center justify-center flex-col">
          <div className="mb-3">Output</div>
          <canvas
            ref={outputCanvasRef}
            id="output"
            className="w-96 h-64 border mx-auto mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Multiplication;
