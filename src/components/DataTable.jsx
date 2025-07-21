import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, Search, Download, Eye, EyeOff, MoreHorizontal, Trash2, Edit, Filter } from 'lucide-react'

export default function DataTable({ columns, data, theme, onEdit, onDelete, onBulkAction }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(columns.map(col => col.key))
  )
  const [showColumnSelector, setShowColumnSelector] = useState(false)

  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [filteredData, sortConfig])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const visibleColumnsList = columns.filter(col => visibleColumns.has(col.key))

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((_, index) => index)))
    }
  }

  const handleSelectRow = (index) => {
    const newSelectedRows = new Set(selectedRows)
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index)
    } else {
      newSelectedRows.add(index)
    }
    setSelectedRows(newSelectedRows)
  }

  const handleExport = (format) => {
    if (format === 'csv') {
      const headers = visibleColumnsList.map(col => col.label).join(',')
      const rows = sortedData.map(item => 
        visibleColumnsList.map(col => item[col.key]).join(',')
      ).join('\n')
      const csv = `${headers}\n${rows}`
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'data.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  const toggleColumnVisibility = (columnKey) => {
    const newVisibleColumns = new Set(visibleColumns)
    if (newVisibleColumns.has(columnKey)) {
      newVisibleColumns.delete(columnKey)
    } else {
      newVisibleColumns.add(columnKey)
    }
    setVisibleColumns(newVisibleColumns)
  }
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    if (sortConfig.direction === 'ascending') return <ChevronUp className="w-4 h-4" />
    return <ChevronDown className="w-4 h-4" />
  }

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className={`rounded-2xl transition-all duration-300 hover-lift ${
      theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
    } backdrop-blur-sm shadow-lg border ${
      theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
    }`}>
      {/* Enhanced Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-200 input-focus ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Bulk Actions */}
            {selectedRows.size > 0 && (
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedRows.size} selected
                </span>
                <button
                  onClick={() => onBulkAction && onBulkAction('delete', Array.from(selectedRows))}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  title="Delete selected"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Column Visibility */}
            <div className="relative">
              <button
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600'
                } backdrop-blur-sm`}
                title="Column visibility"
              >
                <Eye className="w-4 h-4" />
              </button>

              {showColumnSelector && (
                <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-10 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } backdrop-blur-xl animate-scale-in`}>
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-sm">Show Columns</h4>
                  </div>
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {columns.map((column) => (
                      <label key={column.key} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.has(column.key)}
                          onChange={() => toggleColumnVisibility(column.key)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{column.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Export */}
            <button
              onClick={() => handleExport('csv')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } shadow-md hover-lift`}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:block">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {visibleColumnsList.map(col => (
                <th 
                  key={col.key} 
                  className="p-4 text-left cursor-pointer group"
                  onClick={() => requestSort(col.key)}
                >
                  <div className="flex items-center space-x-2 group-hover:text-blue-500 transition-colors duration-200">
                    <span className="font-semibold text-sm">{col.label}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {getSortIcon(col.key) || <ChevronDown className="w-4 h-4 opacity-50" />}
                    </div>
                  </div>
                </th>
              ))}
              <th className="p-4 text-left">
                <span className="font-semibold text-sm">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className={`border-b transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 ${
                theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={() => handleSelectRow(index)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                {visibleColumnsList.map(col => (
                  <td key={col.key} className="p-4">
                    <div className="text-sm">
                      {col.render ? col.render(item) : item[col.key]}
                    </div>
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(item)}
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                        theme === 'dark' 
                          ? 'hover:bg-blue-900/50 text-blue-400' 
                          : 'hover:bg-blue-50 text-blue-600'
                      }`}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(item)}
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                        theme === 'dark' 
                          ? 'hover:bg-red-900/50 text-red-400' 
                          : 'hover:bg-red-50 text-red-600'
                      }`}
                      title="Delete"
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

      {/* Enhanced Pagination */}
      <div className={`flex flex-col sm:flex-row items-center justify-between p-6 border-t ${
        theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
      }`}>
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <span className="text-sm">
            Showing {Math.min(1 + (currentPage - 1) * itemsPerPage, sortedData.length)} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            Previous
          </button>
          
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 ${
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-md'
                  : theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
} 