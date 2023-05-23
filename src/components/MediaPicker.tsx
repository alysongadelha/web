"use client";

import { ChangeEvent, useState } from "react";

interface Preview {
  url: string;
  type: PreviewType;
}

enum PreviewType {
  VIDEO = "video",
  IMAGE = "image",
}

const MediaPicker = () => {
  const [preview, setPreview] = useState<Preview | null>(null);

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const previewType = files[0].type.split("/")[0] as PreviewType;
    const previewURL = URL.createObjectURL(files[0]);
    setPreview({ url: previewURL, type: previewType });
  };
  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview?.type == PreviewType.IMAGE && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview.url}
          alt="preview image"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      {preview?.type === PreviewType.VIDEO && (
        <video
          src={preview.url}
          autoPlay
          className=" w-full rounded-lg object-cover"
          controls={false}
        />
      )}
    </>
  );
};

export default MediaPicker;
