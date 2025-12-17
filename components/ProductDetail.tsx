import React from 'react';
import { Product } from '../types';
import { Tag, Truck, AlertCircle, DollarSign, Clock, Settings, Briefcase, Link as LinkIcon, BoxSelect } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tech-accent to-transparent opacity-70"></div>

        <div className="p-8 lg:p-12">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-slate-700 pb-6">
                <div>
                    <div className="flex items-center mb-2">
                         <span className="bg-tech-accent/10 text-tech-accent border border-tech-accent/20 px-3 py-1 rounded-full font-mono text-xs">
                           ID: {product.id}
                         </span>
                         {product.applicableOccasions && (
                            <span className="ml-3 text-slate-400 text-xs flex items-center">
                                <Briefcase className="w-3 h-3 mr-1" /> {product.applicableOccasions}
                            </span>
                         )}
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">{product.name}</h1>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <div className="font-mono text-xs text-slate-500 mb-1">DATA.REF_V2</div>
                </div>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 flex justify-between items-center relative overflow-hidden group">
                   <div className="absolute -right-6 -top-6 bg-emerald-500/10 w-24 h-24 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
                   <div>
                        <div className="flex items-center text-slate-400 mb-1 text-xs uppercase tracking-wider font-semibold">
                            <Tag className="w-4 h-4 mr-2" /> 销售价格
                        </div>
                        <div className="text-3xl font-mono font-bold text-emerald-400">
                        {typeof product.price === 'number' ? '¥' : ''} {product.price}
                        </div>
                   </div>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 flex justify-between items-center relative overflow-hidden group">
                   <div className="absolute -right-6 -top-6 bg-sky-500/10 w-24 h-24 rounded-full blur-xl group-hover:bg-sky-500/20 transition-all"></div>
                   <div>
                        <div className="flex items-center text-slate-400 mb-1 text-xs uppercase tracking-wider font-semibold">
                            <DollarSign className="w-4 h-4 mr-2" /> 租赁价格
                        </div>
                        <div className="text-3xl font-mono font-bold text-sky-400">
                            {product.rentalPrice ? product.rentalPrice : 'N/A'}
                        </div>
                   </div>
                </div>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Left Column: Tech Specs */}
                <div className="space-y-6">
                    {product.parameters && (
                        <div className="bg-slate-900/30 rounded-xl p-5 border border-slate-800">
                            <div className="flex items-center text-slate-300 font-medium mb-3">
                                <Settings className="w-5 h-5 mr-2 text-tech-accent" /> 产品参数
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line font-mono">
                                {product.parameters}
                            </p>
                        </div>
                    )}
                    
                     {product.leadTime && (
                        <div className="bg-slate-900/30 rounded-xl p-5 border border-slate-800 flex items-start">
                             <Clock className="w-5 h-5 mr-3 text-tech-accent mt-0.5" />
                             <div>
                                <h4 className="text-slate-300 font-medium text-sm mb-1">工期</h4>
                                <p className="text-slate-400 text-sm">{product.leadTime}</p>
                             </div>
                        </div>
                    )}

                    {product.customerPrep && (
                        <div className="bg-slate-900/30 rounded-xl p-5 border border-slate-800">
                            <div className="flex items-center text-slate-300 font-medium mb-3">
                                <BoxSelect className="w-5 h-5 mr-2 text-tech-accent" /> 需自备
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                {product.customerPrep}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Logistics & Notes */}
                <div className="space-y-6">
                     {product.shippingList && (
                        <div>
                            <div className="flex items-center text-slate-300 font-medium mb-2">
                            <Truck className="w-5 h-5 mr-2 text-tech-accent" /> 发货清单
                            </div>
                            <div className="pl-7 border-l-2 border-slate-700 ml-2.5">
                                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line pl-4">
                                {product.shippingList}
                                </p>
                            </div>
                        </div>
                    )}

                    {product.notes && (
                        <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-5">
                            <div className="flex items-center text-amber-400 font-medium mb-2">
                                <AlertCircle className="w-5 h-5 mr-2" /> 注意事项
                            </div>
                            <p className="text-amber-200/80 text-sm leading-relaxed whitespace-pre-line">
                                {product.notes}
                            </p>
                        </div>
                    )}

                    {product.caseReference && (
                        <div className="pt-4 border-t border-slate-800">
                             <div className="flex items-center text-slate-400 font-medium mb-2 text-sm">
                                <LinkIcon className="w-4 h-4 mr-2" /> 案例参考
                            </div>
                            <p className="text-tech-accent text-sm leading-relaxed whitespace-pre-line underline decoration-dashed underline-offset-4">
                                {product.caseReference}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Section - Bottom */}
            {product.imageUrl && (
                <div className="mt-10 pt-10 border-t border-slate-700">
                     <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-auto max-h-[600px] object-contain mx-auto"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'; // Hide if broken
                            }}
                        />
                         <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            VISUAL REFERENCE
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};