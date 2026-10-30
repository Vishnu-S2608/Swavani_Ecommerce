import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(
    (p) =>
      p.id === id ||
      p.id.toLowerCase() === id.toLowerCase() ||
      p.id.replace(/^p/i, "") === id.replace(/^p/i, "")
  );

  if (!product) {
    return {
      title: "Product Not Found — House of Swavani",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";
  const productUrl = `${siteUrl}/product/${product.id}`;
  const imageUrl = product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`;

  return {
    title: `${product.name} — House of Swavani`,
    description: `${product.description} Handcrafted authentic ${product.fabric} saree. Silk Mark certified with pure zari detailing.`,
    keywords: [
      product.name,
      product.fabric,
      product.category,
      "House of Swavani",
      "Silk Mark certified saree",
      "authentic Indian handloom",
      "buy silk saree online",
      "pure zari border",
    ],
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | House of Swavani`,
      description: product.subtitle,
      url: productUrl,
      siteName: "House of Swavani",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.subtitle,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find(
    (p) =>
      p.id === id ||
      p.id.toLowerCase() === id.toLowerCase() ||
      p.id.replace(/^p/i, "") === id.replace(/^p/i, "")
  );

  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";
  const productUrl = `${siteUrl}/product/${product.id}`;
  const imageUrl = product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`;

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.fabric === product.fabric)
    )
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description: product.description || product.subtitle,
    sku: `SWAVANI-${product.id.toUpperCase()}`,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "House of Swavani",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "House of Swavani",
      },
    },
    category: product.category,
    material: product.fabric,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
