'use client';
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Attendance, Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Attendance', link: '/dashboard/attendance' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;
  const [data, setData] = useState<Attendance[]>([]);
  const attendanceLength = data.length;

  // const totalUsers = employeeRes.total_users; //1000
  // const pageCount = Math.ceil(totalUsers / pageLimit);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/attendance');
      const attendanceRes = await res.data;
      setData(attendanceRes);
    })();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Attendance (${attendanceLength})`} description="Manage attendance" />
        </div>
        <Separator />

        <EmployeeTable searchKey="studentName" pageNo={page} columns={columns} totalUsers={attendanceLength} data={data} pageCount={0} />
      </div>
    </>
  );
}
