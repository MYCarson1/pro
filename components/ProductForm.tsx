import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Plus, Save, X, Edit2 } from 'lucide-react';

interface ProductFormProps {
  initialData?: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: Date.now().toString().slice(-6),
    name: '',
    price: '',
    rentalPrice: '',
    shippingList: '',
    notes: '',
    imageUrl: '',
    parameters: '',
    leadTime: '',
    customerPrep: '',
    caseReference: '',
    applicableOccasions: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset logic if needed when switching from edit to add, 
      // though typically the parent handles unmounting/remounting or key changing
      setFormData({
        id: Date.now().toString().slice(-6),
        name: '',
        price: '',
        rentalPrice: '',
        shippingList: '',
        notes: '',
        imageUrl: '',
        parameters: '',
        leadTime: '',
        customerPrep: '',
        caseReference: '',
        applicableOccasions: ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('请至少填写产品名称和价格');
      return;
    }
    onSave(formData as Product);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8 animate-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          {initialData ? (
            <><Edit2 className="w-5 h-5 mr-2 text-tech-accent" /> 编辑产品信息</>
          ) : (
            <><Plus className="w-5 h-5 mr-2 text-tech-accent" /> 手动录入数据</>
          )}
        </h3>
        <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Basic Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
             <div className="col-span-1">
              <label className="block text-xs font-mono text-slate-500 mb-1">产品序号 (ID)</label>
              <input 
                name="id" 
                value={formData.id} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-tech-accent outline-none font-mono text-sm"
              />
            </div>
             <div className="col-span-2">
              <label className="block text-xs font-mono text-tech-accent mb-1">* 产品名称</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="输入产品名称"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-tech-accent outline-none"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-tech-accent mb-1">* 销售价格</label>
              <input 
                name="price" 
                value={formData.price} 
                onChange={handleChange}
                placeholder="¥0.00"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 focus:border-tech-accent outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">租赁价格</label>
              <input 
                name="rentalPrice" 
                value={formData.rentalPrice} 
                onChange={handleChange}
                placeholder="¥0.00"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sky-400 focus:border-tech-accent outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">工期</label>
              <input 
                name="leadTime" 
                value={formData.leadTime} 
                onChange={handleChange}
                placeholder="例如: 3-5天"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:border-tech-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">适用场合</label>
              <input 
                name="applicableOccasions" 
                value={formData.applicableOccasions} 
                onChange={handleChange}
                placeholder="例如: 户外, 婚礼"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:border-tech-accent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">图片链接 (URL)</label>
            <input 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-400 focus:border-tech-accent outline-none"
            />
          </div>
          
           <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">案例参考</label>
             <textarea 
              name="caseReference" 
              value={formData.caseReference} 
              onChange={handleChange}
              rows={2}
              placeholder="相关案例链接或描述..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:border-tech-accent outline-none resize-none"
            />
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">产品参数</label>
            <textarea 
              name="parameters" 
              value={formData.parameters} 
              onChange={handleChange}
              rows={3}
              placeholder="尺寸, 材质, 功率等详细参数..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:border-tech-accent outline-none resize-none"
            />
          </div>
          
           <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">需自备</label>
            <textarea 
              name="customerPrep" 
              value={formData.customerPrep} 
              onChange={handleChange}
              rows={2}
              placeholder="客户需要准备的条件..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:border-tech-accent outline-none resize-none"
            />
          </div>

           <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">发货清单</label>
            <textarea 
              name="shippingList" 
              value={formData.shippingList} 
              onChange={handleChange}
              rows={3}
              placeholder="列出包含的配件..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 focus:border-tech-accent outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">注意事项</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange}
              rows={2}
              placeholder="需要注意的事项..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-amber-200/80 focus:border-tech-accent outline-none resize-none"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="bg-tech-accent hover:bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" /> {initialData ? '更新数据' : '保存数据'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};