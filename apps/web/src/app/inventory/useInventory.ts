import { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { Part, ToolLoan, Category, NewPart } from './types';

export const INITIAL_PART_STATE: NewPart = {
  name: '',
  categoryId: '',
  qrCode: 'QR-',
  stockQuantity: 0,
  reorderPoint: 5,
  unitPrice: 0
};

export function useInventory() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loans, setLoans] = useState<ToolLoan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceFrom, setPriceFrom] = useState<number | ''>('');
  const [priceTo, setPriceTo] = useState<number | ''>('');
  const [minStock, setMinStock] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.get('accessToken');
    try {
      const [partsRes, loansRes, catsRes] = await Promise.all([
        fetch('http://localhost:3000/inventory/parts', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:3000/inventory/loans', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:3000/inventory/categories', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      if (partsRes.status === 401) window.location.href = '/auth/login';
      setParts(await partsRes.json());
      setLoans(await loansRes.json());
      setCategories(await catsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredParts = useMemo(() => {
    return parts.filter(part => {
      const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === '' || part.category.id === filterCategory;
      const matchesPriceFrom = priceFrom === '' || part.unitPrice >= priceFrom;
      const matchesPriceTo = priceTo === '' || part.unitPrice <= priceTo;
      const matchesStock = part.stockQuantity >= minStock;
      return matchesSearch && matchesCategory && matchesPriceFrom && matchesPriceTo && matchesStock;
    });
  }, [parts, searchQuery, filterCategory, priceFrom, priceTo, minStock]);

  const handleReturn = async (loanId: string) => {
    const token = Cookies.get('accessToken');
    const res = await fetch(`http://localhost:3000/inventory/loans/${loanId}/return`, {
      method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchData();
  };

  return {
    parts, loans, categories, loading, filteredParts, fetchData, handleReturn,
    searchQuery, setSearchQuery, filterCategory, setFilterCategory,
    priceFrom, setPriceFrom, priceTo, setPriceTo, minStock, setMinStock
  };
}