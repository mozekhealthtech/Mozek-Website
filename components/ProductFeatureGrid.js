'use client';

/**
 * ProductFeatureGrid — Shared feature grid component for product pages.
 *
 * Props:
 *  - tag: small label above title (e.g. "Our Main Features")
 *  - title: section title
 *  - subtitle: optional description text
 *  - features: array of { icon, title, desc }
 *  - layout: "center" | "left-image-right" | "left-content-right-image"
 *  - image: optional image src for side layout
 *  - imageAlt: alt text for image
 *  - video: optional video src for side layout (takes precedence over image)
 */
export default function ProductFeatureGrid({
  tag,
  title,
  subtitle,
  features = [],
  layout = 'center',
  image,
  imageAlt = '',
  video,
}) {
  const isCenter = layout === 'center';

  const featureGrid = (
    <div className="pfg-features">
      <div className="pfg-grid">
        {features.map((f, i) => (
          <div className="pfg-item" key={i}>
            <div className="pfg-icon">{f.icon}</div>
            <h4 className="pfg-item-title">{f.title}</h4>
            <p className="pfg-item-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (isCenter) {
    return (
      <section className="pfg-section">
        <div className="pfg-inner pfg-center">
          {tag && <span className="pfg-tag">{tag}</span>}
          <h2 className="pfg-title">{title}</h2>
          {subtitle && <p className="pfg-subtitle">{subtitle}</p>}
          {featureGrid}
        </div>
      </section>
    );
  }

  // Side-by-side layout: content on left, image on right
  return (
    <section className="pfg-section">
      <div className="pfg-inner pfg-side">
        <div className="pfg-content-col">
          {tag && <span className="pfg-tag">{tag}</span>}
          <h2 className="pfg-title pfg-title-left">{title}</h2>
          {subtitle && <p className="pfg-subtitle pfg-subtitle-left">{subtitle}</p>}
          {featureGrid}
        </div>
        {(video || image) && (
          <div className="pfg-image-col">
            {video ? (
              <video src={video} autoPlay loop muted playsInline />
            ) : (
              <img src={image} alt={imageAlt} loading="lazy" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
