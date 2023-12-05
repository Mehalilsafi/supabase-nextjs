'use client'




import React from 'react';

import { useState,useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import UpdateBook from './update-book';
import { getlist } from '../actions/getlist';
import { deletebook } from '../actions/deletebook';

const CustomTable = () => {

    const [book, setBook] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { book: fetchedBook, error } = await getlist();
            if (error) {
              console.error('Error fetching data:', error.message);
            } else {
              setBook(fetchedBook);
            }
          } catch (error) {
            console.error('Unexpected error:', error.message);
          }
        };
    
        fetchData();
      }, []);
      
      
      console.log(book)

      function handleSubmit(){
       
      }
    return (
       
        <Table className='mt-5'>
         
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[100px]'>Book id</TableHead>
                    <TableHead>Book name</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
          
                {
                     book.map((e) => (
                    <TableRow key={e.id}>
                        <TableCell className='font-medium'>{e.id}</TableCell>
                        <TableCell>{e.book_name}</TableCell>
                        <TableCell>{e.author}</TableCell>
                        <TableCell className=''>
                            <div
                                className={
                                    'p-3 w-[100px] text-center font-bold rounded-sm text-white' +
                                    (e.status === 'in'
                                        ? ' bg-red-500'
                                        : ' bg-green-500')
                                }
                            >
                                {e.status}
                            </div>
                        </TableCell>

                        <TableCell className='flex items-center space-x-4'>
                            <form action='post' onSubmit={handleSubmit}>

                            <button className='py-3 px-5 bg-red-300 rounded-sm text-red-700 font-bold'>
                                Delete
                            </button>

                            </form>
                            <UpdateBook bookId={e.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CustomTable;
