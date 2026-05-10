'use client'

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './dashboard.module.scss';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import { useAuth } from '../../context/AuthContext';
import RoleGuard from '../../components/RoleGuard/index';


function DashboardContent() {
  const [data, setData] = useState<any>(null);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const accessToken = Cookies.get('accessToken');

      if (!accessToken) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/dashboard?period=${period}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (res.status === 401) {
          window.location.href = '/auth/login';
          return;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Otrzymano tekst zamiast JSON");
          return;
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  if (loading && !data) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.centered}><p>Inicjalizacja danych...</p></div>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Panel <span>Główny</span></h1>
          <p>Przegląd dla okresu: <strong>{period === 'week' ? 'ostatni tydzień' : period === 'month' ? 'ostatni miesiąc' : 'ostatni rok'}</strong></p>
        </div>

        <div className={styles.periodSwitcher}>
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              className={period === p ? styles.active : ''}
              onClick={() => setPeriod(p)}
            >
              {p === 'week' ? 'Tydzień' : p === 'month' ? 'Miesiąc' : 'Rok'}
            </button>
          ))}
        </div>
      </header>

      <section className={styles.statsGrid}>
        {/* Twoje karty statystyk bez zmian */}
        <div className={styles.statCard}>
          <div className={styles.info}>
            <span>Otwarte Zlecenia</span>
            <strong>{data?.workOrders?.open ?? 0}</strong>
            <div className={styles.subValue}>Krytyczne: {data?.workOrders?.critical ?? 0}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.info}>
            <span>Koszty Całkowite</span>
            <strong>{data?.costs?.totalCost?.toLocaleString() ?? 0} PLN</strong>
            <div className={styles.subValue}>Części: {data?.costs?.totalPartsCost ?? 0} PLN</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.info}>
            <span>MTTR</span>
            <strong>{data?.machines?.mttr ?? 0} h</strong>
            <div className={styles.subValue}>Średni czas naprawy</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.info}>
            <span>Zaległe Przeglądy</span>
            <strong style={{ color: (data?.preventive?.overdue ?? 0) > 0 ? '#ff6b6b' : 'inherit' }}>
              {data?.preventive?.overdue ?? 0}
            </strong>
            <div className={styles.subValue}>Wymagają uwagi</div>
          </div>
        </div>
      </section>

      <div className={styles.mainChartsSection}>
        <div className={styles.chartCard}>
          <h3>Koszty wg Maszyn (TOP 5)</h3>
          <div className={styles.chartHeight}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.costs?.topMachinesByCost ?? []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(240, 237, 229, 0.1)" />
                <XAxis dataKey="machineName" stroke="#F0EDE5" fontSize={12} tickLine={false} />
                <YAxis stroke="#F0EDE5" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#060D0C', border: '1px solid #F0EDE5', borderRadius: '8px' }}
                  itemStyle={{ color: '#F0EDE5' }}
                  cursor={{ fill: 'rgba(240, 237, 229, 0.05)' }}
                />
                <Bar dataKey="totalCost" fill="#E2D9C8" radius={[4, 4, 0, 0]} name="Koszt (PLN)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3>Stan Magazynowy i Prewencja</h3>
          <div className={styles.inventorySection}>
            <div className={styles.inventoryItem}>
              <p>Części aktywne</p>
              <span>{data?.inventory?.totalParts ?? 0}</span>
            </div>
            <div className={`${styles.inventoryItem} ${(data?.inventory?.lowStockCount ?? 0) > 0 ? styles.warning : ''}`}>
              <p>Niskie stany</p>
              <span>{data?.inventory?.lowStockCount ?? 0}</span>
            </div>
            <div className={styles.inventoryItem}>
              <p>Nadchodzące (7d)</p>
              <span>{data?.preventive?.upcomingIn7Days ?? 0}</span>
            </div>
          </div>
          <div className={styles.subInfo} style={{marginTop: '1.5rem', opacity: 0.6, fontSize: '0.8rem'}}>
            Aktywne wypożyczenia narzędzi: {data?.inventory?.activeLoans ?? 0}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const unauthorizedFallback = (
    <>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Witaj, <span>{user?.name}</span></h1>
          <p>Twój poziom dostępu ({user?.role}) nie pozwala na podgląd statystyk finansowych i globalnych.</p>
          <p>Wybierz odpowiednią opcję z menu bocznego, aby rozpocząć pracę.</p>
        </div>
      </header>

    </>
  );

  return (
    <div className={styles.dashboardContainer}>
      <RoleGuard
        allowedRoles={['ADMIN', 'MANAGER']}
        fallback={unauthorizedFallback}
      >
        <DashboardContent />
      </RoleGuard>
    </div>
  );
}