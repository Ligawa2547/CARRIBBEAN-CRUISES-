"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export default function JobsFilter({
  departments,
  selectedDepartment,
}: {
  departments: string[]
  selectedDepartment: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleDepartmentChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("department", value)
    } else {
      params.delete("department")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="w-full md:w-auto">
      <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
        <SelectTrigger className="w-full md:w-[220px]">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Filter by department" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((department) => (
            <SelectItem key={department} value={department}>
              {department}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
