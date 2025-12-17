import React, { useRef, useState } from 'react';
import { Upload, FileSpreadsheet, Loader2 } from 'lucide-react';
import { parseExcelFile } from '../services/excelService';
import { Product } from '../types';

interface FileUploadProps {
  onDataLoaded: (data: Product[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setFileName(file.name);
    try {
      const data = await parseExcelFile(file);
      // Simulate a small tech "processing" delay for effect
      setTimeout(() => {
        onDataLoaded(data);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error parsing excel:", error);
      alert("Excel 解析失败，请检查文件格式。");
      setIsLoading(false);
      setFileName(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          relative group cursor-pointer 
          border-2 border-dashed rounded-xl p-6
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center text-center
          ${isDragging 
            ? 'border-tech-accent bg-tech-accent/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
            : 'border-slate-700 hover:border-tech-accent/50 hover:bg-slate-800/50 bg-slate-900/50'
          }
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={(e) => e.target.files && handleFile(e.target.files[0])} 
          accept=".xlsx, .xls" 
          className="hidden" 
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center text-tech-accent animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="font-mono text-sm tracking-widest">数据处理中...</span>
          </div>
        ) : fileName ? (
           <div className="flex flex-col items-center text-tech-accent">
            <FileSpreadsheet className="w-8 h-8 mb-2" />
            <span className="font-medium text-slate-200">{fileName}</span>
            <span className="text-xs text-slate-400 mt-1">点击更换文件</span>
          </div>
        ) : (
          <>
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center mb-3
              transition-all duration-300
              ${isDragging ? 'bg-tech-accent text-slate-900' : 'bg-slate-800 text-slate-400 group-hover:text-tech-accent'}
            `}>
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-slate-200 font-medium mb-1">导入 Excel 数据矩阵</h3>
            <p className="text-slate-500 text-xs font-mono">支持 .XLSX / .XLS 格式</p>
          </>
        )}
      </div>
    </div>
  );
};