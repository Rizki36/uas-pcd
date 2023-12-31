"use client";
import { clipping } from "@/helper";
import React from "react";

const Division = () => {
  const [division, setDivision] = React.useState(1);
  const inputCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDivision(1);
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
    if (!division) return;

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
      inputPixels[i] = clipping(inputPixels[i] / division);
      inputPixels[i + 1] = clipping(inputPixels[i + 1] / division);
      inputPixels[i + 2] = clipping(inputPixels[i + 2] / division);
    }
    outputCtx.putImageData(inputImageData, 0, 0);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex flex-col mx-auto w-full md:w-96 mb-9 px-2">
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={onInputChange}
        />
      </div>
      <div className="grid gap-y-3 md:gap-y-0 md:grid-cols-[1fr,100px,1fr] mb-8 w-full px-2">
        <div className="flex order-2 md:order-1 items-center justify-center flex-col">
          <div className="mb-3">Input</div>
          <canvas
            ref={inputCanvasRef}
            height={256}
            width={320}
            className="border mx-auto mt-3"
          />
        </div>
        <div className="flex text-xs  order-1 md:order-2 items-center justify-center flex-col">
          Divided by
          <input
            type="number"
            className="input input-bordered text-xs w-full max-w-[384px] md:max-w-[70px]"
            value={division}
            onChange={(e) => {
              setDivision(Number(e.target.value));
              onConvert();
            }}
            step={0.1}
          />
        </div>
        <div className="flex order-3 md:order-3 items-center justify-center flex-col">
          <div className="mb-3">Output</div>
          <canvas
            ref={outputCanvasRef}
            height={256}
            width={320}
            className="border mx-auto mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Division;
