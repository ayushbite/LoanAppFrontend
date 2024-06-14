import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PaymentRegistration = () => {
    const [centers, setCenters] = useState([]);
    const [members, setMembers] = useState([]);
    const [loanIds, setLoanIds] = useState([]);
    const [formData, setFormData] = useState({
        centerCode: "",
        memberCode: "",
        loanNO: "",
        paymentdate: "",
        paymentamount: "",
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
                const response = await axios.get("https://loanappbackend-dcsb.onrender.com/api/payment", config);
                setCenters(response.data);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleCenterChange = (selectedCenter) => {
        const data = centers.find(center => center.centerCode === selectedCenter);
        if (data) {
            setMembers(data.members);
            setFormData(prevState => ({
                ...prevState,
                centerCode: selectedCenter,
                memberCode: "",
                loanNO: ""
            }));
        }
    };

    const handleMemberChange = (selectedMember) => {
        const data = members.find(member => member.memberCode === selectedMember);
        if (data) {
            setLoanIds(data.loanIds);
            setFormData(prevState => ({
                ...prevState,
                memberCode: selectedMember,
                loanNO: ""
            }));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post("https://loanappbackend-dcsb.onrender.com/api/payment", formData, config);
            alert("Payment made successfully!");
            setFormData({
                centerCode: "",
                memberCode: "",
                loanNO: "",
                paymentdate: "",
                paymentamount: ""
            });
        } catch (error) {
            console.error("Error making payment:", error);
            alert("Failed to make payment.");
        }
    };


    return (
        <Card className="w-full max-w-xl">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Make a Payment</CardTitle>
                    <CardDescription>Enter the payment details below.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="center">Center</Label>
                            <Select value={formData.centerCode} onValueChange={(value) => handleCenterChange(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select center">
                                        {formData.centerCode
                                            ? centers.find(center => center.centerCode === formData.centerCode)?.centerName
                                            : "Select center"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {centers.map((center) => (
                                        <SelectItem key={center.centerCode} value={center.centerCode}>
                                            {center.centerName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="member">Member</Label>
                            <Select value={formData.memberCode} onValueChange={(value) => handleMemberChange(value)} disabled={!formData.centerCode}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select member">
                                        {formData.memberCode
                                            ? members.find(member => member.memberCode === formData.memberCode)?.memberName
                                            : "Select member"}
                                    </SelectValue>
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
                        <Label htmlFor="loan">Loan ID</Label>
                        <Select value={formData.loanNO} onValueChange={(value) => setFormData({ ...formData, loanNO: value })} disabled={!formData.memberCode}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select loan id">
                                    {formData.loanNO
                                        ? formData.loanNO
                                        : "Select loan id"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {loanIds.map((loan) => (
                                    <SelectItem key={loan} value={loan}>
                                        {loan}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="paymentdate">Payment Date</Label>
                            <Input id="paymentdate" type="date" value={formData.paymentdate} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="paymentamount">Payment Amount</Label>
                            <Input id="paymentamount" type="number" min="0" step="0.01" value={formData.paymentamount} onChange={handleChange} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">Make Payment</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default PaymentRegistration;
