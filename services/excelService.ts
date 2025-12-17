import * as XLSX from 'xlsx';
import { Product } from '../types';

export const parseExcelFile = (file: File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) return;

        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Parse raw JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Map Chinese headers to our Product interface
        const mappedData: Product[] = jsonData.map((item: any, index) => ({
          id: item['序号'] || item['ID'] || index + 1,
          name: item['产品名称'] || item['Name'] || 'Unknown Product',
          price: item['价格'] || item['Price'] || 'N/A',
          shippingList: item['发货清单'] || item['Shipping List'] || '',
          rentalPrice: item['租赁价格'] || item['Rental Price'] || '',
          notes: item['注意事项'] || item['Notes'] || '',
          imageUrl: item['产品图片'] || item['Image'] || '',
          // New Fields
          parameters: item['产品参数'] || item['Parameters'] || '',
          leadTime: item['工期'] || item['Lead Time'] || '',
          customerPrep: item['需自备'] || item['Customer Prep'] || '',
          caseReference: item['案例参考'] || item['Case Reference'] || '',
          applicableOccasions: item['适用场合'] || item['Occasions'] || '',
        }));

        resolve(mappedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};