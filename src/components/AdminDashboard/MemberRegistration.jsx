import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MemberRegistration = () => {
  const [centers, setCenters] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [formData, setFormData] = useState({
    memberCode: "",
    memberName: "",
    memberMobile: "",
    memberAddress: "",
    memberEmail:""
  });

  const selectedCenter = centers.find((center) => center.centerNo === value);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("https://loanappbackend-dcsb.onrender.com/api/center", config);
        const centersData = response.data.centers; // Access the centers array from the response
        setCenters(centersData);
        console.log("Centers fetched successfully:", centersData);

        // Loop through each center and log its details
        centersData.forEach((center) => {
          console.log(`Center No: ${center.centerNo}, Center Name: ${center.centerName}`);
        });

        toast("Centers Fetched");
      } catch (error) {
        console.error("Error fetching centers:", error);
        if (error.response) {
          console.error("Error response:", error.response);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("General error:", error.message);
        }
      }
    };

    fetchCenters();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("Please select a center");
      return;
    }

    const dataToSubmit = {
      ...formData,
      centerNo: value
    };

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("https://loanappbackend-dcsb.onrender.com/api/member", dataToSubmit, config);
      console.log("Member registered successfully:", response.data);
      toast.success("Member Registered Successfully");
      // Clear form after successful submission
      setFormData({
        memberCode: "",
        memberName: "",
        memberMobile: "",
        memberAddress: ""
      });
      setValue(null);
    } catch (error) {
      console.error("Error registering member:", error);
      if (error.response) {
        console.error("Error response:", error.response);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("General error:", error.message);
      }
      toast.error("Error registering member");
    }
  };

  return (
      <Card className="w-full mx-auto max-w-md space-y-6">
        <CardHeader>
          <CardTitle>Member Registration</CardTitle>
          <CardDescription>Register as a new member.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {centers.length === 0 ? (
              <div className="text-center">
                <p>No centers available.</p>
                <Button className="mt-2">Create a new center</Button>
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 gap-2">
                  <Label>Select center no</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                      >
                        {selectedCenter
                            ? selectedCenter.centerName
                            : "Select center..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search center..." />
                        <CommandList>
                          <CommandEmpty>No center found.</CommandEmpty>
                          <CommandGroup>
                            {centers.map((center) => (
                                <CommandItem
                                    key={center.centerNo}
                                    value={center.centerNo.toString()} // Ensure the value is a string
                                    onSelect={(currentValue) => {
                                      setValue(parseInt(currentValue)); // Convert back to number
                                      setOpen(false);
                                    }}
                                >
                                  <Check
                                      className={cn(
                                          "mr-2 h-4 w-4",
                                          value === center.centerNo
                                              ? "opacity-100"
                                              : "opacity-0"
                                      )}
                                  />
                                  {center.centerName}
                                </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {value && (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <Label htmlFor="member-code">Member Code</Label>
                        <Input
                            id="memberCode"
                            value={formData.memberCode}
                            onChange={handleChange}
                            placeholder="Enter your member code"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <Label htmlFor="member-name">Member Name</Label>
                        <Input
                            id="memberName"
                            value={formData.memberName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <Label htmlFor="member-email">Member Email</Label>
                        <Input
                            id="memberEmail"
                            value={formData.memberEmail}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <Label htmlFor="member-mobile">Member Mobile Number</Label>
                        <Input
                            id="memberMobile"
                            type="tel"
                            value={formData.memberMobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <Label htmlFor="member-address">Member Address</Label>
                        <Textarea
                            id="memberAddress"
                            value={formData.memberAddress}
                            onChange={handleChange}
                            placeholder="Enter your address"
                        />
                      </div>
                      <CardFooter>
                        <Button type="submit" className="w-full">
                          Register
                        </Button>
                      </CardFooter>
                    </form>
                )}
              </>
          )}
        </CardContent>
      </Card>
  );
};

export default MemberRegistration;
