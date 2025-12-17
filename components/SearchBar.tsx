import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface SearchBarProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ products, onProductSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside handler
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length > 0) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(text.toLowerCase()) || 
        String(p.id).includes(text)
      ).slice(0, 8); // Limit to 8 results for performance/UI
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (product: Product) => {
    onProductSelect(product);
    setQuery(product.name);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl relative z-50">
      <div className="relative group">
        <div className={`
          absolute inset-0 bg-gradient-to-r from-tech-accent to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200
        `}></div>
        
        <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 focus-within:border-tech-accent transition-colors">
          <div className="pl-4 pr-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent text-white text-lg placeholder-slate-500 border-none outline-none py-3"
            placeholder="输入产品名称或序号进行搜索..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => query.length > 0 && setIsOpen(true)}
          />
          {query && (
            <button onClick={clearSearch} className="p-2 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <ul className="divide-y divide-slate-800">
            {results.map((product) => (
              <li 
                key={product.id}
                onClick={() => handleSelect(product)}
                className="p-4 cursor-pointer hover:bg-tech-accent/10 hover:pl-6 transition-all duration-200 group flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-slate-200 font-medium group-hover:text-tech-accent transition-colors">
                    {product.name}
                  </span>
                  <span className="text-xs font-mono text-slate-500 mt-1">
                    ID: {product.id} • 价格: {product.price}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-tech-accent opacity-0 group-hover:opacity-100 transition-all" />
              </li>
            ))}
          </ul>
          <div className="bg-slate-950 p-2 text-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
            已找到 {results.length} 条匹配
          </div>
        </div>
      )}
      
      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl p-4 text-center shadow-2xl">
          <p className="text-slate-400 text-sm">未找到匹配的系统数据。</p>
        </div>
      )}
    </div>
  );
};