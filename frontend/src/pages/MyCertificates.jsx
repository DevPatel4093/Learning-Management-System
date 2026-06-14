import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { jsPDF } from "jspdf";

function Certificate() {

  const { courseId } = useParams();

  const [certificate, setCertificate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

  generateCertificate();

}, []);

const generateCertificate = async () => {

  try {

    const res =
      await API.post(
        `/certificates/generate/${courseId}`
      );

    setCertificate(
      res.data
    );

  } catch (error) {

    alert(
      error.response?.data?.message
    );

  



    } finally {

      setLoading(false);

    }

  };

  const downloadCertificate =
  () => {

    const doc =
      new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Certificate of Completion",
      40,
      30
    );

    doc.setFontSize(16);

    doc.text(
      "This certifies that",
      70,
      60
    );

    doc.setFontSize(20);

    doc.text(
      certificate.studentName,
      60,
      80
    );

    doc.setFontSize(16);

    doc.text(
      "has successfully completed",
      50,
      100
    );

    doc.setFontSize(20);

    doc.text(
      certificate.courseTitle,
      50,
      120
    );

    doc.setFontSize(14);

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      70,
      150
    );

    doc.save(
      "certificate.pdf"
    );

  };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Course Certificate
        </h1>

        {certificate ? (

          <>

            <h2>
              {certificate.studentName}
            </h2>

            <p>
              Successfully completed
            </p>

            <h3>
              {certificate.courseTitle}
            </h3>

            <button
              className="enroll-btn"
              onClick={
                downloadCertificate
              }
            >
              Download Certificate
            </button>

          </>

        ) : (

          <h3>
            Certificate not available
          </h3>

        )}

      </div>

    </div>

  );

}

export default Certificate;