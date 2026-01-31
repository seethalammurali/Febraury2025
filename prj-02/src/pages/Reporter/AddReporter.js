import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useCreateReporterMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddReporter() {
  const [form] = Form.useForm();
  const [createReporter, { isLoading }] = useCreateReporterMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roleid: 5,
    mobile: "",
    email: "",
    password: "",
    userType: "reports",
    name: "",
    empId: "",
  });

  const onFinish = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      console.log(formData);
      const res = await createReporter(data).unwrap();
      toast.success(res?.message);
      navigate("/dashboard/reporter");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name "
              name="Name"
              rules={[
                { required: true, message: "Please enter Aadhaar name" },
              ]}>
              <Input
                value={formData.name}
                onChange={handleInputChange}
                name="name"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="EMP ID"
              name="empId"
              rules={[{ required: true, message: "Please enter Employee id" }]}>
              <Input
                maxLength={14} // 12 digits + 2 spaces
                value={formData.value} // Ensure controlled input
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, empId: value });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[
                { required: true, message: "Please enter mobile number" },
                {
                  pattern: /^\d{10}$/,
                  message: "Mobile number must be exactly 10 digits",
                },
              ]}>
              <Input
                maxLength={10}
                value={formData.value}
                name="mobile"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  setFormData({ ...formData, mobile: value }); // Set formatted value in form
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}>
              <Input
                value={formData.email}
                onChange={handleInputChange}
                name="email"
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" className="done-button" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
