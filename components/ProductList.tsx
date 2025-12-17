import React from 'react';
import { Product } from '../types';
import { Trash2, Image, Edit } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string | number) => void;
  onEdit: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onEdit }) => {
  if (products.length === 0) return null;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400 font-mono text-xs uppercase">
            <tr>
              <th className="px-6 py-4">序号</th>
              <th className="px-6 py-4">产品名称</th>
              <th className="px-6 py-4">销售价格</th>
              <th className="px-6 py-4">租赁价格</th>
              <th className="px-6 py-4">工期</th>
              <th className="px-6 py-4 text-center">图片</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {products.map((product, index) => (
              <tr key={`${product.id}-${index}`} className="group hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-500">{product.id}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{product.name}</td>
                <td className="px-6 py-4 font-mono text-emerald-400">{product.price}</td>
                <td className="px-6 py-4 font-mono text-sky-400">{product.rentalPrice || '-'}</td>
                <td className="px-6 py-4 text-slate-400 text-xs">{product.leadTime || '-'}</td>
                <td className="px-6 py-4 text-center">
                  {product.imageUrl ? (
                    <Image className="w-4 h-4 text-slate-400 mx-auto" />
                  ) : (
                    <span className="text-slate-700">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => onEdit(product)}
                      className="text-slate-600 hover:text-tech-accent transition-colors p-1"
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors p-1"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-right">
        <span className="text-xs font-mono text-slate-500">共加载 {products.length} 条数据</span>
      </div>
    </div>
  );
};