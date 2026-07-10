"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Upload,
  FileText,
  Image,
  Video,
  Download,
  Trash2,
  Share2,
  Lock,
  Eye,
  EyeOff,
  Filter,
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const mockEvidence = [
  {
    id: 1,
    name: "Medical Report - Initial Examination",
    type: "document",
    size: "2.4 MB",
    uploadedAt: "2024-04-10 10:30",
    status: "verified",
    encryption: true,
    accessLog: 2,
  },
  {
    id: 2,
    name: "Injury Photos - Day 1",
    type: "image",
    size: "5.8 MB",
    uploadedAt: "2024-04-10 09:15",
    status: "verified",
    encryption: true,
    accessLog: 5,
  },
  {
    id: 3,
    name: "CCTV Footage - Incident Location",
    type: "video",
    size: "156 MB",
    uploadedAt: "2024-04-09 14:45",
    status: "processing",
    encryption: true,
    accessLog: 1,
  },
  {
    id: 4,
    name: "Police Complaint Copy",
    type: "document",
    size: "1.2 MB",
    uploadedAt: "2024-04-08 16:20",
    status: "verified",
    encryption: true,
    accessLog: 8,
  },
  {
    id: 5,
    name: "Witness Statement",
    type: "document",
    size: "890 KB",
    uploadedAt: "2024-04-07 11:00",
    status: "pending",
    encryption: true,
    accessLog: 0,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EvidenceVaultPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEncryptedOnly, setShowEncryptedOnly] = useState(false);

  const filteredEvidence = mockEvidence.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedFilter === "all" ||
      (selectedFilter === "documents" && item.type === "document") ||
      (selectedFilter === "images" && item.type === "image") ||
      (selectedFilter === "videos" && item.type === "video");
    const matchesEncryption = !showEncryptedOnly || item.encryption;

    return matchesSearch && matchesType && matchesEncryption;
  });

  const stats = {
    total: mockEvidence.length,
    documents: mockEvidence.filter((e) => e.type === "document").length,
    images: mockEvidence.filter((e) => e.type === "image").length,
    videos: mockEvidence.filter((e) => e.type === "video").length,
    totalSize: "165.2 MB",
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="w-5 h-5" />;
      case "image":
        return <Image className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-primary";
      case "processing":
        return "text-warning-soft";
      case "pending":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Evidence Vault</h1>
            <p className="text-muted-foreground mt-1">
              Securely store and manage all evidence related to your case
            </p>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/dashboard/evidence/upload">
              <Plus className="w-4 h-4" />
              Upload Evidence
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{stats.documents}</p>
                <p className="text-xs text-muted-foreground mt-1">Documents</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{stats.images}</p>
                <p className="text-xs text-muted-foreground mt-1">Images</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{stats.videos}</p>
                <p className="text-xs text-muted-foreground mt-1">Videos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{stats.totalSize}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Size</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div variants={itemVariants}>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Military-Grade Encryption</p>
                <p className="text-sm text-muted-foreground">
                  All evidence is encrypted with AES-256. Access is logged and only authorized personnel can view your files.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Search */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3">
          <div className="flex-1">
            <Label htmlFor="search" className="text-xs mb-2 block">
              Search Files
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Search by filename..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-48">
            <Label htmlFor="filter" className="text-xs mb-2 block">
              Filter by Type
            </Label>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger id="filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant={showEncryptedOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowEncryptedOnly(!showEncryptedOnly)}
            className="gap-2 w-full md:w-auto"
          >
            <Lock className="w-4 h-4" />
            Encrypted Only
          </Button>
        </div>
      </motion.div>

      {/* Evidence List */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Your Evidence Files ({filteredEvidence.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEvidence.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No evidence files found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredEvidence.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      {getTypeIcon(item.type)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.uploadedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.accessLog} views
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className={`flex items-center gap-1 text-sm font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="capitalize">{item.status}</span>
                    </div>

                    {/* Encryption Badge */}
                    <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      <Lock className="w-3 h-3" />
                      Encrypted
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-9 h-9 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Access Log */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Access Log</CardTitle>
            <CardDescription>Who accessed your evidence and when</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Advocate - Ms. Priya Singh",
                  action: "Accessed Medical Report",
                  time: "2 hours ago",
                },
                {
                  name: "Police Officer - Inspector Sharma",
                  action: "Viewed CCTV Footage",
                  time: "Yesterday at 3:30 PM",
                },
                {
                  name: "Lawyer - Mr. Raj Patel",
                  action: "Downloaded Police Complaint",
                  time: "2 days ago",
                },
              ].map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{log.name}</p>
                    <p className="text-sm text-muted-foreground">{log.action}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
