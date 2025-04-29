import React from 'react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  emptyMessage?: string;
  maxHeight?: string;
  isLoading?: boolean;
  loadingMessage?: string;
}

export default function ResponsiveTable({ 
  columns, 
  data, 
  className = '', 
  emptyMessage = 'No data available',
  maxHeight,
  isLoading = false,
  loadingMessage = 'Loading data...'
}: ResponsiveTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
          <span>{loadingMessage}</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500 border border-gray-200 rounded-md">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Desktop view - full table */}
      <div 
        className="overflow-x-auto hidden md:block"
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : {}}
      >
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {columns.map((column, i) => (
                <th 
                  key={i} 
                  className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                  >
                    {column.render 
                      ? column.render(row[column.accessor], row) 
                      : row[column.accessor] || '-'
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view - card layout */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
            {columns.map((column, colIndex) => (
              <div 
                key={colIndex} 
                className={`px-4 py-2 flex justify-between ${colIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="font-medium text-gray-600">{column.header}:</div>
                <div className="text-gray-900 text-right">
                  {column.render 
                    ? column.render(row[column.accessor], row) 
                    : row[column.accessor] || '-'
                  }
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
