import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Hash, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/ui/PageHeader';
import TransactionCard from '../components/transaction/TransactionCard';
import EmptyState from '../components/ui/EmptyState';
import { searchTransactions } from '../utils/storage';
import { mockTransactionRecords } from '../data/mockTransactions';
import { transferService } from '../services/api';

export default function TrackTransaction() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) { setError('Please enter a transaction ID or name'); return; }
    setError('');
    setSearched(true);

    try {
      const found = await transferService.searchTransfers(q);
      setResults(found);
    } catch (err) {
      console.warn("Backend search failed, using local fallback:", err);
      let found = searchTransactions(q);
      if (found.length === 0) {
        found = mockTransactionRecords.filter(
          (t) =>
            t.id.toLowerCase().includes(q.toLowerCase()) ||
            t.senderName.toLowerCase().includes(q.toLowerCase()) ||
            t.recipientName.toLowerCase().includes(q.toLowerCase())
        );
      }
      setResults(found);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-3xl">
          <PageHeader
            badge="Transaction Lookup"
            title="Track Your Transfer"
            subtitle="Enter your transaction ID or recipient name to find your transfer."
          />

          <div className="glass p-6 mb-8">
            <form onSubmit={handleSearch} noValidate>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label htmlFor="track-query" className="sr-only">Transaction ID or name</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden="true" />
                    <input
                      id="track-query"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Transaction ID (e.g. TXN-DEMO-001) or name..."
                      className={`form-input pl-10 ${error ? 'error' : ''}`}
                      aria-invalid={error ? 'true' : 'false'}
                      aria-describedby={error ? 'track-error' : undefined}
                    />
                  </div>
                  {error && <p id="track-error" role="alert" className="text-xs text-danger-400 mt-1.5">{error}</p>}
                </div>
                <button type="submit" className="btn-primary px-5 flex-shrink-0">
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>
            <p className="text-xs text-white/30 mt-3">
              Tip: Try{' '}
              <span className="text-accent-400 font-mono cursor-pointer hover:underline" onClick={() => setQuery('TXN-DEMO-001')}>
                TXN-DEMO-001
              </span>{' '}
              to see a demo transaction.
            </p>
          </div>

          {searched && (
            <div>
              {results && results.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-white/50 text-sm">{results.length} transaction{results.length !== 1 ? 's' : ''} found</p>
                  {results.map((txn) => <TransactionCard key={txn.id} transaction={txn} />)}
                </div>
              ) : (
                <EmptyState
                  title="No transactions found"
                  description={`We couldn't find any transactions matching "${query}". Check the ID or try a different search.`}
                  action={
                    <Link to="/send-money" className="btn-primary">
                      Start a Transfer<ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  }
                />
              )}
            </div>
          )}

          {!searched && (
            <div className="glass p-6 text-center">
              <Search className="w-10 h-10 text-white/20 mx-auto mb-3" aria-hidden="true" />
              <p className="text-white/50 text-sm">Enter a transaction ID above to track your transfer status.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
