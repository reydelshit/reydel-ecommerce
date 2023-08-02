import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page() {
  return (
    <div className="w-full py-2">
      <Tabs defaultValue="account">
        <div className="flex justify-between items-center w-full border-2 p-2 h-20">
          <TabsList className="w-[400px] h-[3rem]">
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Products</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input placeholder="search product" className="w-[20rem]" />
            <Button variant="outline">Search</Button>
          </div>
        </div>

        <Separator />

        <TabsContent value="product">list of product here</TabsContent>
        <TabsContent value="add-product">add product here</TabsContent>
      </Tabs>
    </div>
  );
}
