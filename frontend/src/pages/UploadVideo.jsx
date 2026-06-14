import { useState } from "react";
import API from "../services/api";

function UploadVideo() {

  const [video, setVideo] =
    useState(null);

  const [videoUrl, setVideoUrl] =
    useState("");

  const handleUpload = async () => {

    if (!video) {

      alert("Select a video");

      return;

    }

    try {

      const formData =
      new FormData();

      formData.append(
        "video",
        video
      );

      const res =
      await API.post(
        "/lessons/upload-video",
        formData,
        {
          headers: {
            "Content-Type":
            "multipart/form-data"
          }
        }
      );

      setVideoUrl(
        res.data.videoUrl
      );

      alert(
        "Video Uploaded Successfully"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Upload Failed"
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Upload Lesson Video
        </h1>

        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            setVideo(
              e.target.files[0]
            )
          }
        />

        <button
          onClick={handleUpload}
        >
          Upload Video
        </button>

        {videoUrl && (

          <video
            controls
            width="100%"
            style={{
              marginTop: "20px"
            }}
          >

            <source
              src={videoUrl}
            />

          </video>

        )}

      </div>

    </div>

  );

}

export default UploadVideo;