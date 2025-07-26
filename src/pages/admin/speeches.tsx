"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mic, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminSpeeches() {
  const [speeches] = useState([]) // This would be connected to Firebase
  const loading = false

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Speeches</h1>
            <p className="text-gray-600">Add, edit, and manage speech collection</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Speech
          </Button>
        </div>

        {/* Speeches Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Speeches</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading speeches...</p>
              </div>
            ) : speeches.length === 0 ? (
              <div className="text-center py-8">
                <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No speeches found</p>
                <p className="text-sm text-gray-500 mt-2">Add your first speech to get started</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Speaker</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Table rows would be mapped here */}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}