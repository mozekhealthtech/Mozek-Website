'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function BlogPage() {
  useScrollReveal();

  return (
    <>
      <Navbar activePage="blog" />

      {/* Hero */}
      <section className="hero">
        <h1 className="reveal">Blog &amp; Insights</h1>
      </section>

      {/* Blog Grid - 6 Blogs */}
      <section className="section section-white blog-section-bg">
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="blog-grid stagger-children">

            {/* Blog 1 */}
            <Link href="/blog-hospital-data-stream" style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="blog-card reveal">
                <div className="blog-card-image">
                  <img src="/images/blog/blog-1.png" alt="The Hospital Is No Longer a Place - Digital Health" loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">The Hospital Is No Longer a Place. It{"'"}s a Data Stream.</h3>
                  <p className="blog-card-excerpt">Healthcare is moving from place-based intervention to time-based visibility. Continuous monitoring is inevitable as care shifts from episodic to longitudinal.</p>
                  <div className="blog-card-meta">By Mozek Research Team &bull; 5 min read</div>
                </div>
              </article>
            </Link>

            {/* Blog 2 */}
            <Link href="/blog-wearables-clinical" style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="blog-card reveal">
                <div className="blog-card-image">
                  <img src="/images/blog/blog-2.png" alt="Why Most Wearables Will Never Be Clinical" loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">Why Most Wearables Will Never Be Clinical</h3>
                  <p className="blog-card-excerpt">Consumer wearables and clinical tools are different species. One is optimized for engagement, the other for decisions. Understanding that gap is everything.</p>
                  <div className="blog-card-meta">By Mozek Research Team &bull; 4 min read</div>
                </div>
              </article>
            </Link>

            {/* Blog 3 */}
            <Link href="/blog-abdm-rpm-india" style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="blog-card reveal">
                <div className="blog-card-image">
                  <img src="/images/blog/blog-3.png" alt="ABDM + RPM India Digital Health Advantage" loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">ABDM + RPM: India{"'"}s Unfair Advantage in Digital Health</h3>
                  <p className="blog-card-excerpt">India{"'"}s digital rails, massive chronic care burden, and cost-sensitive environment create a rare window for leapfrogging in digital health infrastructure.</p>
                  <div className="blog-card-meta">By Mozek Research Team &bull; 5 min read</div>
                </div>
              </article>
            </Link>

            {/* Blog 4 */}
            <Link href="/blog-rpm-programs-fail" style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="blog-card reveal">
                <div className="blog-card-image">
                  <img src="/images/blog/blog-4.png" alt="Why RPM Programs Fail - Metrics to Outcomes" loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">From Metrics to Outcomes: Why Remote Patient Monitoring Programs Fail</h3>
                  <p className="blog-card-excerpt">Most RPM programs don{"'"}t fail because they lack data. They fail because they misunderstand what data is for. Data volume is irrelevant{"—"}clinical insight wins.</p>
                  <div className="blog-card-meta">By Mozek Research Team &bull; 4 min read</div>
                </div>
              </article>
            </Link>

            {/* Blog 5 */}
            <Link href="/blog-economics-continuous-care" style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="blog-card reveal">
                <div className="blog-card-image">
                  <img src="/images/blog/blog-5.jpg" alt="Economics of Continuous Care - Hardware vs Platform" loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">The Economics of Continuous Care: Why Hardware Alone Fails</h3>
                  <p className="blog-card-excerpt">Vertical integration and platform defensibility matter. Hardware without a platform becomes a low-margin product business{"—"}hardware with a platform becomes infrastructure.</p>
                  <div className="blog-card-meta">By Mozek Research Team &bull; 4 min read</div>
                </div>
              </article>
            </Link>

            {/* Blog 6 */}
            <Link href="/blog-digital-health-2030" style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="blog-card reveal">
                <div className="blog-card-image">
                  <img src="/images/blog/blog-6.png" alt="Digital Health 2030 - Future of Wearables" loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">Digital Health 2030: How Wearables Will Redefine Patient Care</h3>
                  <p className="blog-card-excerpt">With 150 million elderly Indians today and 300 million by 2050, the future of patient care will be integrated seamlessly into everyday life{"—"}powered by wearables and connected ecosystems.</p>
                  <div className="blog-card-meta">By Mozek Research Team &bull; 5 min read</div>
                </div>
              </article>
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
