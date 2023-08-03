'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { addPost } from '../actions/add-product';

export default function UpdateProductForm() {
  async function handleSubmit(formData: FormData) {
    await addPost(formData);
  }

  return (
    <div className="w-full flex justify-center p-2">
      <form className="flex flex-col w-[40%] mt-[5rem]" action={handleSubmit}>
        <Input
          name="product"
          className="mb-4"
          type="text"
          placeholder="Product Name"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Iphone 13
        </Label>

        <Input
          name="category"
          className="mb-4"
          type="text"
          placeholder="Category"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Phone
        </Label>
        <Input
          name="description"
          className="mb-4"
          type="text"
          placeholder="Description"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Very cool iphone
        </Label>
        <Input name="price" className="mb-4" type="text" placeholder="Price" />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. $99
        </Label>
        <Input
          name="image"
          className="mb-4"
          type="text"
          placeholder="Image url"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. https://yourimagelink.com
        </Label>
        <Button className="w-[50%] self-center">Add Product</Button>
      </form>
    </div>
  );
}
