import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const LoanRegistration = () => {
    const [centers, setCenters] = useState([]);
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        centerNo: "",
        memberCode: "",
        loanSetup: "",
        loanAmount: "",
        interestrate: "",
        loanDate: "",
        maturityDate: "",
        month: "",
        week: "",
        nicNumber: ""
    });

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get("https://loanappbackend-dcsb.onrender.com/api/loan", config);
                console.log("Fetched centers:", response.data);
                setCenters(response.data);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleCenterChange = (selectedCenter) => {
        let selectedCenterData = centers.find(center => center.centerno === selectedCenter);

        if (selectedCenterData) {
            console.log("Selected center found:", selectedCenterData);

            // Extracting members from selectedCenterData
            const selectedMembers = selectedCenterData.members;

            // Logging selected center and its members
            console.log("Selected center:", selectedCenterData.centername);
            console.log("Members of selected center:");

            // Iterating through members and logging member names
            selectedMembers.forEach((member, index) => {
                console.log(`Member ${index + 1}:`, member.memberName);
            });

            // Setting state for members
            setMembers(selectedMembers);
            setFormData(prevState => ({
                ...prevState,
                centerNo: selectedCenter
            }));
        } else {
            // Log if selectedCenterData is not found (optional)
            console.log("Selected center data not found for center number:", selectedCenter);


        }



    };

    const handleChange = (field, value) => {
        let updatedValue = value;

        if (field === 'loanDate' || field === 'maturityDate') {
            updatedValue = value instanceof Date ? value.toLocaleDateString() : value;
        }
        console.log(`Field ${field} changed to:`, updatedValue);
        setFormData(prevState => ({
            ...prevState,
            [field]: updatedValue
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post("https://loanappbackend-dcsb.onrender.com/api/loan", formData, config);
            console.log("Loan registered successfully:", response.data);
            setFormData({
                centerNo: "",
                memberCode: "",
                loanSetup: "",
                loanAmount: "",
                interestrate: "",
                loanDate: "",
                maturityDate: "",
                month: "",
                week: "",
                nicNumber: ""
            });
        } catch (error) {
            console.error("Error registering loan:", error);
        }
    };


    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Loan Registration</h1>
                <p className="text-gray-500 dark:text-gray-400">Fill out the form to register a new loan.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="center">Center</Label>
                        <Label htmlFor="center">Center</Label>
                        <Select value={formData.centerNo} onValueChange={(value) => handleCenterChange(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select center" />
                            </SelectTrigger>
                            <SelectContent>
                                {centers.map((center) => (
                                    <SelectItem key={center.centerno} value={center.centerno}>
                                        {center.centername}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="member">Member</Label>
                        <Select value={formData.memberCode} onValueChange={(value) => handleChange("memberCode", value)} disabled={!formData.centerNo}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select member" />
                            </SelectTrigger>
                            <SelectContent>
                                {members.map((member) => (
                                    <SelectItem key={member.memberCode} value={member.memberCode}>
                                        {member.memberName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="loan-setup">Loan Setup</Label>
                    <Select value={formData.loanSetup} onValueChange={(value) => handleChange("loanSetup", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select loan setup" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="annual">Annual</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="loan-amount">Loan Amount</Label>
                        <Input
                            id="loanAmount"
                            type="number"
                            value={formData.loanAmount}
                            onChange={(e) => handleChange("loanAmount", e.target.value)}
                            placeholder="Enter loan amount"
                        />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="interest-rate">Interest Rate</Label>
                    <Input
                        id="interestrate"
                        type="number"
                        value={formData.interestrate}
                        onChange={(e) => handleChange("interestrate", e.target.value)}
                        placeholder="Enter interest rate"
                    />
                </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="loan-date">Loan Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="pl-3 text-left font-normal text-gray-500 dark:text-gray-400">
                                    {formData.loanDate || "Pick a date"}
                                    <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formData.loanDate}
                                    onSelect={(date) => handleChange("loanDate", date)}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="maturity-date">Maturity Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="pl-3 text-left font-normal text-gray-500 dark:text-gray-400">
                                    {formData.maturityDate || "Pick a date"}
                                    <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formData.maturityDate}
                                    onSelect={(date) => handleChange("maturityDate", date)}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="month">Month</Label>
                        <Input
                            id="month"
                            type="number"
                            value={formData.month}
                            onChange={(e) => handleChange("month", e.target.value)}
                            placeholder="Enter month"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="week">Week</Label>
                        <Input
                            id="week"
                            type="number"
                            value={formData.week}
                            onChange={(e) => handleChange("week", e.target.value)}
                            placeholder="Enter week"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nic-number">NIC Number</Label>
                        <Input
                            id="nicNumber"
                            type="number"
                            value={formData.nicNumber}
                            onChange={(e) => handleChange("nicNumber", e.target.value)}
                            placeholder="Enter NIC number"
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Register Loan
                </Button>
            </form>
        </div>
    );
}

function CalendarDaysIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    );
}

export default LoanRegistration;