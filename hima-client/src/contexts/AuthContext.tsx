"use client";

import { useState, useEffect, useContext } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PolicyCard } from "@/components/policy-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/@layouts/dashboardLayout";
import { AuthContext } from "@/contexts/AuthContext";

export default function PoliciesPage() {
  const { user } = useContext(AuthContext);
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyType, setPolicyType] = useState("");
  const [premiumType, setPremiumType] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/api/policies", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch policies");

        const data = await response.json();
        setPolicies(data);
      } catch (err: any) {
        setError(err.message || "Failed to load policies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handleNewPolicy = async () => {
    if (!policyType || !premiumType) {
      alert("Please select policy and premium type");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/api/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: user?.phoneNumber || "254708374149",
          premiumType,
          policyType,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to initiate payment");

      alert("Payment initiated, check your phone for STK push");
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to initiate payment");
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium">Boda Boda Insurance Policies</h1>
            <p className="text-xs text-gray-400">Manage your rider and motorcycle insurance</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600">
                <Plus className="w-4 h-4 mr-2" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Select New Policy</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Policy Type</Label>
                  <Select onValueChange={setPolicyType} value={policyType}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select policy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rider">Rider’s Insurance</SelectItem>
                      <SelectItem value="motorcycle">Motorcycle Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Premium Type</Label>
                  <Select onValueChange={setPremiumType} value={premiumType}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select premium type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleNewPolicy} className="w-full bg-yellow-500 hover:bg-yellow-600">
                  Purchase Policy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading && <p>Loading policies...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Tabs defaultValue="all">
          <TabsList className="bg-gray-900/60 mb-6">
            <TabsTrigger value="all">All Policies</TabsTrigger>
            <TabsTrigger value="rider">Rider</TabsTrigger>
            <TabsTrigger value="motorcycle">Motorcycle</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {policies.map((policy: any) => (
              <PolicyCard
                key={policy._id}
                title={policy.title}
                policyNo={policy.policyNo}
                dueDate={new Date(policy.dueDate).toLocaleDateString()}
                type={policy.type}
                benefits={policy.benefits}
              />
            ))}
          </TabsContent>

          <TabsContent value="rider" className="space-y-4">
            {policies
              .filter((policy: any) => policy.type === "rider")
              .map((policy: any) => (
                <PolicyCard
                  key={policy._id}
                  title={policy.title}
                  policyNo={policy.policyNo}
                  dueDate={new Date(policy.dueDate).toLocaleDateString()}
                  type={policy.type}
                  benefits={policy.benefits}
                />
              ))}
          </TabsContent>

          <TabsContent value="motorcycle" className="space-y-4">
            {policies
              .filter((policy: any) => policy.type === "motorcycle")
              .map((policy: any) => (
                <PolicyCard
                  key={policy._id}
                  title={policy.title}
                  policyNo={policy.policyNo}
                  dueDate={new Date(policy.dueDate).toLocaleDateString()}
                  type={policy.type}
                  benefits={policy.benefits}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}