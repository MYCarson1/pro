import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { SearchBar } from './components/SearchBar';
import { ProductDetail } from './components/ProductDetail';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { Product } from './types';
import { LayoutGrid, Database, Zap, Search, PlusCircle, Settings } from 'lucide-react';

type ViewMode = 'search' | 'manage';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('search');
  const [showManualForm, setShowManualForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('nexus_products');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          setDataLoaded(true);
        }
      } catch (e) {
        console.error("Corrupt local storage data");
      }
    }
  }, []);

  const handleDataImported = (data: Product[]) => {
    // For simplicity, let's prepend new imports
    const newProducts = [...data, ...products];
    updateProducts(newProducts);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing
      const newProducts = products.map(p => p.id === editingProduct.id ? product : p);
      updateProducts(newProducts);
      setEditingProduct(null);
    } else {
      // Add new
      const newProducts = [product, ...products];
      updateProducts(newProducts);
    }
    setShowManualForm(false);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowManualForm(true);
    // Ensure we scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setShowManualForm(false);
    setEditingProduct(null);
  }

  const handleDelete = (id: string | number) => {
    if (window.confirm('确认删除此条目吗？')) {
      const newProducts = products.filter(p => p.id !== id);
      updateProducts(newProducts);
    }
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('nexus_products', JSON.stringify(newProducts));
    setDataLoaded(newProducts.length > 0);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-slate-200 font-sans selection:bg-tech-accent selection:text-slate-900 overflow-x-hidden">
      
      {/* Background Grid Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        
        {/* Header */}
        <header className="w-full max-w-6xl flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tech-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Zap className="text-slate-900 w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">NEXUS</h1>
              <p className="text-[10px] font-mono text-tech-accent tracking-[0.2em] uppercase">智能价格查询系统</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             {dataLoaded && (
              <div className="hidden md:flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                <Database className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-xs font-mono text-slate-300">数据库: {products.length} 条记录</span>
              </div>
            )}
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex space-x-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800 mb-8">
          <button
            onClick={() => {
                setViewMode('search');
                setShowManualForm(false);
                setEditingProduct(null);
            }}
            className={`flex items-center px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              viewMode === 'search' 
                ? 'bg-tech-accent text-slate-900 shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Search className="w-4 h-4 mr-2" />
            产品查询
          </button>
          <button
            onClick={() => setViewMode('manage')}
            className={`flex items-center px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              viewMode === 'manage' 
                ? 'bg-tech-accent text-slate-900 shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            数据管理
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="w-full max-w-6xl flex flex-col items-center flex-grow">
          
          {viewMode === 'search' ? (
            /* --- Search Mode --- */
            <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
               {dataLoaded ? (
                 <>
                  <div className="mb-12 w-full flex justify-center">
                    <SearchBar products={products} onProductSelect={handleProductSelect} />
                  </div>
                  
                  {selectedProduct ? (
                    <ProductDetail product={selectedProduct} />
                  ) : (
                    <div className="w-full max-w-4xl border border-dashed border-slate-800 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-600 animate-in zoom-in-95 duration-500">
                      <LayoutGrid className="w-12 h-12 mb-4 opacity-50" />
                      <p className="font-mono text-sm">等待输入指令...</p>
                      <p className="text-xs text-slate-700 mt-2">请在上方搜索栏输入关键词</p>
                    </div>
                  )}
                 </>
               ) : (
                 <div className="text-center mt-20">
                   <h2 className="text-xl text-slate-400 mb-4">系统暂无数据</h2>
                   <button 
                    onClick={() => setViewMode('manage')}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-tech-accent rounded-xl border border-tech-accent/30 transition-all"
                   >
                     前往数据管理导入数据
                   </button>
                 </div>
               )}
            </div>
          ) : (
            /* --- Manage Mode --- */
            <div className="w-full flex flex-col items-center animate-in slide-in-from-right-8 duration-300">
              
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Import Box */}
                <div className="md:col-span-2">
                   <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl h-full flex items-center">
                     <FileUpload onDataLoaded={handleDataImported} />
                   </div>
                </div>
                
                {/* Action Box */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col justify-center items-center text-center">
                  <h3 className="text-slate-200 font-bold mb-2">手动录入</h3>
                  <p className="text-slate-500 text-xs mb-4">单个添加或编辑产品</p>
                  <button 
                    onClick={() => {
                        setShowManualForm(!showManualForm);
                        setEditingProduct(null); // Clear edit state if toggling manually
                    }}
                    className="w-full py-3 bg-slate-800 hover:bg-tech-accent hover:text-slate-900 border border-slate-700 rounded-lg text-slate-300 transition-all flex items-center justify-center font-medium"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    {showManualForm && !editingProduct ? '取消录入' : '新增产品'}
                  </button>
                </div>
              </div>

              {/* Manual Form (Add or Edit) */}
              {showManualForm && (
                <div className="w-full">
                  <ProductForm 
                    initialData={editingProduct}
                    onSave={handleSaveProduct} 
                    onCancel={handleCancelEdit} 
                  />
                </div>
              )}

              {/* Data Preview List */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Database className="w-5 h-5 mr-2 text-tech-accent" /> 数据预览
                  </h3>
                  <span className="text-xs font-mono text-slate-500">最新录入优先</span>
                </div>
                <ProductList 
                    products={products} 
                    onDelete={handleDelete} 
                    onEdit={handleEditClick}
                />
              </div>

            </div>
          )}

        </main>
        
        <footer className="w-full text-center py-8 text-slate-600 text-xs font-mono mt-auto">
          <p>NEXUS SYSTEMS V1.3 // CN_LOCALE // SECURE</p>
        </footer>
      </div>
    </div>
  );
};

export default App;