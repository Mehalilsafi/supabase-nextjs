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

    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { book, error } = await getlist();

            console.log("books : " , book);
            if (error) {
              console.error('Error fetching data:', error.message);
            } else {
              setBooks(book);
            }
          } catch (error) {
            console.error('Unexpected error:', error.message);
          }
        };
    
        fetchData();
      }, []);
      
      
      

      function handleDelete(id){
     
        deletebook(id)
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      }
    return (
        <Table className='mt-5'>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[100px]'>Book id</TableHead>
                    <TableHead>Book name</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
          
                {
                     books.map((e) => (
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

                        <TableCell>{e.client_name}</TableCell>

                        <TableCell className='flex items-center space-x-4'>
                    

                            <button className='py-3 px-5 bg-red-300 rounded-sm text-red-700 font-bold'onClick={()=>handleDelete(e.id )}>
                                Delete
                            </button>

                            <UpdateBook book={e}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CustomTable;
