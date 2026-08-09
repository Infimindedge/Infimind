import { useEffect } from 'react';

export interface PageMetadataOptions {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

export function usePageMetadata(options: PageMetadataOptions | undefined) {
  useEffect(() => {
    if (!options) return;

    const previousTitle = document.title;
    
    // Save original elements' values to restore on cleanup
    const originalDescription = document.head.querySelector('meta[name="description"]')?.getAttribute('content') || null;
    const originalRobots = document.head.querySelector('meta[name="robots"]')?.getAttribute('content') || null;
    const originalCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
    
    // Save all OG and Twitter tags to restore/remove on cleanup
    const ogTags = [
      { property: 'og:title', name: '' },
      { property: 'og:description', name: '' },
      { property: 'og:type', name: '' },
      { property: 'og:url', name: '' },
      { property: 'og:image', name: '' },
      { property: '', name: 'twitter:card' },
      { property: '', name: 'twitter:title' },
      { property: '', name: 'twitter:description' },
      { property: '', name: 'twitter:image' },
    ];
    
    const originalMetaStates = ogTags.map(tag => {
      const selector = tag.property 
        ? `meta[property="${tag.property}"]` 
        : `meta[name="${tag.name}"]`;
      const element = document.head.querySelector(selector);
      return {
        selector,
        property: tag.property,
        name: tag.name,
        exists: !!element,
        content: element?.getAttribute('content') || null
      };
    });

    // Helper functions
    function setMeta(attrName: 'name' | 'property', attrVal: string, content: string | undefined) {
      if (content === undefined) return;
      const selector = `meta[${attrName}="${attrVal}"]`;
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    }

    // Set Title
    document.title = options.title;

    // Set Description
    setMeta('name', 'description', options.description);

    // Set Robots (Noindex)
    if (options.noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      // Remove robots meta if it exists or set it back to follow if previously existed
      const robotsMeta = document.head.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.remove();
      }
    }

    // Set Canonical
    const canonicalHref = options.canonicalUrl || `${window.location.origin}${window.location.pathname}`;
    let canonicalElement = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalHref);

    // Set OG & Twitter Tags
    const imagePath = options.image || '/assets/brand/infimind-logo.jpg';
    const absoluteImageUrl = imagePath.startsWith('http') 
      ? imagePath 
      : `${window.location.origin}${imagePath}`;

    setMeta('property', 'og:title', options.title);
    setMeta('property', 'og:description', options.description);
    setMeta('property', 'og:type', options.type || 'website');
    setMeta('property', 'og:url', canonicalHref);
    setMeta('property', 'og:image', absoluteImageUrl);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', options.title);
    setMeta('name', 'twitter:description', options.description);
    setMeta('name', 'twitter:image', absoluteImageUrl);

    // Set Structured Data
    let structuredDataElement = document.head.querySelector('script[type="application/ld+json"]');
    let originalStructuredDataText: string | null = null;
    
    if (structuredDataElement) {
      originalStructuredDataText = structuredDataElement.textContent;
    }

    if (options.structuredData) {
      if (!structuredDataElement) {
        structuredDataElement = document.createElement('script');
        structuredDataElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataElement);
      }
      structuredDataElement.textContent = JSON.stringify(options.structuredData);
    }

    // Cleanup function
    return () => {
      // Restore Title
      document.title = previousTitle;

      // Restore Description
      if (originalDescription !== null) {
        setMeta('name', 'description', originalDescription);
      } else {
        document.head.querySelector('meta[name="description"]')?.remove();
      }

      // Restore Robots
      if (originalRobots !== null) {
        setMeta('name', 'robots', originalRobots);
      } else {
        document.head.querySelector('meta[name="robots"]')?.remove();
      }

      // Restore Canonical
      if (originalCanonical !== null) {
        canonicalElement?.setAttribute('href', originalCanonical);
      } else {
        canonicalElement?.remove();
      }

      // Restore OG and Twitter tags
      originalMetaStates.forEach(state => {
        const element = document.head.querySelector(state.selector);
        if (state.exists && state.content !== null) {
          element?.setAttribute('content', state.content);
        } else {
          element?.remove();
        }
      });

      // Restore Structured Data
      if (originalStructuredDataText !== null) {
        if (structuredDataElement) {
          structuredDataElement.textContent = originalStructuredDataText;
        }
      } else {
        if (options.structuredData) {
          structuredDataElement?.remove();
        }
      }
    };
  }, [options]);
}
