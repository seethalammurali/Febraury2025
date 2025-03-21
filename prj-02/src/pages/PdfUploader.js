import { Upload, Modal } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";


const PdfUploader = ({ label, fileList, setFileList }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewFile, setPreviewFile] = useState("");

    const handlePreview = async (file) => {
        let fileUrl = file.url || file.thumbUrl;
        if (!fileUrl && file.originFileObj) {
            fileUrl = URL.createObjectURL(file.originFileObj);
        }
    
        if (window.innerWidth <= 768) {
            // Open PDF in new tab for mobile users
            window.open(fileUrl, "_blank");
        } else {
            setPreviewFile(fileUrl);
            setPreviewVisible(true);
        }
    };    

    const handleChange = ({ fileList }) => {
        const filteredList = fileList.filter(file => file.name.endsWith(".pdf"));
        setFileList(filteredList);
    };

    return (
        <>
            <Upload
                listType="text"
                fileList={fileList}
                accept=".pdf"
                beforeUpload={() => false}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => {
                    setFileList(fileList.filter(item => item.uid !== file.uid));
                }}
            >
                {fileList.length >= 1 ? null : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload {label}</div>
                    </div>
                )}
            </Upload>

            {/* Modal for PDF preview */}
            <Modal
                open={previewVisible}
                title="PDF Preview"
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                width={800}
            >
                {previewFile ? (
                    <iframe src={previewFile} width="100%" height="500px" />
                ) : (
                    <p>No preview available</p>
                )}
            </Modal>
        </>
    );
};

export default PdfUploader;
