import { useState, useEffect } from 'react';
import { Users, Send } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { communityService } from '../services/api';
import { getCountryByCode } from '../data/countries';
import { formatDate } from '../utils/formatters';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: '', displayName: '', country: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const loadPosts = () => {
    communityService.listPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      await communityService.submitPost(form);
      setSuccess(true);
      setForm({ code: '', displayName: '', country: form.country, message: '' });
      loadPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Users className="w-10 h-10 text-brand-500 mx-auto mb-3" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-ink mb-2">Community</h1>
            <p className="text-ink-muted">
              Real senders sharing real experiences. Posting here requires a Community Usage
              Code, only issued after a genuine, Hedera-anchored transaction, not the Hedera
              hash itself.
            </p>
          </div>

          <form onSubmit={submit} className="glass p-5 mb-10 space-y-3">
            <h2 className="font-bold text-ink text-sm mb-1">Share your experience</h2>
            <input
              type="text" required placeholder="Your Community Usage Code (e.g. AB12-CD34-EF56-7890)"
              value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              className="w-full box-border border border-hairline bg-surface rounded-xl px-4 py-3 text-sm font-mono text-ink outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text" placeholder="Display name (optional)"
                value={form.displayName} onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                className="box-border border border-hairline bg-surface rounded-xl px-4 py-3 text-sm text-ink outline-none"
              />
              <input
                type="text" placeholder="Country (optional)"
                value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                className="box-border border border-hairline bg-surface rounded-xl px-4 py-3 text-sm text-ink outline-none"
              />
            </div>
            <textarea
              required minLength={5} rows={3} placeholder="What was your experience like?"
              value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full box-border border border-hairline bg-surface rounded-xl px-4 py-3 text-sm text-ink outline-none resize-none"
            />
            {error && <p className="text-sm text-danger-400">{error}</p>}
            {success && <p className="text-sm text-success-400">Posted. Thank you for sharing.</p>}
            <button disabled={submitting} className="btn-primary" type="submit">
              <Send className="w-4 h-4" aria-hidden="true" />
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </form>

          <h2 className="font-bold text-ink text-lg mb-4">Recent posts</h2>
          {loading ? (
            <p className="text-ink-muted text-sm">Loading...</p>
          ) : posts.length === 0 ? (
            <div className="glass p-8 text-center">
              <p className="text-ink-muted text-sm">No posts yet. Be the first real sender to share your experience.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((p) => {
                const country = p.country && getCountryByCode(p.country.toUpperCase());
                return (
                  <div key={p.id} className="glass p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-ink text-sm">
                        {p.displayName} {country ? `${country.flag} ${country.name}` : ''}
                      </span>
                      <span className="text-xs text-ink-muted">{formatDate(p.createdAt)}</span>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{p.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
