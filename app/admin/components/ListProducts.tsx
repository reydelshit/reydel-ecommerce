'use client';

import { useEffect, useState } from 'react';
import { getProduct } from '../actions/get-products';
import { deleteProduct } from '../actions/delete-product';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

// const initialProducts: Product[] = [];

export default function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState<Boolean>(false);

  async function fetchProduct() {
    const products = await getProduct();
    if (products) setProducts(products);
  }

  useEffect(() => {
    fetchProduct();
  }, [products]);

  const LoadingProducts = () => {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center p-2">
      {products.length === 0 ? (
        <LoadingProducts />
      ) : (
        <div className="flex flex-col">
          <div className="self-end mb-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="Computer">Computer</SelectItem>
                <SelectItem value="Flash Drive">Flash Drive</SelectItem>
                <SelectItem value="Flash Drive">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableCaption>A list of product.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead className="text-center">Product Name</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center w-[10rem]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((prod) => {
                return (
                  <TableRow>
                    <TableCell className="font-medium">{prod.id}</TableCell>
                    <TableCell className="font-medium">
                      <img
                        className="w-full h-[8rem] object-contain rounded-md mb-4"
                        src={prod.image}
                        alt={prod.name}
                      />
                    </TableCell>
                    <TableCell className="text-center">{prod.name}</TableCell>
                    <TableCell className="text-center">
                      {prod.category}
                    </TableCell>

                    <TableCell className="text-center">
                      {prod.description}
                    </TableCell>
                    <TableCell className="text-right font-bold w-[10rem]">
                      ₱ {prod.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end items-end gap-2 w-full">
                        <Button onClick={() => deleteProduct(prod.id)}>
                          Delete
                        </Button>

                        <Button
                          onClick={() => setShowUpdateModal(!showUpdateModal)}
                        >
                          Update
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

{
  /* <Card className="w-[20rem] flex flex-col">
              <CardHeader>
                <div className="flex justify-end items-end gap-4 w-full">
                  <Button onClick={() => deleteProduct(prod.id)}>Delete</Button>

                  <Button onClick={() => setShowUpdateModal(!showUpdateModal)}>
                    Update
                  </Button>
                </div>

                <img
                  className="w-full h-[15rem] object-cover rounded-md mb-4"
                  src="https://i.pinimg.com/236x/d3/f4/94/d3f4949e263a70572fc94f008063e1e9.jpg"
                  alt={prod.name}
                />
                <CardTitle className="text-2xl font-bold">
                  {prod.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{prod.description}</p>
              </CardContent>
              <CardFooter>
                <h2 className="font-bold">₱ {prod.price}</h2>
              </CardFooter>
            </Card> */
}
