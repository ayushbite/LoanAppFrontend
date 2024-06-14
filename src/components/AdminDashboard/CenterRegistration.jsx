import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import axios from 'axios';
import { toast } from "sonner";

const CenterRegistration = () => {
  const [formData, setFormData] = useState({
    centerNumber: "",
    centerName: ""
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      console.log('Retrieved token:', token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('https://loanappbackend-dcsb.onrender.com/api/center', formData, config);
      console.log('Center registration successful:', response.data);
      toast(response.data.message || 'Center registration successful');
    } catch (error) {
      console.error('Error registering center:', error);
      toast(error.response?.data?.message || error.message || 'An error occurred');
    }
  };

  return (
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Center Registration</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your center details to register.
          </p>
        </div>
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="centerNumber">Center Number</Label>
                <Input
                    id="centerNumber"
                    type="text"
                    placeholder="Enter your center number"
                    value={formData.centerNumber}
                    onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="centerName">Center Name</Label>
                <Input
                    id="centerName"
                    type="text"
                    placeholder="Enter your center name"
                    value={formData.centerName}
                    onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Register Center
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
  );
};

export default CenterRegistration;
