'use client';

import { useEffect, useState } from 'react';
import { getProduct } from '../actions/get-products';
import { deleteProduct } from '../actions/delete-product';
import UpdateProductForm from './UpdateProductForm';

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
  const [productId, setProductId] = useState<number>(0);

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

  const handleShowModal = (id: number) => {
    setShowUpdateModal(!showUpdateModal);
    setProductId(id);
  };

  return (
    <div className="w-full flex justify-center p-2">
      {products.length === 0 ? (
        <LoadingProducts />
      ) : (
        <div className="flex flex-col relative w-full">
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
                  <TableRow key={prod.id}>
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

                        <Button onClick={() => handleShowModal(prod.id)}>
                          Update
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {showUpdateModal && (
            <UpdateProductForm
              productId={productId}
              setShowUpdateModal={setShowUpdateModal}
            />
          )}
        </div>
      )}
    </div>
  );
}
