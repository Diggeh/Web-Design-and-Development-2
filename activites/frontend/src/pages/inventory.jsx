import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Login.css";
import slugify from "slugify";

const inventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState();
  const [slug, setSlug] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev_) => ({ ...prev_, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Product Page");
    } catch (error) {
      setErrors({ error: error.message });
    }
  };

  useEffect(() => {
    const generateSlug = slugify(formData.name, {
      lower: true,
      strict: true,
    });
  }, [formData.name]);

  return (
    <Card title="Create Product">
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter product name"
          required
        />
        <Input
          label="Slug"
          type="text"
          name="slug"
          value={slug}
          onChange={handleChange}
          error={errors.slug}
          disabled
        />
        <textArea
          label="Description"
          name="description"
          error={errors.description}
          onChange={handleChange}
          rows={10}
          cols={40}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <Button type="submit" loading={loading}>
          Register Product
        </Button>
      </form>
    </Card>
  );
};
export default inventory;
