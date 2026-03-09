// Simple CSV export
export const exportToCSV = (data, filename) => {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(',')).join('\n');
  const csv = `${headers}\n${rows}`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

// Print timetable
export const printTimetable = (classData, section) => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Timetable - ${classData} ${section}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 10px; text-align: center; }
          th { background-color: #1e1e2f; color: white; }
        </style>
      </head>
      <body>
        <h2>${classData} - Section ${section} Timetable</h2>
        ${document.querySelector('.timetable-table').outerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};
